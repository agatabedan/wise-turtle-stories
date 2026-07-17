/* Wise Turtle Stories site logic */

/*
 * Main book data.
 * Slider, search cards, and homepage book blocks all read from this list,
 * so book titles, covers, prices, and Amazon links are easiest to edit here.
 * Set published: false to keep a book in data (and its detail page) but hide it
 * from the slider and library until you are ready.
 */
const YAN_CATEGORY = "Yan The Little Squirrel";

const BOOKS = [
  {
    id: "yan",
    title: "Yan The Little Squirrel",
    subtitle: "Big Feelings, Little Choices",
    age: "2-5",
    category: YAN_CATEGORY,
    cover: "./assets/Cover1.jpeg",
    detailUrl: "/book-yan",
    amazonUrl: "https://www.amazon.ca/Yan-Little-Squirrel-Wise-Turtle/dp/B0GR6HLRK8",
    sampleUrl: "https://read.amazon.ca/sample/B0GR6HLRK8?clientId=share",
    price: "$18.99 CAD",
    readingAge: "2-5 years",
    printLength: "42 pages",
    language: "English",
    dimensions: "13.97 x 0.25 x 21.59 cm",
    publicationDate: "March 3, 2026",
    shortDescription:
      "Three relatable toddler stories for endless no battles, waiting meltdowns, and tearful goodbyes.",
    insideDescription:
      "Toddlers learn simple, repeatable calming steps through three real-life parenting challenges: saying no, waiting, and missing a caregiver."
  },
  {
    id: "story-two",
    title: "Yan the Little Squirrel",
    subtitle: "Big Feelings, We Calm Together",
    age: "2-5",
    category: YAN_CATEGORY,
    cover: "./assets/yan-calm-front.jpg",
    detailUrl: "/book-story-two",
    amazonUrl: "https://www.amazon.ca/Little-Squirell-Wise-Turtle-Stories/dp/B0GSZPYMLF",
    sampleUrl: "https://read.amazon.ca/sample/B0GSZPYMLF?clientId=share",
    price: "$18.99 CAD",
    readingAge: "2-5 years",
    printLength: "46 pages",
    language: "English",
    dimensions: "13.97 x 0.28 x 21.59 cm",
    publicationDate: "March 17, 2026",
    shortDescription:
      "A gentle picture book about tantrums, attention-seeking behaviour, emotional regulation, and co-regulation.",
    insideDescription:
      "Little Squirrel Yan and his parents explore big emotions through warm storytelling and relatable everyday moments."
  },
  {
    id: "story-three",
    title: "Yan the Little Squirrel",
    subtitle: "Safe Summer Adventures",
    age: "2-5",
    category: YAN_CATEGORY,
    cover: "./assets/yan-adventures-front.jpg",
    detailUrl: "/book-story-three",
    amazonUrl: "https://www.amazon.ca/Yan-Little-Squirrel-Adventures-stories/dp/B0H7WDSNDP",
    sampleUrl: "https://read.amazon.ca/sample/B0H6L4853F?clientId=share",
    price: "$18.99 CAD",
    ebookPrice: "$5.99 CAD",
    readingAge: "2-5 years",
    printLength: "58 pages",
    language: "English",
    dimensions: "13.97 x 0.36 x 21.59 cm",
    publicationDate: "June 29, 2026",
    shortDescription:
      "Three sunny stories that help toddlers practice sunscreen, hats, and drinking water through playful summer adventures.",
    insideDescription:
      "Yan, Hedgie, and Red Birdie learn simple summer safety habits through warm, playful stories made for ages 2-5."
  }
];

function getPublishedBooks() {
  return BOOKS.filter((book) => book.published !== false);
}

/*
 * Reader reviews.
 * The homepage picks two random reviews from the highest rating group, so future
 * 5-star reviews can rotate without manually changing the homepage.
 */
