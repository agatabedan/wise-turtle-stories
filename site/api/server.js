const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const { randomUUID } = require("crypto");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// Core server paths and deployment port.
const PORT = process.env.PORT || 3000;
const SITE_DIR = path.join(__dirname, "..");
const REVIEWS_FILE = path.join(__dirname, "data", "reviews.json");
const JOURNEY_FILE = path.join(__dirname, "data", "journey-requests.json");

// Runtime configuration lives in environment variables only.
const MAILERLITE_API_TOKEN = normalizeMailerLiteToken(process.env.MAILERLITE_API_TOKEN || "");
const MAILERLITE_GROUP_ID = (process.env.MAILERLITE_GROUP_ID || "").trim();
const MAILERLITE_JOURNEY_GROUP_ID = (process.env.MAILERLITE_JOURNEY_GROUP_ID || "").trim();
const GOOGLE_SHEETS_WEBHOOK_URL = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || "").trim();
const GOOGLE_SHEETS_WEBHOOK_TOKEN = (process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN || "").trim();
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const ADMIN_TOKEN = (process.env.ADMIN_TOKEN || "").trim();
const DATABASE_URL = (process.env.DATABASE_URL || "").trim();
const DATABASE_SSL = String(process.env.DATABASE_SSL || "").trim().toLowerCase() === "true";

const LOCAL_ORIGINS = new Set([
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
]);

const subscribeAttempts = new Map();
const reviewAttempts = new Map();
const journeyAttempts = new Map();
const isProduction = process.env.NODE_ENV === "production";
const ALLOWED_REVIEW_BOOKS = new Set(["yan", "story-two", "story-three", "yan-felt-sick", "yan-together-in-hospital", "yan-big-change", "noah-river-flowing"]);
const ALLOWED_JOURNEY_WEATHERS = new Set(["air", "flood", "ground", "fire"]);
const ALLOWED_JOURNEY_SERVICES = new Set(["workshop", "program", "consultation", "unsure"]);
const ALLOWED_CONTACT_PREFERENCES = new Set(["email", "phone", "video"]);
const DEFAULT_REVIEWS = [
  {
    id: "megha-yan-2026-03-19",
    bookId: "yan",
    name: "Megha",
    rating: 5,
    title: "A Wonderful Read for Kids and Educators!",
    reviewedIn: "Canada",
    reviewDate: "March 19, 2026",
    format: "Paperback",
    body: [
      "Yan the Little Squirrel is such a delightful book! The children absolutely loved it, especially during our circle time-it kept them engaged, curious, and excited from start to finish.",
      "The story is not only entertaining but also very informative, making it a great resource for both educators and parents. It opens up opportunities for discussion and learning in a fun and meaningful way.",
      "Highly recommend this book for classrooms and at-home reading. It is definitely a favorite in our group!"
    ],
    source: "amazon"
  },
  {
    id: "fatemeh-yan-2026-03-13",
    bookId: "yan",
    name: "Fatemeh",
    rating: 5,
    title: "Great Book for Kids",
    reviewedIn: "Canada",
    reviewDate: "March 13, 2026",
    format: "Paperback",
    body: [
      "This is a very good book that helps teach children, through stories, how to cope with emotional challenges appropriate for their age (2-4).",
      "It provides them with tools to feel empowered and to handle situations more independently when their parents are not with them. The stories address common conflicts children face, such as dealing with disagreement, learning to wait patiently, and managing separation anxiety."
    ],
    source: "amazon"
  }
];

let reviewPool = null;
let reviewStorage = "file";

function isRealEnvValue(value) {
  return Boolean(value) && !/PASTE|YOUR|HERE/i.test(value);
}

function normalizeMailerLiteToken(token) {
  return token.trim().replace(/^Bearer\s+/i, "");
}

function hasMailerLiteConfig() {
  return isRealEnvValue(MAILERLITE_API_TOKEN) && isRealEnvValue(MAILERLITE_GROUP_ID);
}

function hasJourneyMailerLiteConfig() {
  return isRealEnvValue(MAILERLITE_API_TOKEN) && isRealEnvValue(MAILERLITE_JOURNEY_GROUP_ID);
}

function hasGoogleSheetsConfig() {
  return isRealEnvValue(GOOGLE_SHEETS_WEBHOOK_URL) && isRealEnvValue(GOOGLE_SHEETS_WEBHOOK_TOKEN);
}

async function addMailerLiteSubscriber({ email, groupId, name = "" }) {
  const body = {
    email,
    groups: [groupId]
  };

  if (name) body.fields = { name };

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${MAILERLITE_API_TOKEN}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`MailerLite request failed with status ${response.status}.`);
  }
}

