import { LitElement, html, css } from "lit";

/**
 * A professional call button component for Law Offices
 * with phone icon and animations
 */
export class FlowCallButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .call-button {
      display: flex;
      align-items: center;
      background: var(
        --gradient-brand,
        linear-gradient(135deg, #26396b 0%, #101d3d 100%)
      );
      color: #f5f5f5;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      border: 1px solid var(--color-gold, #b7a760);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      white-space: nowrap;
    }

    .call-button:hover {
      background: var(
        --gradient-gold,
        linear-gradient(135deg, #cbbd83 0%, #9a8b4e 100%)
      );
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      color: #182955;
    }

    .call-button:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .call-button:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(183, 167, 96, 0.4);
    }

    .phone-icon {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
      animation: buzz 5s infinite;
      flex-shrink: 0;
    }

    .call-button:hover .phone-icon {
      animation: buzz-hover 0.5s ease-in-out;
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

    /* Size Variants */
    :host([size="sm"]) .call-button {
      padding: 0.375rem 0.75rem;
      font-size: 0.8125rem;
    }

    :host([size="sm"]) .phone-icon {
      width: 0.875rem;
      height: 0.875rem;
      margin-right: 0.375rem;
    }

    :host([size="md"]) .call-button {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    :host([size="lg"]) .call-button {
      padding: 0.625rem 1.25rem;
      font-size: 0.925rem;
    }

    :host([size="lg"]) .phone-icon {
      width: 1.125rem;
      height: 1.125rem;
      margin-right: 0.625rem;
    }

    :host([size="xl"]) .call-button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    :host([size="xl"]) .phone-icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.75rem;
    }

    /* Theme Variants */
    :host([variant="primary"]) .call-button {
      background: var(
        --gradient-brand,
        linear-gradient(135deg, #26396b 0%, #101d3d 100%)
      );
      border-color: var(--color-gold, #b7a760);
    }

    :host([variant="primary"]) .call-button:hover {
      background: var(
        --gradient-gold,
        linear-gradient(135deg, #cbbd83 0%, #9a8b4e 100%)
      );
      color: #182955;
    }

    :host([variant="secondary"]) .call-button {
      background: linear-gradient(135deg, #101d3d 0%, #182955 100%);
      border-color: var(--color-gold, #b7a760);
    }

    :host([variant="secondary"]) .call-button:hover {
      background: linear-gradient(135deg, #182955 0%, #26396b 100%);
      border-color: var(--color-gold-light, #cbbd83);
    }

    :host([variant="hero"]) .call-button {
      background: var(--hero-call-btn-bg);
      border-color: var(--color-gold, #b7a760);
      font-size: 2rem;
      padding: 0.75rem 1.5rem;
      box-shadow: 0 4px 12px rgb(0 0 0);
      margin-top: 30px;
    }

    :host([variant="hero"]) .call-button:hover {
      border-color: var(--color-gold-light, #cbbd83);
      background: var(
        --gradient-gold,
        linear-gradient(135deg, #cbbd83 0%, #9a8b4e 100%)
      );
      color: #182955;
    }

    :host([variant="hero"]) .phone-icon {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.75rem;
    }

    /* Navbar Variant - Same styling as hero but semantically separate */
    :host([variant="navbar"]) .call-button {
      background: var(
        --gradient-brand,
        linear-gradient(135deg, #26396b 0%, #101d3d 100%)
      );
      border-color: var(--color-gold, #b7a760);
      box-shadow: 0 4px 12px rgba(24, 41, 85, 0.3);
    }

    :host([variant="navbar"]) .call-button:hover {
      background: var(
        --gradient-gold,
        linear-gradient(135deg, #cbbd83 0%, #9a8b4e 100%)
      );
      color: #182955;
      box-shadow: 0 8px 20px rgba(183, 167, 96, 0.4);
    }

    /* Navbar Variant - Larger presence on tablet/desktop where it appears */
    @media (min-width: 768px) {
      :host([variant="navbar"]) .call-button {
        font-size: 1.0625rem;
        padding: 0.75rem 1.5rem;
      }

      :host([variant="navbar"]) .phone-icon {
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.625rem;
      }
    }

    @media (min-width: 1024px) {
      :host([variant="navbar"]) .call-button {
        font-size: 1.1875rem;
        padding: 0.875rem 1.875rem;
      }

      :host([variant="navbar"]) .phone-icon {
        width: 1.375rem;
        height: 1.375rem;
        margin-right: 0.75rem;
      }
    }

    /* Disabled State */
    :host([disabled]) .call-button {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Full Width */
    :host([full-width]) {
      width: 100%;
    }

    :host([full-width]) .call-button {
      width: 100%;
      justify-content: center;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .call-button {
        font-size: 0.8125rem;
        padding: 0.5rem 0.875rem;
      }

      .phone-icon {
        width: 0.875rem;
        height: 0.875rem;
        margin-right: 0.375rem;
      }

      :host([variant="hero"]) .call-button {
        font-size: 1.5rem;
        padding: 0.625rem 1.25rem;
      }

      :host([variant="hero"]) .phone-icon {
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
      }

      :host([variant="navbar"]) .call-button {
        font-size: 0.8125rem;
        padding: 0.5rem 0.875rem;
      }
    }
  `;

  static properties = {
    phoneNumber: { type: String, attribute: "phone-number" },
    size: { type: String },
    variant: { type: String },
    disabled: { type: Boolean },
    fullWidth: { type: Boolean, attribute: "full-width" },
  };

  constructor() {
    super();
    this.phoneNumber = "+15032889291";
    this.size = "md";
    this.variant = "primary";
    this.disabled = false;
    this.fullWidth = false;
  }

  render() {
    const phoneLink = `tel:${this.phoneNumber}`;
    const displayNumber = this._formatPhoneNumber(this.phoneNumber);

    return html`
      <a
        href="${phoneLink}"
        class="call-button"
        @click="${this._handleClick}"
        role="button"
        aria-label="Call ${displayNumber}"
      >
        <svg class="phone-icon" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
          />
        </svg>
        <slot>Call ${displayNumber}</slot>
      </a>
    `;
  }

  _formatPhoneNumber(phone) {
    // Remove tel: prefix and format for display
    const cleaned = phone.replace(/^\+?1?/, "").replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
      )}`;
    }
    return phone; // Return original if can't format
  }

  _handleClick(e) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    // Dispatch custom event for analytics tracking
    this.dispatchEvent(
      new CustomEvent("flow-call-click", {
        detail: {
          phoneNumber: this.phoneNumber,
          variant: this.variant,
          size: this.size,
          originalEvent: e,
        },
        bubbles: true,
      }),
    );

    // Track the call attempt (development only)
    if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
      console.log("📞 Call initiated:", this.phoneNumber);
    }
  }
}

customElements.define("flow-call-button", FlowCallButton);