const REVIEWS = [
  {
    id: "megha-yan-2026-03-19",
    bookId: "yan",
    reviewer: "Megha",
    rating: 5,
    title: "A Wonderful Read for Kids and Educators!",
    reviewedIn: "Canada",
    reviewDate: "March 19, 2026",
    format: "Paperback",
    body: [
      "Yan the Little Squirrel is such a delightful book! The children absolutely loved it, especially during our circle time—it kept them engaged, curious, and excited from start to finish.",
      "The story is not only entertaining but also very informative, making it a great resource for both educators and parents. It opens up opportunities for discussion and learning in a fun and meaningful way.",
      "Highly recommend this book for classrooms and at-home reading. It’s definitely a favorite in our group!"
    ]
  },
  {
    id: "fatemeh-yan-2026-03-13",
    bookId: "yan",
    reviewer: "Fatemeh",
    rating: 5,
    title: "Great Book for Kids",
    reviewedIn: "Canada",
    reviewDate: "March 13, 2026",
    format: "Paperback",
    body: [
      "This is a very good book that helps teach children, through stories, how to cope with emotional challenges appropriate for their age (2-4).",
      "It provides them with tools to feel empowered and to handle situations more independently when their parents are not with them. The stories address common conflicts children face, such as dealing with disagreement, learning to wait patiently, and managing separation anxiety."
    ]
  }
];

let activeReviews = REVIEWS;
let reviewSummaries = buildReviewSummaries(activeReviews);
const reviewSectionState = new WeakMap();

/* Turn on all interactive pieces used across the static pages. */
document.body.classList.add("reveal-ready");

initMobileMenu();
initFooterYears();
initNewsletterForms();
initReveal();
initBookSlider();
initCoverGalleries();
initReviewSystem();
initDisabledLinks();
initLegalTocHighlight();

/* Mobile header menu: opens/closes the nav on small screens. */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");

  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Keeps footer copyright years current without editing every HTML page. */
function initFooterYears() {
  document.querySelectorAll("#year, [data-year]").forEach((yearEl) => {
    yearEl.textContent = String(new Date().getFullYear());
  });
}

/* Chooses the newsletter API URL for local development or production hosting. */
function getSubscribeEndpoint() {
  const customBase = window.WISE_TURTLE_API_BASE_URL || "";
  const isLocal =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  if (isLocal) return "http://localhost:3000/subscribe";
  if (customBase) return `${customBase.replace(/\/$/, "")}/subscribe`;
  return "/subscribe";
}

function getReviewsEndpoint(bookId = "") {
  const customBase = window.WISE_TURTLE_API_BASE_URL || "";
  const isLocal =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const base = isLocal
    ? "http://localhost:3000"
    : customBase.replace(/\/$/, "") || "";
  const path = bookId ? `/reviews?bookId=${encodeURIComponent(bookId)}` : "/reviews";

  return `${base}${path}`;
}

/* Newsletter signup form: validates email, sends it to the backend, and shows a friendly status. */
function initNewsletterForms() {
  const forms = document.querySelectorAll("[data-newsletter-form], #newsletterForm");
  if (!forms.length) return;

  forms.forEach((form) => {
    const messageEl = form
      .closest(".newsletter-box, .contact-card")
      ?.querySelector("[data-form-message], #formMessage");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value.trim();

      if (!email) {
        showFormMessage(messageEl, "Please enter your email.", "error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMessage(messageEl, "Please enter a valid email address.", "error");
        return;
      }

      showFormMessage(messageEl, "Sending your guide...", "");
      setFormDisabled(form, true);

      try {
        const response = await fetch(getSubscribeEndpoint(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });

        let data = {};
        try {
          data = await response.json();
        } catch (_) {
          data = {};
        }

        if (!response.ok) {
          throw new Error(data.error || "Subscription failed");
        }

        showFormMessage(
          messageEl,
          "You are in. Check your inbox for the parent guide.",
          "success"
        );
        form.reset();
      } catch (error) {
        console.error(error);
        showFormMessage(
          messageEl,
          "Something went wrong. Please try again in a moment.",
          "error"
        );
      } finally {
        setFormDisabled(form, false);
      }
    });
  });
}

async function initReviewSystem() {
  await loadReviewData();
  updateBookRatingDisplays();
  initReviewSections();
  initReviewForms();
  initBookLibraries();
}

async function loadReviewData() {
  try {
    const response = await fetch(getReviewsEndpoint());
    if (!response.ok) throw new Error("Reviews request failed");
    const data = await response.json();

    activeReviews = Array.isArray(data.reviews) ? data.reviews : REVIEWS;
    reviewSummaries = data.summaries || buildReviewSummaries(activeReviews);
  } catch (error) {
    console.warn("Using fallback reviews", error);
    activeReviews = REVIEWS;
    reviewSummaries = buildReviewSummaries(activeReviews);
  }
}