// Mirrors saved Life After applications into the owner's private Google Sheet.
async function sendJourneyToGoogleSheet(request) {
  if (!hasGoogleSheetsConfig()) return;

  const webhookUrl = new URL(GOOGLE_SHEETS_WEBHOOK_URL);
  webhookUrl.searchParams.set("token", GOOGLE_SHEETS_WEBHOOK_TOKEN);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`Google Sheets request failed with status ${response.status}.`);
  }
}

function hasDatabaseConfig() {
  return isRealEnvValue(DATABASE_URL);
}

function getDatabaseConfig() {
  const config = { connectionString: DATABASE_URL };

  if (DATABASE_SSL) {
    config.ssl = { rejectUnauthorized: false };
  }

  return config;
}

function trimText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeRating(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return null;
  const rounded = Math.round(rating);
  return rounded >= 1 && rounded <= 5 ? rounded : null;
}

function normalizeStoredReview(review) {
  const createdAt = review.createdAt || review.created_at || "";

  return {
    id: review.id,
    bookId: review.bookId || review.book_id,
    name: review.name || review.reviewer || "Reader",
    email: review.email || "",
    rating: Number(review.rating || 0),
    contactConsent: Boolean(review.contactConsent ?? review.contact_consent),
    title: review.title || "",
    reviewedIn: review.reviewedIn || review.reviewed_in || "",
    reviewDate: review.reviewDate || review.review_date || "",
    format: review.format || "",
    body: Array.isArray(review.body)
      ? review.body
      : Array.isArray(review.body_json)
        ? review.body_json
        : [review.body || review.body_json].filter(Boolean),
    source: review.source || "site",
    createdAt:
      createdAt instanceof Date
        ? createdAt.toISOString()
        : String(createdAt)
  };
}

function publicReview(review) {
  return {
    id: review.id,
    bookId: review.bookId,
    reviewer: review.name || review.reviewer || "Reader",
    rating: review.rating,
    title: review.title || "",
    reviewedIn: review.reviewedIn || "",
    reviewDate: review.reviewDate || "",
    createdAt: review.createdAt || "",
    format: review.format || "",
    body: Array.isArray(review.body) ? review.body : [review.body].filter(Boolean),
    source: review.source || "site"
  };
}

function reviewSummary(reviews) {
  if (!reviews.length) return { average: 0, count: 0 };
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  return {
    average: Math.round((total / reviews.length) * 10) / 10,
    count: reviews.length
  };
}

function summariesByBook(reviews) {
  return reviews.reduce((summaries, review) => {
    const bookReviews = reviews.filter((item) => item.bookId === review.bookId);
    summaries[review.bookId] = reviewSummary(bookReviews);
    return summaries;
  }, {});
}

function isAdminAuthorized(req) {
  const authHeader = req.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  return isRealEnvValue(ADMIN_TOKEN) && token === ADMIN_TOKEN;
}

function isTemporaryTunnelOrigin(origin) {
  if (isProduction) return false;

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".loca.lt");
  } catch (_) {
    return false;
  }
}

