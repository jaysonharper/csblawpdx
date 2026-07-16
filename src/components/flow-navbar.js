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
      border-bottom: 1px solid var(--color-gold, #b7a760);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      /* Body/UI typeface inside Shadow DOM when available */
      font-family:
        "Montserrat",
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
      justify-content: center;
      padding: 0.25rem 1rem;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      min-height: 100px;
    }

    /* Menu Toggle - Pinned to the top-left corner above the logo */
    .menu-toggle {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s ease;
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%) scale(1.2);
      z-index: 2;
    }

    .menu-toggle:hover {
      background-color: rgba(183, 167, 96, 0.15);
    }

    .menu-toggle span {
      width: 1.5rem;
      height: 2px;
      background-color: var(--color-gold, #b7a760);
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

    /* Logo Container - fills the navbar, centered, clearing the burger */
    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 92px;
      /* Clear the burger on the left; mirror on the right to stay centered */
      padding: 0 3.5rem;
      box-sizing: border-box;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .logo-container:hover {
      transform: translateY(-1px);
    }

    .logo-container:focus-visible {
      outline: 2px solid var(--color-gold, #b7a760);
      outline-offset: 4px;
      border-radius: 0.375rem;
    }

    .logo-image {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }

    /* Navigation Menu */
    .nav-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(
        --gradient-brand-diag,
        linear-gradient(135deg, #101d3d 0%, #26396b 100%)
      );
      border-bottom: 1px solid var(--color-gold, #b7a760);
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
      background-color: rgba(183, 167, 96, 0.12);
      transform: translateY(-1px);
    }

    .nav-link:hover::before {
      left: 100%;
    }

    /* Responsive Design - scale the logo up on larger screens */
    @media (min-width: 768px) {
      .navbar {
        min-height: 126px;
      }

      .menu-toggle {
        left: 1rem;
        transform: translateY(-50%) scale(1.5);
      }

      .menu-toggle span {
        width: 1.65rem;
        height: 2.2px;
      }

      .logo-container {
        height: 118px;
        padding: 0 4rem;
      }
    }

    @media (min-width: 1024px) {
      .navbar {
        padding: 0.25rem 2rem;
        min-height: 148px;
      }

      .menu-toggle {
        left: 1.5rem;
        transform: translateY(-50%) scale(1.6);
      }

      .menu-toggle span {
        width: 1.8rem;
        height: 2.5px;
      }

      .logo-container {
        height: 140px;
        padding: 0 4.5rem;
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
        <!-- Menu Toggle - Pinned top-left -->
        <div
          class="menu-toggle ${this.mobileMenuOpen ? "active" : ""}"
          @click="${this._toggleMobileMenu}"
          role="button"
          tabindex="0"
          aria-label="Toggle navigation menu"
          aria-expanded="${this.mobileMenuOpen ? "true" : "false"}"
          @keydown="${this._handleMenuToggleKeydown}"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- Company Logo (centered) -->
        <div
          class="logo-container"
          @click="${this._scrollToTop}"
          role="button"
          tabindex="0"
          aria-label="Law Offices of Carson, Seegmuller & Baker LLP - Home"
          @keydown="${this._handleCompanyNameKeydown}"
        >
          <img
            class="logo-image"
            src="/images/csb-logo-transparent.svg"
            alt="Carson, Seegmuller & Baker LLP - Attorneys at Law"
            width="500"
            height="154"
          />
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

  _handleMenuToggleKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._toggleMobileMenu();
    }
  }
}

customElements.define("flow-navbar", FlowNavbar);