function buildReviewSummaries(reviews) {
  const totals = reviews.reduce((summary, review) => {
    const bookId = review.bookId;
    const rating = Number(review.rating || 0);
    if (!bookId || !rating) return summary;

    if (!summary[bookId]) {
      summary[bookId] = { total: 0, count: 0 };
    }

    summary[bookId].total += rating;
    summary[bookId].count += 1;
    return summary;
  }, {});

  return Object.fromEntries(
    Object.entries(totals).map(([bookId, data]) => [
      bookId,
      {
        average: Math.round((data.total / data.count) * 10) / 10,
        count: data.count
      }
    ])
  );
}

function getReviewSummary(bookId) {
  return reviewSummaries[bookId] || { average: 0, count: 0 };
}

function formatReviewCount(count) {
  return count === 1 ? "1 review" : `${count} reviews`;
}

function renderRatingSummaryMarkup(bookId, emptyText = "No reviews yet") {
  const summary = getReviewSummary(bookId);

  if (!summary.count) {
    return `<span class="rating-empty">${escapeHtml(emptyText)}</span>`;
  }

  const average = Number(summary.average || 0);
  const averageText = average.toFixed(1);

  return `
    <span class="rating-stars" aria-label="${escapeHtml(`${averageText} out of 5 stars`)}">
      ${renderStars(average)}
    </span>
    <strong>${escapeHtml(averageText)}</strong>
    <span>${escapeHtml(formatReviewCount(summary.count))}</span>
  `;
}

function renderBookRating(book) {
  return `
    <div class="book-rating" data-book-rating="${escapeHtml(book.id)}">
      ${renderRatingSummaryMarkup(book.id)}
    </div>
  `;
}

function updateBookRatingDisplays() {
  document.querySelectorAll("[data-book-rating]").forEach((ratingEl) => {
    const bookId = ratingEl.dataset.bookRating;
    if (!bookId) return;

    ratingEl.innerHTML = renderRatingSummaryMarkup(bookId);
    ratingEl.classList.toggle("has-reviews", getReviewSummary(bookId).count > 0);
  });
}

/* Renders review sections and lets the homepage rotate through the best-rated reviews. */
function initReviewSections() {
  document.querySelectorAll("[data-review-section]").forEach((section) => {
    renderReviewSection(section);
  });
}

function renderReviewSection(section) {
  const listEl = section.querySelector("[data-review-list]");
  const dotsEl = section.querySelector("[data-review-dots]");
  const bookId = section.dataset.reviewBook || "";
  const mode = section.dataset.reviewMode || "grid";
  const limit = Number(section.dataset.reviewLimit || (mode === "carousel" ? 2 : 30));
  const wrapper = section.closest("[data-review-wrapper]");

  if (!listEl) return;

  const state = getReviewSectionState(section);
  const allReviews =
    mode === "carousel" ? pickTopReviews({ bookId, limit }) : sortReviews(getBookReviews(bookId), state.sort);
  const reviews = mode === "carousel" || state.expanded ? allReviews : allReviews.slice(0, limit);

  if (!allReviews.length) {
    if (mode === "carousel") {
      if (wrapper) wrapper.hidden = true;
      return;
    }

    if (wrapper) wrapper.hidden = false;
    listEl.innerHTML = `
      <p class="empty-state review-empty">
        No reviews yet. Be the first to leave one.
      </p>
    `;
    if (dotsEl) dotsEl.hidden = true;
    return;
  }

  if (wrapper) wrapper.hidden = false;
  listEl.innerHTML = reviews.map((review, index) => renderReviewCard(review, index)).join("");

  if (mode === "carousel") {
    initReviewCarousel(section, reviews);
  } else {
    renderReviewTools(section, {
      total: allReviews.length,
      visible: reviews.length,
      limit,
      state
    });
    if (dotsEl) dotsEl.hidden = true;
  }
}

function getReviewSectionState(section) {
  if (!reviewSectionState.has(section)) {
    reviewSectionState.set(section, {
      sort: "newest",
      expanded: false
    });
  }

  return reviewSectionState.get(section);
}