async function readFileReviews() {
  try {
    const raw = await fs.readFile(REVIEWS_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.map(normalizeStoredReview) : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeFileReviews(reviews) {
  await fs.mkdir(path.dirname(REVIEWS_FILE), { recursive: true });
  await fs.writeFile(REVIEWS_FILE, `${JSON.stringify(reviews, null, 2)}\n`);
}

async function ensureReviewTable() {
  await reviewPool.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      book_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      contact_consent BOOLEAN NOT NULL DEFAULT FALSE,
      title TEXT NOT NULL DEFAULT '',
      reviewed_in TEXT NOT NULL DEFAULT '',
      review_date TEXT NOT NULL DEFAULT '',
      format TEXT NOT NULL DEFAULT '',
      body_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      source TEXT NOT NULL DEFAULT 'site',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function ensureJourneyTable() {
  await reviewPool.query(`
    CREATE TABLE IF NOT EXISTS journey_requests (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      weather TEXT NOT NULL,
      service TEXT NOT NULL,
      situation TEXT NOT NULL DEFAULT '',
      contact_preference TEXT NOT NULL DEFAULT 'email',
      phone TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await reviewPool.query(
    "ALTER TABLE journey_requests ADD COLUMN IF NOT EXISTS phone TEXT NOT NULL DEFAULT ''"
  );
}

async function importFileReviewsToDatabase() {
  const fileReviews = await readFileReviews();
  if (!fileReviews.length) return;

  const countResult = await reviewPool.query("SELECT COUNT(*)::int AS count FROM reviews");
  const currentCount = Number(countResult.rows[0]?.count || 0);
  if (currentCount > 0) return;

  for (const review of fileReviews) {
    await reviewPool.query(
      `
        INSERT INTO reviews (
          id,
          book_id,
          name,
          email,
          rating,
          contact_consent,
          title,
          reviewed_in,
          review_date,
          format,
          body_json,
          source,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13)
        ON CONFLICT (id) DO NOTHING
      `,
      [
        review.id,
        review.bookId,
        review.name,
        review.email,
        review.rating,
        review.contactConsent,
        review.title,
        review.reviewedIn,
        review.reviewDate,
        review.format,
        JSON.stringify(review.body),
        review.source,
        review.createdAt || new Date().toISOString()
      ]
    );
  }
}

async function initReviewStorage() {
  if (!hasDatabaseConfig()) {
    reviewStorage = "file";
    return;
  }

  try {
    reviewPool = new Pool(getDatabaseConfig());
    await reviewPool.query("SELECT 1");
    await ensureReviewTable();
    await ensureJourneyTable();
    await importFileReviewsToDatabase();
    reviewStorage = "postgres";
    console.log("Review storage: Postgres");
  } catch (error) {
    console.error("Postgres init failed, falling back to file storage:", error);
    if (reviewPool) {
      await reviewPool.end().catch(() => {});
    }
    reviewPool = null;
    reviewStorage = "file";
  }
}

async function readStoredReviews() {
  if (reviewPool) {
    const result = await reviewPool.query(`
      SELECT
        id,
        book_id,
        name,
        email,
        rating,
        contact_consent,
        title,
        reviewed_in,
        review_date,
        format,
        body_json,
        source,
        created_at
      FROM reviews
      ORDER BY created_at DESC
    `);

    return result.rows.map(normalizeStoredReview);
  }

  return readFileReviews();
}

async function createStoredReview(review) {
  if (reviewPool) {
    await reviewPool.query(
      `
        INSERT INTO reviews (
          id,
          book_id,
          name,
          email,
          rating,
          contact_consent,
          title,
          reviewed_in,
          review_date,
          format,
          body_json,
          source,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13)
      `,
      [
        review.id,
        review.bookId,
        review.name,
        review.email,
        review.rating,
        review.contactConsent,
        review.title,
        review.reviewedIn || "",
        review.reviewDate || "",
        review.format || "",
        JSON.stringify(review.body),
        review.source,
        review.createdAt
      ]
    );
    return;
  }

  const storedReviews = await readFileReviews();
  storedReviews.push(review);
  await writeFileReviews(storedReviews);
}

async function getAllReviews() {
  const storedReviews = await readStoredReviews();
  return [...DEFAULT_REVIEWS.map(normalizeStoredReview), ...storedReviews];
}

async function readFileJourneyRequests() {
  try {
    const raw = await fs.readFile(JOURNEY_FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function writeFileJourneyRequests(requests) {
  await fs.mkdir(path.dirname(JOURNEY_FILE), { recursive: true });
  await fs.writeFile(JOURNEY_FILE, `${JSON.stringify(requests, null, 2)}\n`);
}

async function createStoredJourneyRequest(request) {
  if (reviewPool) {
    await reviewPool.query(
      `
        INSERT INTO journey_requests (
          id,
          name,
          email,
          weather,
          service,
          situation,
          contact_preference,
          phone,
          created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      [
        request.id,
        request.name,
        request.email,
        request.weather,
        request.service,
        request.situation,
        request.contactPreference,
        request.phone,
        request.createdAt
      ]
    );
    return;
  }

  const storedRequests = await readFileJourneyRequests();
  storedRequests.push(request);
  await writeFileJourneyRequests(storedRequests);
}

// Basic Express hardening and JSON body parsing for the API endpoints.
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json({ limit: "200kb" }));

// Allows local testing and the configured production frontend to call the API.
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (LOCAL_ORIGINS.has(origin)) return cb(null, true);
      if (isTemporaryTunnelOrigin(origin)) return cb(null, true);
      if (!FRONTEND_ORIGINS.length) return cb(null, true);
      if (FRONTEND_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error("CORS: Origin not allowed"), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Lightweight email format check before sending anything to MailerLite.
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple in-memory rate limits so one browser cannot spam the endpoints.
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxAttempts = 8;
  const attempts = subscribeAttempts.get(ip) || [];
  const recentAttempts = attempts.filter((time) => now - time < windowMs);

  recentAttempts.push(now);
  subscribeAttempts.set(ip, recentAttempts);

  return recentAttempts.length > maxAttempts;
}

function isReviewRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxAttempts = 12;
  const attempts = reviewAttempts.get(ip) || [];
  const recentAttempts = attempts.filter((time) => now - time < windowMs);

  recentAttempts.push(now);
  reviewAttempts.set(ip, recentAttempts);

  return recentAttempts.length > maxAttempts;
}

function isJourneyRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxAttempts = 8;
  const attempts = journeyAttempts.get(ip) || [];
  const recentAttempts = attempts.filter((time) => now - time < windowMs);

  recentAttempts.push(now);
  journeyAttempts.set(ip, recentAttempts);

  return recentAttempts.length > maxAttempts;
}

// Render can call this to confirm the service is alive and env vars are present.
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "Wise Turtle Stories",
    mailerliteConfigured: hasMailerLiteConfig(),
    databaseConfigured: hasDatabaseConfig(),
    reviewStorage
  });
});

