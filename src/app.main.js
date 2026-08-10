// Import global styles (Tailwind + custom) so Vite bundles CSS for production
import "./styles/main.css";

// Import our component library
import "./components/index.js";

// Content data (edit these lists to update page content)
import { services } from "./data/services.js";
import { testimonials } from "./data/testimonials.js";
import { attorneys } from "./data/attorneys.js";
import { teamMembers } from "./data/team-members.js";

let testimonialRotationTimer = null;
let testimonialResizeDebounceTimer = null;
let testimonialResizeListenerAttached = false;
let testimonialFixedCardHeight = 0;
let testimonialRenderToken = 0;

// Debug browser session differences (development only)
if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
  console.log("Browser info:", {
    userAgent: navigator.userAgent,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    language: navigator.language,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    devicePixelRatio: window.devicePixelRatio,
    hasLocalStorage: typeof Storage !== "undefined",
    timestamp: new Date().toISOString(),
  });

  // Check for browser extensions that might affect rendering
  if (window.chrome && window.chrome.runtime) {
    console.log(
      "Chrome extensions detected - this may affect rendering in logged-in sessions",
    );
  }
}

// Development utilities
if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
  // Add global console clearing function for development
  window.clearAll = () => {
    console.clear();
    console.log("🧹 Console cleared!");
    console.log(
      "🚀 Law Offices of Carson Seegmuller & Baker LLP - Development Mode",
    );
  };
  console.log("💡 Development mode: Use clearAll() to clear console");
}

// Main application entrypoint for Law Offices of Carson Seegmuller & Baker LLP
// Only run DOM wiring when `document` exists (avoid errors in Node test env)
if (typeof document !== "undefined") {
  // Ensure DOM is fully loaded before initializing
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    // DOM is already ready
    initializeApp();
  }
}

function initializeApp() {
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    console.log("Initializing app at:", new Date().toISOString());
  }

  // Render data-driven sections from content arrays
  renderServices();
  renderTestimonials();
  renderAttorneys();
  renderTeamMembers();

  // Expose the fixed navbar's height so the hero can offset below it
  setupNavbarHeightVar();

  // Setup smooth scrolling for navigation links
  setupSmoothScrolling();

  // Setup attorney specialty tag scrolling
  setupAttorneySpecialtyScrolling();

  // Setup component event listeners
  setupComponentEvents();

  // Setup scroll animations
  setupScrollAnimations();

  // Setup phone call functionality
  setupPhoneCallHandling();

  // Force layout recalculation to ensure consistent rendering
  setTimeout(() => {
    const serviceHighlights = document.querySelector(".service-highlights");
    if (serviceHighlights) {
      serviceHighlights.style.display = "none";
      serviceHighlights.offsetHeight; // Force reflow
      serviceHighlights.style.display = "grid";
      if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
        console.log("Service highlights layout refreshed");
      }
    }
  }, 100);

  // Demo button toggle behavior (used by unit test main.dom.test.js)
  // Keeps logic isolated so it doesn't interfere with broader app code
  setupDemoButtonToggle();
}

function renderServices() {
  const container = document.querySelector(".service-highlights");
  if (!container) return;
  container.replaceChildren(
    ...services.map((service) => {
      const card = document.createElement("flow-service-card");
      card.id = service.id;
      card.title = service.title;
      card.summary = service.summary;
      card.description = service.description;
      card.features = service.features;
      return card;
    }),
  );
}

function renderTestimonials() {
  if (testimonialRotationTimer) {
    clearInterval(testimonialRotationTimer);
    testimonialRotationTimer = null;
  }

  if (!testimonialResizeListenerAttached && typeof window !== "undefined") {
    testimonialResizeListenerAttached = true;
    window.addEventListener("resize", () => {
      if (testimonialResizeDebounceTimer) {
        clearTimeout(testimonialResizeDebounceTimer);
      }

      testimonialResizeDebounceTimer = setTimeout(() => {
        renderTestimonials();
      }, 150);
    });
  }

  const container = document.querySelector(".testimonial-preview");
  if (!container) return;

  const renderToken = ++testimonialRenderToken;

  const total = testimonials.length;
  if (total === 0) {
    container.replaceChildren();
    return;
  }

  const renderCards = (items) => {
    container.replaceChildren(
      ...items.map((t) => {
        const card = document.createElement("flow-testimonial-card");
        card.quote = t.quote;
        card.cite = t.cite;
        if (testimonialFixedCardHeight > 0) {
          card.style.height = `${testimonialFixedCardHeight}px`;
        }
        return card;
      }),
    );
  };

  const updateUniformHeight = async (rerender) => {
    const measuredHeight = await calculateMaxTestimonialCardHeight(container);
    if (renderToken !== testimonialRenderToken) return;
    if (measuredHeight > 0 && measuredHeight !== testimonialFixedCardHeight) {
      testimonialFixedCardHeight = measuredHeight;
      rerender();
    }
  };

  if (total <= 2) {
    renderCards(testimonials.slice(0, 2));
    void updateUniformHeight(() => {
      renderCards(testimonials.slice(0, 2));
    });
    return;
  }

  let startIndex = 0;
  const renderVisiblePair = () => {
    const visible = [
      testimonials[startIndex],
      testimonials[(startIndex + 1) % total],
    ];
    renderCards(visible);
  };

  renderVisiblePair();
  void updateUniformHeight(renderVisiblePair);

  testimonialRotationTimer = setInterval(() => {
    startIndex = (startIndex + 1) % total;
    renderVisiblePair();
  }, 5000);
}