function renderReviewTools(section, { total, visible, limit, state }) {
  const listEl = section.querySelector("[data-review-list]");
  if (!listEl) return;

  let toolsEl = section.querySelector("[data-review-tools]");
  if (!toolsEl) {
    toolsEl = document.createElement("div");
    toolsEl.className = "review-tools";
    toolsEl.dataset.reviewTools = "";
    listEl.before(toolsEl);
  }

  const canExpand = total > limit;
  toolsEl.innerHTML = `
    <label class="review-sort">
      <span>Sort reviews</span>
      <select data-review-sort>
        <option value="newest"${state.sort === "newest" ? " selected" : ""}>Newest first</option>
        <option value="highest"${state.sort === "highest" ? " selected" : ""}>Highest rating</option>
        <option value="lowest"${state.sort === "lowest" ? " selected" : ""}>Lowest rating</option>
        <option value="oldest"${state.sort === "oldest" ? " selected" : ""}>Oldest first</option>
      </select>
    </label>
    <div class="review-tools-actions">
      <span>${escapeHtml(`Showing ${visible} of ${total} reviews`)}</span>
      ${
        canExpand
          ? `<button type="button" class="btn btn-secondary btn-small" data-review-toggle>
              ${state.expanded ? "Show fewer" : "Show all reviews"}
            </button>`
          : ""
      }
    </div>
  `;

  toolsEl.querySelector("[data-review-sort]")?.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderReviewSection(section);
  });

  toolsEl.querySelector("[data-review-toggle]")?.addEventListener("click", () => {
    state.expanded = !state.expanded;
    renderReviewSection(section);
  });
}

function sortReviews(reviews, sort) {
  const sorted = [...reviews];
  const byNewest = (a, b) => getReviewTime(b) - getReviewTime(a);

  if (sort === "highest") {
    return sorted.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0) || byNewest(a, b));
  }

  if (sort === "lowest") {
    return sorted.sort((a, b) => Number(a.rating || 0) - Number(b.rating || 0) || byNewest(a, b));
  }

  if (sort === "oldest") {
    return sorted.sort((a, b) => getReviewTime(a) - getReviewTime(b));
  }

  return sorted.sort(byNewest);
}

function getReviewTime(review) {
  return Date.parse(review.createdAt || review.reviewDate || "") || 0;
}

function getBookReviews(bookId) {
  const reviews = bookId
    ? activeReviews.filter((review) => review.bookId === bookId)
    : activeReviews;

  return [...reviews].sort((a, b) => {
    return getReviewTime(b) - getReviewTime(a);
  });
}

/* Picks reviews from the highest rating group first; if there are more than two, it randomizes them. */
function pickTopReviews({ bookId, limit }) {
  const matchingReviews = activeReviews.filter((review) => !bookId || review.bookId === bookId);
  if (!matchingReviews.length) return [];

  const highestRating = Math.max(...matchingReviews.map((review) => review.rating));
  const highestReviews = shuffleReviews(
    matchingReviews.filter((review) => review.rating === highestRating)
  );

  if (highestReviews.length >= limit) return highestReviews.slice(0, limit);

  const fallbackReviews = matchingReviews
    .filter((review) => review.rating < highestRating)
    .sort((a, b) => b.rating - a.rating);

  return [...highestReviews, ...fallbackReviews].slice(0, limit);
}

