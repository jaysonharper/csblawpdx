import { LitElement, html, css } from "lit";

/**
 * A floating call button that appears when hero section is out of view
 * Positioned on the bottom left, opposite of the scroll-to-top button
 */
export class FlowFloatingCallButton extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.8);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([visible]) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    :host([pinned]) {
      position: absolute;
      bottom: auto;
      top: -5rem;
      left: 2rem;
    }

    .call-button {
      display: flex;
      align-items: center;
      background: var(--float-call-btn-bg);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 2rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.2s ease;
      border: none;
      box-shadow: var(--float-call-btn-shadow);
      cursor: pointer;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }

    .call-button::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.6s ease;
    }

    .call-button:hover {
      background: var(--float-call-btn-hover);
      transform: translateY(-2px) scale(1.05);
      box-shadow: var(--float-call-btn-hover-shadow);
      border-color: rgba(183, 167, 96, 0.5);
      color: white;
    }

    .call-button:hover::before {
      left: 100%;
    }

    .call-button:active {
      transform: translateY(0) scale(0.95);
    }

    .call-button:focus {
      outline: none;
      box-shadow: var(--float-call-btn-focus-shadow);
    }

    .phone-icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.75rem;
      animation: buzz 5s infinite;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }

    .call-button:hover .phone-icon {
      animation: buzz-hover 0.5s ease-in-out;
      transform: translateY(-1px);
    }

    @keyframes buzz {
      0%,
      90%,
      100% {
        transform: translateX(0);
      }
      92%,
      96% {
        transform: translateX(-2px);
      }
      94%,
      98% {
        transform: translateX(2px);
      }
    }

    @keyframes buzz-hover {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-3px);
      }
      75% {
        transform: translateX(3px);
      }
    }

    /* Pulse animation when first appearing */
    :host([visible]) .call-button {
      animation: pulse 2s ease-in-out;
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
        box-shadow: var(--float-call-btn-pulse-shadow);
      }
    }

    /* Mobile responsive */
    @media (max-width: 640px) {
      :host {
        bottom: 1.5rem;
        left: 1.5rem;
      }

      .call-button {
        padding: 0.625rem 1.25rem;
        font-size: 0.925rem;
        border-radius: 1.5rem;
      }

      .phone-icon {
        width: 1.125rem;
        height: 1.125rem;
        margin-right: 0.625rem;
      }
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: opacity 0.2s ease;
      }

      .call-button {
        transition: background-color 0.2s ease;
      }

      .call-button:hover {
        transform: none;
      }

      :host([visible]) .call-button {
        animation: none;
      }

      .phone-icon {
        animation: none !important;
      }
    }
  `;

  static properties = {
    visible: { type: Boolean, reflect: true },
    phoneNumber: { type: String, attribute: "phone-number" },
    pinned: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.visible = false;
    this.pinned = false;
    this.phoneNumber = "+15032889291";
    this._intersectionObserver = null;
    this._footerObserver = null;
    this._heroElement = null;
    this._footerElement = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupIntersectionObserver();
    this._setupFooterObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
    if (this._footerObserver) {
      this._footerObserver.disconnect();
    }
  }

  render() {
    return html`
      <a
        class="call-button"
        href="tel:${this.phoneNumber}"
        @click="${this._handleCall}"
        @keydown="${this._handleKeydown}"
        aria-label="Call us now"
        title="Call us now: ${this.phoneNumber}"
      >
        <svg
          class="phone-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
          />
        </svg>
        Call Now
      </a>
    `;
  }

  _setupIntersectionObserver() {
    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      this._heroElement = document.querySelector(".hero-section");

      if (this._heroElement) {
        this._intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Button is visible when hero is NOT intersecting (out of view)
              this.visible = !entry.isIntersecting;
            });
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
          },
        );

        this._intersectionObserver.observe(this._heroElement);
      }
    });
  }

  _setupFooterObserver() {
    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      this._footerElement = document.querySelector("footer");

      if (this._footerElement) {
        this._footerObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Pin button when footer comes into view
              this.pinned = entry.isIntersecting;
            });
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
          },
        );

        this._footerObserver.observe(this._footerElement);
      }
    });
  }

  _handleCall(_e) {
    // Dispatch custom event for analytics
    this.dispatchEvent(
      new CustomEvent("flow-floating-call-click", {
        detail: {
          timestamp: Date.now(),
          phoneNumber: this.phoneNumber,
          scrollPosition: window.scrollY,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _handleKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleCall(e);
    }
  }
}

customElements.define("flow-floating-call-button", FlowFloatingCallButton);
