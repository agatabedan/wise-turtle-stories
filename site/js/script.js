/* Wise Turtle Stories site logic */

/*
 * Main book data.
 * Slider, search cards, and homepage book blocks all read from this list,
 * so book titles, covers, prices, and Amazon links are easiest to edit here.
 * Set published: false to keep a book in data (and its detail page) but hide it
 * from the slider and library until you are ready.
 */
const YAN_CATEGORY = "Yan The Little Squirrel";
const NOAH_CATEGORY = "Noah The Little Otter";

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
    price: "18.99 CAD",
    readingAge: "2-5 years",
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
    price: "18.99 CAD",
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
    sampleUrl: "https://read.amazon.ca/sample/B0H7WDSNDP?clientId=share",
    price: "18.99 CAD",
    ebookPrice: "5.99 CAD",
    readingAge: "2-5 years",
    printLength: "58 pages",
    language: "English",
    dimensions: "13.97 x 0.36 x 21.59 cm",
    publicationDate: "June 29, 2026",
    shortDescription:
      "Three sunny stories that help toddlers practice sunscreen, hats, and drinking water through playful summer adventures.",
    insideDescription:
      "Yan, Hedgie, and Red Birdie learn simple summer safety habits through warm, playful stories made for ages 2-5."
  },
  {
    id: "yan-felt-sick",
    title: "Yan the Little Squirrel",
    subtitle: "Who Felt Sick",
    age: "2-5",
    category: YAN_CATEGORY,
    cover: "./assets/yan-felt-sick-front.png",
    detailUrl: "/book-felt-sick",
    amazonUrl: "https://www.amazon.ca/gp/product/B0H3JBP5ZM?ref_=dbs_m_mng_rwt_calw_tkin_2&storeType=ebooks",
    sampleUrl: "https://www.amazon.ca/gp/product/B0H3JBP5ZM?ref_=dbs_m_mng_rwt_calw_tkin_2&storeType=ebooks&asin=B0H3JBP5ZM&revisionId=ae59c0a7&format=3&depth=1",
    amazonLabel: "View Kindle edition",
    price: "3.99 CAD",
    format: "Kindle eBook",
    readingAge: "2-5 years",
    printLength: "42 pages",
    language: "English",
    publicationDate: "May 31, 2026",
    showInSlider: false,
    shortDescription:
      "A comforting story that helps young children understand illness and recovery."
  },
  {
    id: "yan-together-in-hospital",
    title: "Yan the Little Squirrel",
    subtitle: "Together in Hospital",
    age: "2-5",
    category: YAN_CATEGORY,
    cover: "./assets/yan-hospital-front.png",
    detailUrl: "/book-together-hospital",
    amazonUrl: "https://www.amazon.ca/dp/B0HD2CWFY8",
    sampleUrl: "https://www.amazon.ca/dp/B0HD2CWFY8?asin=B0HD2CWFY8&revisionId=&format=4&depth=1",
    price: "24.99 CAD",
    ebookPrice: "8.99 CAD",
    format: "Paperback",
    readingAge: "2-5 years",
    printLength: "116 pages",
    language: "English",
    dimensions: "13.97 x 0.69 x 21.59 cm",
    publicationDate: "July 31, 2026",
    showInSlider: false,
    shortDescription:
      "A gentle, reassuring collection of stories for little heroes facing sickness, hospital visits, medical procedures, and big feelings."
  },
  {
    id: "yan-big-change",
    title: "Yan the Little Squirrel",
    subtitle: "And a Big Change",
    age: "4-7",
    category: YAN_CATEGORY,
    cover: "./assets/yan-big-change-front.png",
    detailUrl: "/book-big-change",
    amazonUrl: "https://www.amazon.ca/dp/B0HG2WTM8S",
    sampleUrl: "https://www.amazon.ca/dp/B0HG2WTM8S?asin=B0HG2WTM8S&revisionId=&format=4&depth=1",
    price: "24.99 CAD",
    ebookPrice: "8.99 CAD",
    format: "Paperback",
    readingAge: "4-7 years",
    printLength: "140 pages",
    language: "English",
    dimensions: "13.97 x 0.81 x 21.59 cm",
    publicationDate: "August 19, 2026",
    showInSlider: false,
    shortDescription:
      "A gentle story about starting school, big feelings, and new beginnings."
  },
  {
    id: "noah-river-flowing",
    title: "Noah the Little Otter",
    subtitle: "And the River That Wouldn’t Stop Flowing",
    age: "3-8",
    category: NOAH_CATEGORY,
    cover: "./assets/noah-river-front.png",
    detailUrl: "/book-noah-river",
    amazonUrl: "https://www.amazon.ca/dp/B0H5JMBGX6",
    sampleUrl: "https://www.amazon.ca/dp/B0H5JMBGX6?asin=B0H5JMBGX6&revisionId=&format=4&depth=1",
    price: "14.99 CAD",
    ebookPrice: "4.99 CAD",
    format: "Paperback",
    readingAge: "3-8 years",
    printLength: "30 pages",
    language: "English",
    dimensions: "13.97 x 0.2 x 21.59 cm",
    publicationDate: "June 15, 2026",
    showInSlider: false,
    shortDescription:
      "A heartfelt story of courage, kindness, and hope for children facing big medical challenges and feelings."
  },
  {
    id: "fira-agate-forced-changes",
    title: "Fira and Agate. Forest Adventures",
    subtitle: "Forced Changes",
    age: "teenagers",
    category: "Fira and Agate",
    cover: "./assets/library/teens/fira-agate-forced-changes.jpg",
    detailUrl: "/books#teens",
    format: "Coming soon",
    shortDescription:
      "A gentle, powerful story about sudden change, loss, uncertainty, and finding your ground."
  },
  {
    id: "snowly-air",
    title: "Snowly Tales. Air.",
    subtitle: "What’s In the Air?",
    age: "adults",
    category: "Parenthood is…",
    cover: "./assets/library/adults/snowly-air.png",
    detailUrl: "/books#adults",
    format: "Coming soon",
    shortDescription:
      "For anyone who feels something is wrong but can’t explain why."
  },
  {
    id: "snowly-ground",
    title: "Snowly Tales. Ground.",
    subtitle: "Happy Every Day",
    age: "adults",
    category: "Parenthood is…",
    cover: "./assets/library/adults/snowly-ground.png",
    detailUrl: "/books#adults",
    format: "Coming soon",
    shortDescription:
      "Simple everyday practices for happiness and resilience."
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
  },
  {
    id: "grant-story-two-2026-05-24",
    bookId: "story-two",
    reviewer: "Grant",
    rating: 5,
    title: "Must read!",
    reviewedIn: "Canada",
    reviewDate: "May 24, 2026",
    format: "Paperback",
    source: "Amazon",
    body: [
      "Such a great and engaging book for both parents and kids. Our 2-year-old loved it so much and was able to follow along and identify the feelings. Don’t wait to buy this book."
    ]
  },
  {
    id: "anonymous-noah-2026-08-06",
    bookId: "noah-river-flowing",
    reviewer: "Anonymous",
    rating: 5,
    title: "Beautiful book",
    reviewedIn: "Canada",
    reviewDate: "August 6, 2026",
    format: "Paperback",
    verifiedPurchase: true,
    source: "Amazon",
    body: ["This is a beautiful story! It’s perfect for children facing medical hardships."]
  },
  {
    id: "helene-noah-2026-07-25",
    bookId: "noah-river-flowing",
    reviewer: "Helene Desjardins Roy",
    rating: 5,
    title: "Children book",
    reviewedIn: "Canada",
    reviewDate: "July 25, 2026",
    format: "Paperback",
    verifiedPurchase: true,
    source: "Amazon",
    body: ["Excellent story and very well explained for children."]
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
initJourneyForms();
initReveal();
initBookSlider();
initCoverGalleries();
initEditionSelectors();
initRelatedBooks();
initReviewSystem();
initDisabledLinks();
initLegalTocHighlight();
initProtectedStory();
initContentProtection();
initLazyFloodArtwork();
initHomeShelves();

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

/* Each homepage library shelf scrolls independently and keeps its arrows accurate. */
function initHomeShelves() {
  document.querySelectorAll("[data-home-shelf]").forEach((shelf) => {
    const track = shelf.querySelector("[data-home-shelf-track]");
    const previous = shelf.querySelector("[data-home-shelf-previous]");
    const next = shelf.querySelector("[data-home-shelf-next]");
    if (!track || !previous || !next) return;

    function updateArrows() {
      const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = maximum <= 2 || track.scrollLeft >= maximum - 2;
    }

    function move(direction) {
      track.scrollBy({
        left: direction * Math.max(track.clientWidth * 0.72, 220),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
    }

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    track.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", updateArrows, { once: true });
    });

    updateArrows();
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

function getJourneyEndpoint() {
  const customBase = window.WISE_TURTLE_API_BASE_URL || "";
  const isLocal =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  if (isLocal) return "http://localhost:3000/journey";
  if (customBase) return `${customBase.replace(/\/$/, "")}/journey`;
  return "/journey";
}

function initJourneyForms() {
  const forms = document.querySelectorAll("[data-journey-form]");
  if (!forms.length) return;

  const params = new URLSearchParams(window.location.search);
  const weather = params.get("weather") || "flood";
  const service = params.get("service") || "unsure";

  forms.forEach((form) => {
    const weatherInput = Array.from(form.querySelectorAll('input[name="weather"]')).find(
      (input) => input.value === weather
    );
    const serviceInput = Array.from(form.querySelectorAll('input[name="service"]')).find(
      (input) => input.value === service
    );
    const messageEl = form.querySelector("[data-journey-message]");
    const phoneField = form.querySelector("[data-journey-phone-field]");
    const phoneInput = form.querySelector('input[name="phone"]');
    const contactPreferenceInputs = form.querySelectorAll('input[name="contactPreference"]');

    const togglePhoneField = () => {
      const selectedPreference = form.querySelector('input[name="contactPreference"]:checked');
      const needsPhone = selectedPreference?.value === "phone";

      if (phoneField) phoneField.hidden = !needsPhone;
      if (phoneInput) {
        phoneInput.required = needsPhone;
        if (!needsPhone) phoneInput.value = "";
      }
    };

    if (weatherInput) weatherInput.checked = true;
    if (serviceInput) serviceInput.checked = true;
    contactPreferenceInputs.forEach((input) => input.addEventListener("change", togglePhoneField));
    togglePhoneField();

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        weather: String(formData.get("weather") || "").trim(),
        service: String(formData.get("service") || "").trim(),
        situation: String(formData.get("situation") || "").trim(),
        contactPreference: String(formData.get("contactPreference") || "").trim(),
        phone: String(formData.get("phone") || "").trim()
      };

      if (!payload.name || !payload.email || !payload.weather || !payload.service) {
        showFormMessage(messageEl, "Please add your name, email, weather, and path.", "error");
        return;
      }

      if (payload.contactPreference === "phone" && !payload.phone) {
        showFormMessage(messageEl, "Please add a phone number so we can call you.", "error");
        return;
      }

      showFormMessage(messageEl, "Sending your journey note...", "");
      setFormDisabled(form, true);

      try {
        const response = await fetch(getJourneyEndpoint(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        let data = {};
        try {
          data = await response.json();
        } catch (_) {
          data = {};
        }

        if (!response.ok) {
          throw new Error(data.error || "Journey form failed");
        }

        form.reset();
        if (weatherInput) weatherInput.checked = true;
        if (serviceInput) serviceInput.checked = true;
        togglePhoneField();
        showFormMessage(
          messageEl,
          "Your Journey Has Begun. Thank you for trusting us with your story. We’ll personally review your message and contact you within 24 hours. You don’t have to navigate this weather alone.",
          "success"
        );
      } catch (error) {
        console.error(error);
        showFormMessage(messageEl, "Something went wrong. Please try again in a moment.", "error");
      } finally {
        setFormDisabled(form, false);
      }
    });
  });
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

    activeReviews = mergeReviews(REVIEWS, Array.isArray(data.reviews) ? data.reviews : []);
    reviewSummaries = buildReviewSummaries(activeReviews);
  } catch (error) {
    console.warn("Using fallback reviews", error);
    activeReviews = REVIEWS;
    reviewSummaries = buildReviewSummaries(activeReviews);
  }
}

function mergeReviews(featuredReviews, storedReviews) {
  const allReviews = new Map(featuredReviews.map((review) => [review.id, review]));
  storedReviews.forEach((review) => allReviews.set(review.id, review));
  return [...allReviews.values()];
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
  initReviewLikes(listEl);

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
      ${renderReviewLikeButton(review)}
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

  if (review.verifiedPurchase) {
    meta.push("Verified Purchase");
  }

  return meta.map((item) => `<p class="review-meta">${escapeHtml(item)}</p>`).join("");
}

function getLikedReviewIds() {
  try {
    const saved = JSON.parse(localStorage.getItem("wise-turtle-liked-reviews") || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function renderReviewLikeButton(review) {
  const liked = getLikedReviewIds().has(review.id);
  return `
    <button
      type="button"
      class="review-like${liked ? " is-liked" : ""}"
      data-review-like="${escapeHtml(review.id)}"
      aria-pressed="${liked}"
    >${liked ? "♥ Liked" : "♡ Like"}</button>
  `;
}

function initReviewLikes(listEl) {
  listEl.querySelectorAll("[data-review-like]").forEach((button) => {
    button.addEventListener("click", () => {
      const reviewId = button.dataset.reviewLike;
      if (!reviewId) return;

      const likedIds = getLikedReviewIds();
      const isLiked = likedIds.has(reviewId);
      if (isLiked) likedIds.delete(reviewId);
      else likedIds.add(reviewId);

      try {
        localStorage.setItem("wise-turtle-liked-reviews", JSON.stringify([...likedIds]));
      } catch {
        // Likes remain active for the current page if storage is unavailable.
      }

      button.classList.toggle("is-liked", !isLiked);
      button.setAttribute("aria-pressed", String(!isLiked));
      button.textContent = !isLiked ? "♥ Liked" : "♡ Like";
    });
  });
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

/* Scroll reveal animation. Life After keeps a gentle vertical reveal on phones. */
function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  const isLifeAfterStory = Boolean(document.querySelector(".lifeafter-story"));
  const firstStoryReveal = document.querySelector(".lifeafter-hero .reveal");

  if (reduceMotion || (mobile && !isLifeAfterStory) || !("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // The first story page is already on screen, so reveal it after the first paint
  // instead of waiting for a scroll observer that can miss it during a reload.
  if (firstStoryReveal) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => firstStoryReveal.classList.add("is-visible"));
    });
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

  revealElements.forEach((el) => {
    if (el !== firstStoryReveal) revealObserver.observe(el);
  });
}

/* Homepage book slider: changes every 3 seconds until the visitor chooses a slide manually. */
function initBookSlider() {
  const slider = document.querySelector("[data-book-slider]");
  if (!slider) return;

  const books = getPublishedBooks().filter((book) => book.showInSlider !== false);
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
    const formatFilter = library.querySelector("[data-format-filter]");
    const grid = library.querySelector("[data-books-grid]");
    const empty = library.querySelector("[data-books-empty]");
    const viewButtons = library.querySelectorAll("[data-library-view]");
    const limit = Number(library.dataset.limit || getPublishedBooks().length);

    if (!grid) return;

    function setView(view) {
      const selectedView = view === "list" ? "list" : "grid";
      grid.dataset.view = selectedView;
      viewButtons.forEach((button) => {
        const active = button.dataset.libraryView === selectedView;
        button.setAttribute("aria-pressed", String(active));
      });
      try {
        localStorage.setItem("wise-turtle-library-view", selectedView);
      } catch {
        // Storage can be unavailable in private browsing.
      }
    }

    let savedView = "grid";
    try {
      savedView = localStorage.getItem("wise-turtle-library-view") || "grid";
    } catch {
      // Use the compact grid view when storage is unavailable.
    }
    setView(savedView);
    viewButtons.forEach((button) => {
      button.addEventListener("click", () => setView(button.dataset.libraryView));
    });

    function render() {
      const query = searchInput?.value.trim().toLowerCase() || "";
      const selectedAge = ageFilter?.value || "all";
      const selectedCategory = categoryFilter?.value || "all";
      const selectedFormat = formatFilter?.value || "all";

      const filtered = getPublishedBooks().filter((book) => {
        const haystack = `${book.title} ${book.subtitle} ${book.shortDescription} ${book.category}`
          .toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const matchesAge =
          selectedAge === "all" ||
          book.age === selectedAge ||
          (selectedAge === "2-5" && !["teenagers", "adults"].includes(book.age));
        const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
        const hasPaperback = book.format !== "Kindle eBook" && Boolean(book.price);
        const hasKindle = book.format === "Kindle eBook" || Boolean(book.ebookPrice);
        const matchesFormat =
          selectedFormat === "all" ||
          (selectedFormat === "paperback" && hasPaperback) ||
          (selectedFormat === "kindle" && hasKindle);
        return matchesQuery && matchesAge && matchesCategory && matchesFormat;
      }).slice(0, limit);

      grid.innerHTML = filtered.map(renderLibraryCard).join("");
      if (empty) empty.hidden = filtered.length > 0;
    }

    [searchInput, ageFilter, categoryFilter, formatFilter].forEach((control) => {
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
        <p>${escapeHtml(book.shortDescription)}</p>
        <div class="inline-actions">
          <a class="btn btn-primary" href="${book.detailUrl}">Explore Book</a>
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
  if (!book.amazonUrl) return "";

  return `
    <a class="btn btn-secondary" href="${book.amazonUrl}" target="_blank" rel="noopener">
      ${escapeHtml(book.amazonLabel || "Buy on Amazon")}
    </a>
  `;
}

/* Format selector on each Explore Book page. */
function initEditionSelectors() {
  document.querySelectorAll("[data-edition-selector]").forEach((selector) => {
    const price = selector.querySelector("[data-edition-current-price]");
    const buttons = selector.querySelectorAll("[data-edition-price]");
    if (!price || !buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        price.textContent = button.dataset.editionPrice || "";
      });
    });
  });
}

/* Recommendations use the current book's series first, then the same reading age. */
function initRelatedBooks() {
  const target = document.querySelector("[data-related-books]");
  const currentId = document.querySelector("[data-book-rating]")?.dataset.bookRating;
  if (!target || !currentId) return;

  const currentBook = BOOKS.find((book) => book.id === currentId);
  if (!currentBook) return;

  const related = getPublishedBooks()
    .filter((book) => book.id !== currentId)
    .sort((a, b) => {
      const score = (book) => (book.category === currentBook.category ? 2 : 0) + (book.age === currentBook.age ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, 3);

  target.innerHTML = related.map((book) => `
    <article class="related-book-card">
      <a href="${book.detailUrl}">
        <div class="related-book-cover">${renderBookVisual(book)}</div>
        <div>
          <p class="eyebrow">${escapeHtml(book.category)} | Ages ${escapeHtml(book.age)}</p>
          <h3>${escapeHtml(book.title)}</h3>
          <p class="book-subtitle">${escapeHtml(book.subtitle)}</p>
        </div>
      </a>
    </article>
  `).join("");
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

/* Makes story artwork feel non-interactive for regular visitors. */
function initProtectedStory() {
  const protectedStory = document.querySelector("[data-protected-story]");
  if (!protectedStory) return;

  ["contextmenu", "dragstart", "selectstart"].forEach((eventName) => {
    protectedStory.addEventListener(eventName, (event) => {
      event.preventDefault();
    });
  });
}

/* Discourages casual copying and saving of the site's public content. */
function initContentProtection() {
  document.documentElement.classList.add("content-protected");

  const isEditableTarget = (target) => target instanceof Element && Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]')
  );

  document.addEventListener("contextmenu", (event) => {
    if (!isEditableTarget(event.target)) event.preventDefault();
  });

  document.addEventListener("selectstart", (event) => {
    if (!isEditableTarget(event.target)) event.preventDefault();
  });

  document.addEventListener("dragstart", (event) => {
    if (event.target instanceof Element && event.target.closest("img, picture, video, a")) {
      event.preventDefault();
    }
  });

  ["copy", "cut"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => {
      if (!isEditableTarget(event.target)) event.preventDefault();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (isEditableTarget(event.target)) return;

    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && ["c", "s", "u", "x"].includes(key)) {
      event.preventDefault();
    }
  });
}

/* Flood uses many full-screen illustrations. Load each only as it nears the screen. */
function initLazyFloodArtwork() {
  const pages = Array.from(document.querySelectorAll(".lifeafter-page"));
  if (!pages.length) return;

  function loadArtwork(page) {
    const artwork = page.style.getPropertyValue("--lifeafter-bg").trim();
    if (!artwork || page.dataset.artworkLoaded === "true") return;
    page.style.setProperty("background-image", artwork, "important");
    page.dataset.artworkLoaded = "true";
  }

  if (!("IntersectionObserver" in window)) {
    pages.forEach(loadArtwork);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadArtwork(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "900px 0px" });

  pages.forEach((page, index) => {
    if (index < 2) loadArtwork(page);
    else observer.observe(page);
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