/* Small carousel for homepage reviews. */
function initReviewCarousel(section, reviews) {
  const cards = Array.from(section.querySelectorAll(".review-card"));
  const dotsEl = section.querySelector("[data-review-dots]");
  const controlsEl = section.querySelector(".review-controls");
  const prevBtn = section.querySelector("[data-review-prev]");
  const nextBtn = section.querySelector("[data-review-next]");
  let currentIndex = 0;
  let timer = null;
  let autoPlayStopped = false;

  if (!cards.length) return;
  if (controlsEl) controlsEl.hidden = cards.length < 2;

  if (dotsEl) {
    dotsEl.innerHTML = reviews
      .map(
        (review, index) =>
          `<button type="button" class="review-dot" data-review-index="${index}" aria-label="Show review by ${escapeHtml(
            review.reviewer
          )}"></button>`
      )
      .join("");
  }

  const dots = Array.from(section.querySelectorAll(".review-dot"));

  function showReview(index) {
    currentIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === currentIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
      dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
    });
  }

  function scheduleAutoPlay() {
    if (cards.length < 2 || autoPlayStopped) return;
    window.clearInterval(timer);
    timer = window.setInterval(() => showReview(currentIndex + 1), 5000);
  }

  function stopAutoPlay() {
    autoPlayStopped = true;
    window.clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showReview(Number(dot.dataset.reviewIndex));
      stopAutoPlay();
    });
  });

  prevBtn?.addEventListener("click", () => {
    showReview(currentIndex - 1);
    stopAutoPlay();
  });

  nextBtn?.addEventListener("click", () => {
    showReview(currentIndex + 1);
    stopAutoPlay();
  });

  section.addEventListener("mouseenter", () => window.clearInterval(timer));
  section.addEventListener("mouseleave", scheduleAutoPlay);
  section.addEventListener("focusin", () => window.clearInterval(timer));
  section.addEventListener("focusout", scheduleAutoPlay);

  showReview(0);
  scheduleAutoPlay();
}

function initReviewForms() {
  document.querySelectorAll("[data-review-form]").forEach((form) => {
    const messageEl = form.querySelector("[data-review-message]");
    const bookId = form.dataset.reviewBook || "";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const payload = {
        bookId,
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        rating: Number(formData.get("rating")),
        body: String(formData.get("body") || "").trim(),
        contactConsent: formData.get("contactConsent") === "on"
      };

      if (!payload.name || !payload.email || !payload.rating || payload.body.length < 10) {
        showFormMessage(messageEl, "Please add your name, email, rating, and review.", "error");
        return;
      }

      showFormMessage(messageEl, "Saving your review...", "");
      setFormDisabled(form, true);

      try {
        const response = await fetch(getReviewsEndpoint(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.error || "Review could not be saved");
        }

        await loadReviewData();
        updateBookRatingDisplays();
        document
          .querySelectorAll(`[data-review-section][data-review-book="${bookId}"]`)
          .forEach((section) => renderReviewSection(section));
        form.reset();
        showFormMessage(messageEl, "Thank you. Your review is now on the page.", "success");
      } catch (error) {
        console.error(error);
        showFormMessage(messageEl, "Something went wrong. Please try again in a moment.", "error");
      } finally {
        setFormDisabled(form, false);
      }
    });
  });
}