// Tiny API status route for quick local checks.
app.get("/api", (req, res) => {
  res.json({ ok: true, message: "Wise Turtle Stories API is running" });
});

app.get("/reviews", async (req, res) => {
  try {
    const bookId = trimText(req.query.bookId, 40);
    const allReviews = (await getAllReviews()).map(publicReview);
    const filteredReviews = bookId
      ? allReviews.filter((review) => review.bookId === bookId)
      : allReviews;

    return res.json({
      reviews: filteredReviews,
      summary: reviewSummary(filteredReviews),
      summaries: summariesByBook(allReviews)
    });
  } catch (error) {
    console.error("Reviews read error:", error);
    return res.status(500).json({ error: "Reviews are temporarily unavailable." });
  }
});

app.get("/admin/review-contacts", async (req, res) => {
  try {
    if (!isRealEnvValue(ADMIN_TOKEN)) {
      return res.status(503).json({ error: "Admin access is not configured." });
    }

    if (!isAdminAuthorized(req)) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const maxRating = req.query.maxRating ? normalizeRating(req.query.maxRating) : null;
    const storedReviews = await readStoredReviews();
    const contacts = storedReviews
      .filter((review) => review.email && review.contactConsent === true)
      .filter((review) => !maxRating || Number(review.rating || 0) <= maxRating)
      .map((review) => ({
        id: review.id,
        bookId: review.bookId,
        name: review.name,
        email: review.email,
        rating: review.rating,
        review: Array.isArray(review.body) ? review.body.join("\n\n") : review.body || "",
        createdAt: review.createdAt || ""
      }));

    return res.json({
      count: contacts.length,
      contacts
    });
  } catch (error) {
    console.error("Review contacts read error:", error);
    return res.status(500).json({ error: "Review contacts are temporarily unavailable." });
  }
});

// Do not expose the source files inside site/api when the same service hosts static pages.
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.post("/reviews", async (req, res) => {
  try {
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    if (isReviewRateLimited(ip)) {
      return res.status(429).json({ error: "Too many reviews. Please try again later." });
    }

    const bookId = trimText(req.body?.bookId, 40);
    const name = trimText(req.body?.name, 80);
    const email = trimText(req.body?.email, 180).toLowerCase();
    const body = trimText(req.body?.body, 1600);
    const rating = normalizeRating(req.body?.rating);
    const contactConsent = req.body?.contactConsent === true;

    if (!ALLOWED_REVIEW_BOOKS.has(bookId)) {
      return res.status(400).json({ error: "Unknown book." });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: "Valid email is required." });
    }

    if (!rating) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    if (body.length < 10) {
      return res.status(400).json({ error: "Please write a little more in your review." });
    }

    const review = {
      id: randomUUID(),
      bookId,
      name,
      email,
      rating,
      contactConsent,
      title: "",
      reviewedIn: "",
      reviewDate: "",
      format: "",
      body: [body],
      source: "site",
      createdAt: new Date().toISOString()
    };

    await createStoredReview(review);

    const publicReviews = (await getAllReviews()).map(publicReview);
    const bookReviews = publicReviews.filter((item) => item.bookId === bookId);

    return res.status(201).json({
      success: true,
      review: publicReview(review),
      summary: reviewSummary(bookReviews),
      summaries: summariesByBook(publicReviews)
    });
  } catch (error) {
    console.error("Reviews write error:", error);
    return res.status(500).json({ error: "Review could not be saved right now." });
  }
});