function getWordCount(text = "") {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

async function calculateMaxTestimonialCardHeight(container) {
  if (!container || testimonials.length === 0) return 0;

  const longestByWords = testimonials.reduce((longest, current) => {
    return getWordCount(current.quote) > getWordCount(longest.quote)
      ? current
      : longest;
  }, testimonials[0]);

  const existingCard = container.querySelector("flow-testimonial-card");
  const measuredWidth = existingCard?.getBoundingClientRect().width;
  const fallbackWidth = container.getBoundingClientRect().width;

  const probe = document.createElement("flow-testimonial-card");
  probe.quote = longestByWords.quote;
  probe.cite = longestByWords.cite;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.top = "0";
  probe.style.left = "-99999px";
  probe.style.zIndex = "-1";
  const probeWidth =
    measuredWidth && measuredWidth > 0 ? measuredWidth : fallbackWidth;
  if (probeWidth && probeWidth > 0) {
    probe.style.width = `${probeWidth}px`;
  }

  document.body.appendChild(probe);

  try {
    if (typeof probe.updateComplete?.then === "function") {
      await probe.updateComplete;
    }
    return Math.ceil(probe.getBoundingClientRect().height);
  } finally {
    probe.remove();
  }
}

function renderAttorneys() {
  const container = document.querySelector(".attorney-preview");
  if (!container) return;
  container.replaceChildren(
    ...attorneys.map((data) => {
      const card = document.createElement("flow-attorney-card");
      card.setAttribute("name", data.name);
      card.setAttribute("image", data.image);
      card.setAttribute("image-alt", data.imageAlt);
      card.setAttribute("image-class", data.imageClass);
      card.specialties = data.specialties;
      card.education = data.education;
      card.memberships = data.memberships;
      card.admissions = data.admissions;
      card.biography = data.biography;

      // Add event listeners using the reusable function
      setupAttorneyCardListeners(card, data);
      return card;
    }),
  );
}

function renderTeamMembers() {
  const container = document.querySelector(".team-preview");
  if (!container) return;
  container.replaceChildren(
    ...teamMembers.map((data) => {
      const card = document.createElement("flow-team-card");
      card.setAttribute("name", data.name);
      card.setAttribute("image", data.image);
      card.setAttribute("image-alt", data.imageAlt);
      card.setAttribute("image-class", data.imageClass);
      card.education = data.education;
      card.biography = data.biography;
      return card;
    }),
  );
}

function setupAttorneyCardListeners(card) {
  const attorneyName = card.getAttribute("name");

  // Listen for card flip events
  card.addEventListener("card-flip", (e) => {
    trackEvent("attorney_card_flipped", {
      attorney_name: e.detail.name || attorneyName,
      is_flipped: e.detail.isFlipped,
      timestamp: e.detail.timestamp || new Date().toISOString(),
      source: "attorney_card_flip",
    });
  });

  // Listen for specialty tag clicks from within the card
  card.addEventListener("specialty-click", (e) => {
    const { serviceId, specialty, attorneyName: eventAttorneyName } = e.detail;

    // Delegate to the existing scroll utility function
    scrollToService(serviceId, {
      source: "attorney_card_specialty",
      attorneyName: eventAttorneyName || attorneyName,
      specialty: specialty,
    });
  });
}

// Measure the fixed navbar and publish its height as --nav-height so the hero
// section can offset its content below the navbar on any screen size. A
// ResizeObserver keeps it accurate across web-font load, resizes and breakpoints.
function setupNavbarHeightVar() {
  const navbar = document.querySelector("flow-navbar");
  if (!navbar) return;

  const apply = () => {
    const height = navbar.offsetHeight;
    if (height) {
      document.documentElement.style.setProperty("--nav-height", `${height}px`);
    }
  };

  apply();

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(apply).observe(navbar);
  } else {
    window.addEventListener("resize", apply);
    window.addEventListener("load", apply);
  }
}

function setupSmoothScrolling() {
  // Handle all anchor links for smooth scrolling
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
}

function setupAttorneySpecialtyScrolling() {
  // Handle clicks on attorney specialty tags
  document.addEventListener("click", (e) => {
    const specialtyTag = e.target.closest(".specialty-tag[data-service]");
    if (specialtyTag) {
      e.preventDefault();
      e.stopPropagation(); // Prevent other click handlers from interfering

      const serviceId = specialtyTag.getAttribute("data-service");

      // Add visual feedback
      specialtyTag.style.transform = "scale(0.95)";
      setTimeout(() => {
        specialtyTag.style.transform = "";
      }, 150);

      scrollToService(serviceId, {
        source: "specialty_tag_direct",
        element: specialtyTag,
      });
    }
  });
}

