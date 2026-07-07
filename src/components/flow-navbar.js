import { LitElement, html, css } from "lit";

/**
 * A professional navigation bar component for Law Offices
 * Features GitHub-inspired dark theme with smooth animations
 */
export class FlowNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: var(--nav-bg);
      border-bottom: 1px solid #30363d;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      /* Ensure Poppins is used inside Shadow DOM when available */
      font-family:
        "Poppins",
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        "Helvetica Neue",
        Arial,
        "Noto Sans",
        sans-serif;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
    }

    /* Menu Toggle - Always visible */
    .menu-toggle {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s ease;
      transform: scale(1.5);
    }

    .menu-toggle:hover {
      background-color: #21262d;
    }

    .menu-toggle span {
      width: 1.5rem;
      height: 2px;
      background-color: #f0f6fc;
      margin: 2px 0;
      transition: all 0.3s ease;
      border-radius: 1px;
    }

    .menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    /* Logo Container */
    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center; /* Centers the text horizontally */
      text-align: center; /* fallback for older browsers */
      font-family: inherit;
      color: #333; /* A dark, professional gray */
    }

    .logo-container:hover {
      transform: translateY(-1px);
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .logo-text {
      font-size: 1.75em;
      background: var(--hero-text-title);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))
        drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))
        drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }

    .logo-container:hover .logo-text {
      text-shadow: 0 0 40px var(--nav-logo-text-hover);
    }

    /* Justice Icon Container for Tooltip */
    .justice-icon-container {
      position: relative;
      display: inline-block;
      margin-left: 0.5rem;
    }

    /* Static Scales of Justice Icon */
    .justice-icon {
      /* Mobile: smaller */
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      display: block;
      color: #fff;
      cursor: pointer;
    }

    /* Tooltip element */
    .tooltip {
      position: absolute;
      bottom: -35px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease;
      pointer-events: none;
      z-index: 1001;
    }

    /* Tooltip arrow */
    .tooltip::before {
      content: "";
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid rgba(0, 0, 0, 0.9);
    }

    /* Show tooltip on hover */
    .justice-icon-container:hover .tooltip {
      opacity: 1;
      visibility: visible;
    }

    /* Navigation Menu */
    .nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
      border-bottom: 1px solid #30363d;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .nav-menu.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;
    }

    .nav-links .nav-link {
      width: 100%;
      text-align: center;
      padding: 0.75rem 1rem;
      border: var(--navlink-text-border);
      color: var(--navlink-text);
      text-decoration: none;
      font-weight: 600;
      font-size: 0.925rem;
      border-radius: 0.375rem;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }

    .nav-link::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: var(--navlink-before);
      transition: left 0.5s ease;
    }

    .nav-link:hover {
      color: var(--navlink-text-hover);
      background-color: #21262d;
      transform: translateY(-1px);
    }

    .nav-link:hover::before {
      left: 100%;
    }

    /* Responsive Design - Scale icons and text */
    @media (min-width: 768px) {
      .menu-toggle {
        padding: 0.6rem;
        transform: scale(2);
      }

      .menu-toggle span {
        width: 1.65rem;
        height: 2.2px;
      }

      .logo-text {
        font-size: 2rem;
      }

      .justice-icon {
        /* Tablet: medium */
        width: 72px;
        height: 72px;
      }
    }

    @media (min-width: 1024px) {
      .navbar {
        padding: 1rem 2rem;
      }

      .menu-toggle {
        padding: 0.7rem;
        transform: scale(2);
      }

      .menu-toggle span {
        width: 1.8rem;
        height: 2.5px;
      }

      .logo-text {
        font-size: 2.5rem;
      }
    }
  `;

  static properties = {
    mobileMenuOpen: { type: Boolean },
  };

  constructor() {
    super();
    this.mobileMenuOpen = false;
  }

  render() {
    return html`
      <nav class="navbar">
        <!-- Menu Toggle - Always visible -->
        <div
          class="menu-toggle ${this.mobileMenuOpen ? "active" : ""}"
          @click="${this._toggleMobileMenu}"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- Company Name -->
        <div
          class="logo-container"
          @click="${this._scrollToTop}"
          role="button"
          tabindex="0"
          aria-label="Law Offices of Carson, Seegmuller & Baker LLP - Home"
          @keydown="${this._handleCompanyNameKeydown}"
        >
          <span class="logo-text">Carson, Seegmuller & Baker LLP</span>
        </div>

        <!-- Scales of Justice Icon with tooltip container -->
        <div class="justice-icon-container">
          <svg
            class="justice-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 120"
            fill="currentColor"
            role="img"
            aria-label="Justice Scales"
          >
            <!-- Base pedestal -->
            <rect x="54" y="95" width="12" height="20" rx="2" />
            <rect x="40" y="112" width="40" height="6" rx="3" />

            <!-- Main vertical post -->
            <rect x="58" y="25" width="4" height="70" rx="1" />

            <!-- Top horizontal beam -->
            <rect x="25" y="26" width="70" height="4" rx="2" />

            <!-- Left chain -->
            <g stroke="currentColor" stroke-width="1.5" fill="none">
              <line x1="35" y1="30" x2="35" y2="48" />
              <line x1="37" y1="30" x2="37" y2="48" />
            </g>

            <!-- Right chain -->
            <g stroke="currentColor" stroke-width="1.5" fill="none">
              <line x1="83" y1="30" x2="83" y2="48" />
              <line x1="85" y1="30" x2="85" y2="48" />
            </g>

            <!-- Left scale pan (balanced position) -->
            <ellipse cx="36" cy="55" rx="16" ry="3" fill="currentColor" />
            <path
              d="M20 55 Q20 59 24 61 L48 61 Q52 59 52 55"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />

            <!-- Right scale pan (balanced position) -->
            <ellipse cx="84" cy="55" rx="16" ry="3" fill="currentColor" />
            <path
              d="M68 55 Q68 59 72 61 L96 61 Q100 59 100 55"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />

            <!-- Scale pan connection points -->
            <circle cx="36" cy="48" r="2" fill="currentColor" />
            <circle cx="84" cy="48" r="2" fill="currentColor" />

            <!-- Decorative balance indicator on top -->
            <circle cx="60" cy="24" r="3" fill="currentColor" opacity="0.8" />
          </svg>
          <div class="tooltip">Justice Scales</div>
        </div>

        <!-- Navigation Menu -->
        <div class="nav-menu ${this.mobileMenuOpen ? "active" : ""}">
          <div class="nav-links">
            <a href="#why-us" class="nav-link" @click="${this._handleNavClick}"
              >Why Us?</a
            >
            <a
              href="#attorneys"
              class="nav-link"
              @click="${this._handleNavClick}"
              >Attorneys</a
            >
            <a
              href="#services"
              class="nav-link"
              @click="${this._handleNavClick}"
              >Services</a
            >
            <a
              href="#testimonials"
              class="nav-link"
              @click="${this._handleNavClick}"
              >Testimonials</a
            >
            <a href="#find-us" class="nav-link" @click="${this._handleNavClick}"
              >Find Us</a
            >
          </div>
        </div>
      </nav>
    `;
  }

  _toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  _handleNavClick(e) {
    // Prevent the browser's default hash jump (which ignores the fixed navbar
    // and races/overrides the smooth scroll below). This is the same guard the
    // footer/anchor handler uses, so nav links now land consistently.
    e.preventDefault();
    this.mobileMenuOpen = false; // Close menu when link is clicked
    this._smoothScroll(e.currentTarget.getAttribute("href"));
  }

  _smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  _scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  _handleCompanyNameKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._scrollToTop();
    }
  }
}

customElements.define("flow-navbar", FlowNavbar);