/* Random order helper used when several reviews share the same top rating. */
function shuffleReviews(reviews) {
  return reviews
    .map((review) => ({ review, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.review);
}

/* Builds one review card from the shared REVIEWS data. */
function renderReviewCard(review, index) {
  const body = Array.isArray(review.body) ? review.body : [review.body].filter(Boolean);
  const paragraphs = body
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const rating = Number(review.rating || 0);
  const ratingText = `${rating.toFixed(1)} out of 5 stars`;
  const title = review.title ? `<h3>${escapeHtml(review.title)}</h3>` : "";
  const meta = renderReviewMeta(review);

  return `
    <article class="review-card${index === 0 ? " is-active" : ""}">
      <div class="review-topline">
        <strong>${escapeHtml(review.reviewer)}</strong>
        <span>${escapeHtml(ratingText)}</span>
      </div>
      <div class="review-stars" aria-label="${escapeHtml(ratingText)}">
        ${renderStars(rating)}
      </div>
      ${title}
      ${meta}
      <div class="review-body">
        ${paragraphs}
      </div>
    </article>
  `;
}

function renderReviewMeta(review) {
  const dateText = formatReviewDate(review);
  const locationText = review.reviewedIn ? `Reviewed in ${review.reviewedIn}` : "Reviewed";
  const meta = [];

  if (dateText) {
    meta.push(`${locationText} on ${dateText}`);
  }

  if (review.format) {
    meta.push(`Format: ${review.format}`);
  }

  return meta.map((item) => `<p class="review-meta">${escapeHtml(item)}</p>`).join("");
}

function formatReviewDate(review) {
  if (review.reviewDate) return review.reviewDate;
  if (!review.createdAt) return "";

  const date = new Date(review.createdAt);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function renderStars(rating) {
  const fullStars = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

/* Small helper for showing success/error text under newsletter forms. */
function showFormMessage(messageEl, message, type) {
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.classList.remove("success", "error");
  if (type) messageEl.classList.add(type);
}

/* Prevents double-submitting the newsletter form while the request is running. */
function setFormDisabled(form, disabled) {
  form.querySelectorAll("input, button, select, textarea").forEach((el) => {
    el.disabled = disabled;
  });
}

/* Scroll reveal animation. On mobile and reduced-motion settings it stays simple and stable. */
function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 700px)").matches;

  if (reduceMotion || mobile || !("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* Homepage book slider: changes every 3 seconds until the visitor chooses a slide manually. */
function initBookSlider() {
  const slider = document.querySelector("[data-book-slider]");
  if (!slider) return;

  const books = getPublishedBooks();
  if (!books.length) return;

  const slidesEl = slider.querySelector("[data-slider-slides]");
  const dotsEl = slider.querySelector("[data-slider-dots]");
  const prevBtn = slider.querySelector("[data-slider-prev]");
  const nextBtn = slider.querySelector("[data-slider-next]");
  let currentIndex = 0;
  let timer = null;

  slidesEl.innerHTML = books.map((book, index) => renderSliderSlide(book, index)).join("");
  dotsEl.innerHTML = books.map(
    (book, index) =>
      `<button type="button" class="slider-dot" data-slide-index="${index}" aria-label="Show ${escapeHtml(
        book.title
      )}"></button>`
  ).join("");

  const slides = Array.from(slidesEl.querySelectorAll(".book-slide"));
  const dots = Array.from(dotsEl.querySelectorAll(".slider-dot"));

  function showSlide(index) {
    currentIndex = (index + books.length) % books.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
      dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
    });
  }

  function scheduleAutoPlay() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      showSlide(currentIndex + 1);
      scheduleAutoPlay();
    }, 3000);
  }

  function stopAutoPlay() {
    window.clearTimeout(timer);
    timer = null;
  }

  prevBtn?.addEventListener("click", () => {
    showSlide(currentIndex - 1);
    stopAutoPlay();
  });

  nextBtn?.addEventListener("click", () => {
    showSlide(currentIndex + 1);
    stopAutoPlay();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideIndex));
      stopAutoPlay();
    });
  });

  showSlide(0);
  scheduleAutoPlay();
}

/* Builds one slide for the homepage carousel from the shared BOOKS data. */
function renderSliderSlide(book, index) {
  return `
    <article class="book-slide${index === 0 ? " is-active" : ""}">
      <div class="slider-cover${book.cover ? " has-cover" : ""}">
        ${renderBookVisual(book)}
      </div>
      <div class="slider-copy">
        <p class="eyebrow">${escapeHtml(book.category)} | Ages ${escapeHtml(book.age)}</p>
        <h3>${escapeHtml(book.title)}</h3>
        <p class="book-subtitle">${escapeHtml(book.subtitle)}</p>
        <p>${escapeHtml(book.shortDescription)}</p>
        <div class="inline-actions">
          <a class="btn btn-primary" href="${book.detailUrl}">Explore Book</a>
          ${renderAmazonAction(book)}
        </div>
      </div>
    </article>
  `;
}

/* Search/filter library used on the homepage and Books page. */
function initBookLibraries() {
  document.querySelectorAll("[data-book-library]").forEach((library) => {
    const searchInput = library.querySelector("[data-book-search]");
    const ageFilter = library.querySelector("[data-age-filter]");
    const categoryFilter = library.querySelector("[data-category-filter]");
    const grid = library.querySelector("[data-books-grid]");
    const empty = library.querySelector("[data-books-empty]");
    const limit = Number(library.dataset.limit || getPublishedBooks().length);

    if (!grid) return;

    function render() {
      const query = searchInput?.value.trim().toLowerCase() || "";
      const selectedAge = ageFilter?.value || "all";
      const selectedCategory = categoryFilter?.value || "all";

      const filtered = getPublishedBooks().filter((book) => {
        const haystack = `${book.title} ${book.subtitle} ${book.shortDescription} ${book.category}`
          .toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const matchesAge = selectedAge === "all" || book.age === selectedAge;
        const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
        return matchesQuery && matchesAge && matchesCategory;
      }).slice(0, limit);

      grid.innerHTML = filtered.map(renderLibraryCard).join("");
      if (empty) empty.hidden = filtered.length > 0;
    }

    [searchInput, ageFilter, categoryFilter].forEach((control) => {
      control?.addEventListener("input", render);
      control?.addEventListener("change", render);
    });

    render();
  });
}

