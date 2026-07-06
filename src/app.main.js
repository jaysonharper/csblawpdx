// Import global styles (Tailwind + custom) so Vite bundles CSS for production
import "./styles/main.css";

// Import our component library
import "./components/index.js";

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
      "🚀 Law Offices of Carson, Seegmuller & Baker LLP - Development Mode",
    );
  };
  console.log("💡 Development mode: Use clearAll() to clear console");
}

// Main application entrypoint for Law Offices of Carson, Seegmuller & Baker LLP
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

  // Setup attorney cards with data
  setupAttorneyCards();

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

function setupAttorneyCards() {
  // Attorney data
  const attorneyData = {
    "Brett S. Carson": {
      specialties: [
        "Estate Plans",
        "Real Estate",
        "Business Law",
        "Elder Law",
        "Conservatorships",
        "Guardianships",
        "Personal Injury",
      ],
      education: [
        "B.S., Colorado College and University of Oregon (1976)",
        "J.D., cum laude, Gonzaga University (1979)",
      ],
      memberships: [
        "Multnomah County Bar Association",
        "Oregon State Bar",
        "Realtors Joint Committee (1991-1993): Real Estate, Land Use, Business, Corporate and Debtor-Creditor Sections",
      ],
      admissions: ["Oregon and U.S. District Court, District of Oregon (1979)"],
      biography:
        "Director, Oregon State Council for Senior Citizens, 1989-1999. Multnomah Bar Association Senior Law Project Volunteer of the Year, 1986 & 2004; NE Family YMCA Board of Directors, 1986-1989; Hollywood Booster Board of Directors, 1986-2000; Hollywood Booster President, 1988; Hollywood Senior Center Board of Directors, 1986-2002; President, Hollywood Senior Center, 1993-1995; Lincoln High School Freshman Basketball coach, 1998-2003; Benson High School Assistant Varsity Basketball coach, 2003-present.",
    },
    "Randall H. Baker": {
      specialties: [
        "Litigation",
        "Collections",
        "Business Law",
        "Family Law",
        "Real Estate",
        "Personal Injury",
      ],
      education: [
        "University of Oregon Law School, Eugene, Oregon J.D.; Managing Board Editor, Oregon Law Review (1990)",
        "Lewis and Clark College, Portland, Oregon B.A. Economics; Four-Year Varsity Soccer (1981)",
      ],
      memberships: [
        "Oregon State Bar",
        "Washington State Bar",
        "Multnomah County Bar Association",
        "Oregon Trial Lawyers Association",
      ],
      admissions: [
        "Oregon",
        "Washington",
        "U.S. District Court, District of Oregon",
      ],
      biography:
        "Managing Board Editor, University of Oregon Law Review (1989-1990).",
    },
    "Jakob Seegmuller": {
      specialties: [
        "Estate Plans",
        "Estate Settlement",
        "Conservatorships",
        "Real Estate",
      ],
      education: [
        "Southern Oregon University B.A. Cum Laude",
        "Seattle University School of Law J.D.",
      ],
      memberships: [
        "Multnomah Bar Association",
        "Clark County Bar Association",
      ],
      admissions: [
        "Oregon State Bar Association",
        "Washington State Bar Association",
      ],
      biography:
        "Jakob Seegmuller helps individuals and families plan for the future and navigate the loss of a loved one through thoughtful estate planning and administration. He began his legal career in Vancouver, Washington, focusing on probate and estate settlement before expanding his practice to include estate planning. Today, he serves clients throughout Oregon and Washington from his hometown of Portland. The most rewarding part of Jakob’s practice is helping families move through difficult transitions with clarity and confidence rather than confusion and frustration. He believes estate settlement and planning is ultimately about people, values, and the stories that connect generations. Outside the office, Jakob and his wife, Alexandra, enjoy traveling to destinations near and far, from Italy to Vietnam to Peru. Whenever he’s near the water, he’s likely searching for a local SCUBA shop and the next dive opportunity. At home, he enjoys gathering with friends for Dungeons & Dragons or settling in for an episode—or two—of Star Trek. His love of storytelling serves him well in helping clients shape estate plans that reflect their unique family histories, goals, and legacies.",
    },
  };

  // Find and populate attorney cards
  const attorneyCards = document.querySelectorAll("flow-attorney-card");
  attorneyCards.forEach((card) => {
    const name = card.getAttribute("name");
    const data = attorneyData[name];

    if (data) {
      card.specialties = data.specialties;
      card.education = data.education;
      card.memberships = data.memberships;
      card.admissions = data.admissions;
      card.biography = data.biography;

      // Add event listeners using the reusable function
      setupAttorneyCardListeners(card, data);
    }
  });
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

  // Note: Scales icon events removed (component replaced with static SVG)

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