app.post("/journey", async (req, res) => {
  try {
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    if (isJourneyRateLimited(ip)) {
      return res.status(429).json({ error: "Too many requests. Please try again later." });
    }

    const name = trimText(req.body?.name, 100);
    const email = trimText(req.body?.email, 180).toLowerCase();
    const weather = trimText(req.body?.weather, 40);
    const service = trimText(req.body?.service, 40);
    const situation = trimText(req.body?.situation, 2400);
    const contactPreference = trimText(req.body?.contactPreference, 40) || "email";
    const phone = trimText(req.body?.phone, 50);

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: "Valid email is required." });
    }

    if (!ALLOWED_JOURNEY_WEATHERS.has(weather)) {
      return res.status(400).json({ error: "Please choose a weather option." });
    }

    if (!ALLOWED_JOURNEY_SERVICES.has(service)) {
      return res.status(400).json({ error: "Please choose a path." });
    }

    if (!ALLOWED_CONTACT_PREFERENCES.has(contactPreference)) {
      return res.status(400).json({ error: "Please choose a contact preference." });
    }

    if (contactPreference === "phone" && !phone) {
      return res.status(400).json({ error: "A phone number is required when phone is selected." });
    }

    if (!hasJourneyMailerLiteConfig()) {
      return res.status(503).json({
        error: "Journey email is not configured yet. Please try again in a moment."
      });
    }

    // Joining this group starts the Journey confirmation workflow in MailerLite.
    await addMailerLiteSubscriber({
      email,
      name,
      groupId: MAILERLITE_JOURNEY_GROUP_ID
    });

    const journeyRequest = {
      id: randomUUID(),
      name,
      email,
      weather,
      service,
      situation,
      contactPreference,
      phone,
      createdAt: new Date().toISOString()
    };

    await createStoredJourneyRequest(journeyRequest);

    // The database remains the source of truth if Google Sheets is temporarily unavailable.
    sendJourneyToGoogleSheet(journeyRequest).catch((error) => {
      console.error("Google Sheets sync error:", error);
    });

    return res.status(201).json({
      success: true,
      message: "Your Journey Has Begun"
    });
  } catch (error) {
    console.error("Journey request error:", error);
    return res.status(500).json({ error: "Journey request could not be saved right now." });
  }
});

// Newsletter signup: validate email, send it to MailerLite, and hide provider errors from users.
app.post("/subscribe", async (req, res) => {
  try {
    const ip = req.ip || req.socket?.remoteAddress || "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: "Too many attempts. Please try again later." });
    }

    const emailRaw = req.body?.email;
    const email = typeof emailRaw === "string" ? emailRaw.trim().toLowerCase() : "";

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!hasMailerLiteConfig()) {
      console.error("Missing MailerLite config");
      return res.status(503).json({
        error: "Newsletter signup is not configured yet."
      });
    }

    const mlResp = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MAILERLITE_API_TOKEN}`
      },
      body: JSON.stringify({
        email,
        groups: [MAILERLITE_GROUP_ID]
      })
    });

    let mlData = {};
    try {
      mlData = await mlResp.json();
    } catch (_) {
      mlData = {};
    }

    if (!mlResp.ok) {
      console.error("MailerLite error", mlResp.status, mlData);
      return res.status(502).json({
        error: "Newsletter signup is temporarily unavailable."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscribed successfully"
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Keep old .html links working while showing clean URLs in the browser.
const htmlRedirects = new Map([
  ["/index.html", "/"],
  ["/books.html", "/books"],
  ["/about.html", "/about"],
  ["/contact.html", "/contact"],
  ["/privacy.html", "/privacy"],
  ["/start.html", "/start"],
  ["/lifeafter.html", "/lifeafter"],
  ["/solidground.html", "/solidground"],
  ["/air.html", "/air"],
  ["/fire.html", "/fire"],
  ["/book-yan.html", "/book-yan"],
  ["/book-story-two.html", "/book-story-two"],
  ["/book-story-three.html", "/book-story-three"],
  ["/book-felt-sick.html", "/book-felt-sick"],
  ["/book-together-hospital.html", "/book-together-hospital"],
  ["/book-big-change.html", "/book-big-change"],
  ["/book-noah-river.html", "/book-noah-river"]
]);

// Contact content now lives at the end of The Story page.
app.get("/contact", (_req, res) => {
  res.redirect(301, "/about#contact");
});

app.use((req, res, next) => {
  const pathname = req.path;
  const targetPath = htmlRedirects.get(pathname);

  if (!targetPath) {
    return next();
  }

  const suffix = req.url.slice(pathname.length);
  return res.redirect(301, `${targetPath}${suffix}`);
});

// The same Express service hosts the static HTML/CSS/JS site for Render.
app.use(
  express.static(SITE_DIR, {
    dotfiles: "ignore",
    extensions: ["html"]
  })
);

async function startServer() {
  await initReviewStorage();

  app.listen(PORT, () => {
    console.log(`Wise Turtle Stories running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