// Utility function for scrolling to services with consistent behavior
function scrollToService(serviceId, options = {}) {
  const {
    source = "unknown",
    attorneyName,
    specialty,
    // Unused currently; reserved for future use
    element: _element,
  } = options;

  const targetElement = document.getElementById(serviceId);

  if (!targetElement) {
    console.error(`Target element not found for service: ${serviceId}`);
    return false;
  }

  // Calculate scroll position
  const currentScrollY = window.scrollY;
  const targetRect = targetElement.getBoundingClientRect();
  const absoluteTop = targetRect.top + currentScrollY;

  // Calculate navbar height and responsive offset
  const navbar =
    document.querySelector("flow-navbar") ||
    document.querySelector("nav") ||
    document.querySelector("header");

  let navbarHeight = 80; // Default fallback
  if (navbar) {
    const navbarRect = navbar.getBoundingClientRect();
    navbarHeight = navbarRect.height;
  }

  // Add extra padding for larger screens to ensure top border is visible
  const extraPadding = window.innerWidth >= 768 ? 40 : 20;
  const offsetTop = absoluteTop - navbarHeight - extraPadding;

  // Smooth scroll to the service
  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });

  // Add highlight effect to the target service
  targetElement.classList.add("highlight-flash");
  setTimeout(() => {
    targetElement.classList.remove("highlight-flash");
  }, 2000);

  // Track the scroll event
  const trackingData = {
    service_id: serviceId,
    source: source,
    scroll_position: currentScrollY,
    target_position: offsetTop,
    timestamp: new Date().toISOString(),
  };

  if (attorneyName) trackingData.attorney_name = attorneyName;
  if (specialty) trackingData.specialty = specialty;

  trackEvent("service_navigation", trackingData);

  return true;
}

function setupComponentEvents() {
  // Listen for custom flow-button events
  document.addEventListener("flow-click", (e) => {
    // Handle different button actions
    const target = e.detail.originalEvent.target.closest("a");
    if (target && target.href.startsWith("tel:")) {
      // Phone call button - handled by setupPhoneCallHandling
      return;
    }

    // Note: Notifications can be added explicitly when needed
  });

  // Listen for custom flow-call-button events
  document.addEventListener("flow-call-click", (e) => {
    const { phoneNumber, variant, size } = e.detail;

    // Track call attempt with additional context
    trackEvent("phone_call_attempted", {
      phone_number: phoneNumber,
      source: variant === "hero" ? "hero_section" : "navbar",
      button_size: size,
      button_variant: variant,
    });

    // Note: Call confirmation alerts can be added explicitly when needed
  });

  // Listen for alert events
  document.addEventListener("flow-alert-closed", (_e) => {
    // Note: Could track alert closure analytics here
  });

  // Listen for scroll-to-top events
  document.addEventListener("flow-scroll-top-click", (e) => {
    // Track scroll to top usage
    trackEvent("scroll_to_top_used", {
      timestamp: e.detail.timestamp,
      scroll_position: e.detail.scrollPosition,
      source: "scroll_to_top_button",
    });

    // Note: Scroll confirmation alerts can be added explicitly when needed
  });

  // Listen for floating call button events
  document.addEventListener("flow-floating-call-click", (e) => {
    // Track floating call button usage
    trackEvent("floating_call_button_clicked", {
      timestamp: e.detail.timestamp,
      phone_number: e.detail.phoneNumber,
      scroll_position: e.detail.scrollPosition,
      source: "floating_call_button",
    });
  });
}

function setupScrollAnimations() {
  // Create an intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // entry.target.classList.add("fade-in");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Observe all content sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    observer.observe(section);
  });
}

function setupPhoneCallHandling() {
  // Track phone call attempts for analytics
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="tel:"]');
    if (link) {
      const phoneNumber = link.href.replace("tel:", "");

      // Track call attempt (you could send this to analytics)
      trackEvent("phone_call_attempted", {
        phone_number: phoneNumber,
        source: link.closest(".call-button") ? "navbar" : "hero",
      });

      // Note: Call confirmation alerts can be added explicitly when needed
    }
  });
}

function trackEvent(eventName, eventData) {
  // Placeholder for analytics tracking
  // You could integrate with Google Analytics, Mixpanel, etc.
  console.log("Event tracked:", eventName, eventData);

  // Example integration:
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', eventName, eventData);
  // }
}

// Export main functions for testing and modularity
export {
  initializeApp,
  setupSmoothScrolling,
  setupComponentEvents,
  trackEvent,
  scrollToService,
};

// --- Internal helpers (not exported) ---
function setupDemoButtonToggle() {
  const app = document.getElementById("app");
  const btn = document.getElementById("btn");
  if (!app || !btn) return; // Safe no-op if elements not present on page

  // Avoid adding multiple listeners if initializeApp runs more than once
  if (btn.__flowToggleAttached) return;
  btn.__flowToggleAttached = true;

  btn.addEventListener("click", () => {
    const isActive = app.classList.toggle("scale-99");
    if (isActive) {
      app.classList.add("transition-transform");
      btn.textContent = "Clicked ✓";
    } else {
      app.classList.remove("transition-transform");
      btn.textContent = "Click me";
    }
  });
}