/* Front/back cover switcher on book detail pages. */
function initCoverGalleries() {
  document.querySelectorAll("[data-cover-gallery]").forEach((gallery) => {
    const images = Array.from(gallery.querySelectorAll("[data-cover-image]"));
    const buttons = Array.from(gallery.querySelectorAll("[data-cover-button]"));
    if (!images.length || !buttons.length) return;

    function showCover(target) {
      images.forEach((image) => {
        image.classList.toggle("is-active", image.dataset.coverImage === target);
      });
      buttons.forEach((button) => {
        const active = button.dataset.coverButton === target;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => showCover(button.dataset.coverButton));
    });
  });
}

/* Builds one book card for the searchable library. */
function renderLibraryCard(book) {
  return `
    <article class="library-card">
      <div class="library-cover${book.cover ? " has-cover" : ""}">
        ${renderBookVisual(book)}
        <a class="library-cover-link" href="${book.detailUrl}" aria-label="Explore ${escapeHtml(
          book.title
        )}"></a>
      </div>
      <div class="library-copy">
        <p class="eyebrow">${escapeHtml(book.category)} | Ages ${escapeHtml(book.age)}</p>
        <h3>${escapeHtml(book.title)}</h3>
        <p class="book-subtitle">${escapeHtml(book.subtitle)}</p>
        ${renderBookRating(book)}
        ${renderBookPrice(book)}
        <p>${escapeHtml(book.shortDescription)}</p>
        <div class="inline-actions">
          <a class="btn btn-primary" href="${book.detailUrl}">Explore Book</a>
          ${renderAmazonAction(book)}
        </div>
      </div>
    </article>
  `;
}

/* Shows a real cover when available, otherwise a clean placeholder. */
function renderBookVisual(book) {
  if (book.cover) {
    return `<img src="${book.cover}" alt="Cover of ${escapeHtml(book.title)}" loading="lazy">`;
  }

  return `
    <div class="cover-placeholder" aria-label="Cover coming soon">
      <span>${escapeHtml(book.title)}</span>
      <small>Cover coming soon</small>
    </div>
  `;
}

/* Amazon button appears only when a real price and purchase link exist. */
function renderAmazonAction(book) {
  if (!book.amazonUrl || !book.price) return "";

  return `
    <a class="btn btn-secondary" href="${book.amazonUrl}" target="_blank" rel="noopener">
      Buy on Amazon
    </a>
  `;
}

/* Compact price option used inside library cards. */
function renderBookPrice(book) {
  if (!book.price) return "";
  return `
    <div class="book-price" aria-label="Paperback price">
      <span>Paperback</span>
      <strong>${escapeHtml(book.price)}</strong>
    </div>
  `;
}

/* Prevents placeholder links from navigating anywhere. */
function initDisabledLinks() {
  document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

/* Privacy policy: brief highlight on the target section when using the in-page TOC. */
function initLegalTocHighlight() {
  const toc = document.querySelector(".legal-toc");
  if (!toc) return;

  let highlightRemoveTimer = null;

  toc.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target || !target.classList.contains("legal-section")) return;

      if (highlightRemoveTimer !== null) {
        window.clearTimeout(highlightRemoveTimer);
        highlightRemoveTimer = null;
      }

      document.querySelectorAll(".legal-section.is-highlighted").forEach((el) => {
        el.classList.remove("is-highlighted");
      });

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      function runHighlight() {
        target.classList.remove("is-highlighted");
        void target.offsetWidth;
        target.classList.add("is-highlighted");
        highlightRemoveTimer = window.setTimeout(() => {
          target.classList.remove("is-highlighted");
          highlightRemoveTimer = null;
        }, 1400);
      }

      if (prefersReducedMotion) {
        target.scrollIntoView({ behavior: "auto", block: "center" });
        runHighlight();
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center" });
      window.requestAnimationFrame(() => runHighlight());
    });
  });
}

/* Escapes text from BOOKS before putting it into HTML templates. */
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
