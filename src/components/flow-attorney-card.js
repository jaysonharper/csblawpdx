import { LitElement, html, css } from "lit";

export class FlowAttorneyCard extends LitElement {
  static specialtySlotCount = 7;
  static instances = new Set();
  static sharedFrontHeight = 0;
  static resizeHandlerAttached = false;

  static properties = {
    name: { type: String },
    image: { type: String },
    imageAlt: { type: String, attribute: "image-alt" },
    imageClass: { type: String, attribute: "image-class" },
    specialties: { type: Array },
    education: { type: Array },
    memberships: { type: Array },
    admissions: { type: Array },
    biography: { type: String },
    isFlipped: { type: Boolean, state: true, attribute: false },
  };

  static styles = css`
    :host {
      display: block;
      perspective: 1000px;
      width: 100%;
      height: 100%;
      --attorney-card-front-height: 475px;
      --attorney-specialties-bottom-gap: 16px;
    }

    .card-container {
      position: relative;
      width: 100%;
      height: var(--attorney-card-front-height);
      min-height: var(--attorney-card-front-height);
      transform-style: preserve-3d;
      transition: transform 0.6s ease-in-out;
      cursor: pointer;
    }

    .card-container.flipped {
      transform: rotateY(180deg);
    }

    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 12px;
      padding: 20px;
      background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
      border: 1px solid #e5e7eb;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .card-face:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: var(--subsection-card-hover, #b7a760);
    }

    .card-front {
      text-align: center;
      justify-content: flex-start;
      align-items: center;
      padding-top: 56px;
      padding-bottom: var(--attorney-specialties-bottom-gap);
      overflow-x: hidden;
      overflow-y: visible;
    }

    .card-back {
      transform: rotateY(180deg);
      text-align: left;
      overflow-y: auto;
      justify-content: flex-start;
    }

    .attorney-image {
      width: 175px;
      height: 175px;
      min-width: 175px;
      min-height: 175px;
      border-radius: 50%;
      margin: 0;
      object-fit: cover;
      border: 3px solid #e5e7eb;
      transition: all 0.3s ease;
      display: block;
      aspect-ratio: 1 / 1;
      flex: 0 0 auto;
    }

    /* Specific positioning adjustments for individual attorneys */
    .attorney-image.brett {
      object-position: center 0%; /* Moves the image down - face will be positioned lower in the circle */
    }

    .attorney-image.randall {
      object-position: center 0%; /* Moves the image down - face will be positioned lower in the circle */
    }

    .attorney-image.jakob {
      object-position: 10% 0%; /* Shifts subject right within the frame */
    }

    .attorney-image:hover {
      transform: scale(1.05);
      border-color: var(--subsection-image-hover, #b7a760);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .attorney-name {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--subsection-text-title, #182955);
      margin: 16px 0 0;
      line-height: 1.3;
    }

    .flip-hint {
      margin-top: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: var(--subsection-text-subtitle, #9a8b4e);
      background: rgba(255, 255, 255, 0.75);
      border: 1px dashed rgba(183, 167, 96, 0.45);
      border-radius: 999px;
      padding: 4px 10px;
    }

    .attorney-specialties {
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
      justify-items: center;
      gap: 10px;
      margin-top: 16px;
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
      overflow-y: hidden;
      padding: 2px 2px 0;
      box-sizing: border-box;
      align-content: start;
      flex: 0 0 auto;
    }

    .specialty-tag {
      display: inline-flex;
      align-items: flex-start;
      justify-content: flex-start;
      position: relative;
      padding: 7px 28px 7px 12px;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 600;
      line-height: 1.25;
      letter-spacing: 0.01em;
      background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
      color: #182955;
      transition: all 0.2s ease;
      border: 1px solid rgba(183, 167, 96, 0.5);
      cursor: pointer;
      user-select: none;
      width: 22ch;
      max-width: 100%;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
    }

    .specialty-slot-empty {
      width: 22ch;
      max-width: 100%;
      height: 31px;
      visibility: hidden;
      pointer-events: none;
    }

    .specialty-tag::after {
      content: ">";
      position: absolute;
      right: 11px;
      top: 50%;
      transform: translateY(-50%);
      color: #9a8b4e;
      font-weight: 700;
      font-size: 0.95rem;
      pointer-events: none;
    }

    .specialty-tag:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(183, 167, 96, 0.28);
      border-color: rgba(183, 167, 96, 0.75);
      background: linear-gradient(180deg, #ffffff 0%, #faf7ec 100%);
    }

    .specialty-tag:focus-visible {
      outline: 2px solid #9a8b4e;
      outline-offset: 2px;
      border-color: #9a8b4e;
    }

    .specialty-tag:active {
      transform: translateY(0);
      box-shadow: 0 2px 6px rgba(183, 167, 96, 0.25);
    }

    .flip-indicator {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 24px;
      height: 24px;
      background: rgba(183, 167, 96, 0.12);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--subsection-flip-indicator, #9a8b4e);
      border: 1px solid rgba(183, 167, 96, 0.25);
      transition: all 0.3s ease;
    }

    .flip-indicator:hover {
      background: rgba(183, 167, 96, 0.22);
      transform: scale(1.1);
    }

    .back-header {
      text-align: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #e5e7eb;
    }

    .back-header h3 {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--subsection-text-title, #182955);
      margin: 0;
    }

    .bio-section {
      margin-bottom: 20px;
    }

    .bio-section h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--subsection-text-subtitle, #9a8b4e);
      margin: 0 0 8px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #e5e7eb;
    }

    .bio-section p {
      font-size: 0.875rem;
      line-height: 1.5;
      color: #4b5563;
      margin: 0;
    }

    .bio-section ul {
      font-size: 0.875rem;
      line-height: 1.5;
      color: #4b5563;
      margin: 0;
      padding-left: 16px;
    }

    .bio-section li {
      margin-bottom: 4px;
    }

    @media (max-width: 767px) {
      .card-face {
        padding: 16px;
      }

      .card-front {
        padding-top: 52px;
      }

      .attorney-name {
        font-size: 1.125rem;
      }

      .attorney-specialties {
        gap: 8px;
      }

      .specialty-tag {
        font-size: 0.72rem;
        padding: 6px 28px 6px 10px;
      }
    }

    /* Extra small mobile screens */
    @media (max-width: 480px) {
      .card-face {
        padding: 14px;
      }

      .card-front {
        padding-top: 50px;
      }

      .attorney-specialties {
        gap: 6px;
        margin-top: 8px;
      }

      .specialty-tag {
        font-size: 0.68rem;
        padding: 5px 24px 5px 9px;
      }
    }

    /* Very small screens (like 390px and smaller) */
    @media (max-width: 390px) {
      .card-face {
        padding: 12px;
      }

      .card-front {
        padding-top: 46px;
      }

      .attorney-specialties {
        gap: 5px;
      }

      .specialty-tag {
        font-size: 0.64rem;
        padding: 4px 22px 4px 8px;
      }
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.image = "";
    this.imageAlt = "";
    this.imageClass = "";
    this.specialties = [];
    this.education = [];
    this.memberships = [];
    this.admissions = [];
    this.biography = "";
    this.isFlipped = false;
  }

  connectedCallback() {
    super.connectedCallback();
    FlowAttorneyCard.instances.add(this);

    if (!FlowAttorneyCard.resizeHandlerAttached) {
      window.addEventListener("resize", FlowAttorneyCard.handleViewportChange);
      FlowAttorneyCard.resizeHandlerAttached = true;
    }
  }

  disconnectedCallback() {
    FlowAttorneyCard.instances.delete(this);

    if (
      FlowAttorneyCard.resizeHandlerAttached &&
      FlowAttorneyCard.instances.size === 0
    ) {
      window.removeEventListener(
        "resize",
        FlowAttorneyCard.handleViewportChange,
      );
      FlowAttorneyCard.resizeHandlerAttached = false;
      FlowAttorneyCard.sharedFrontHeight = 0;
    }

    super.disconnectedCallback();
  }

  firstUpdated() {
    this.scheduleFrontHeightSync();
  }

  updated(changedProperties) {
    if (
      changedProperties.has("specialties") ||
      changedProperties.has("name") ||
      changedProperties.has("image") ||
      changedProperties.has("imageClass")
    ) {
      this.scheduleFrontHeightSync();
    }
  }

  static handleViewportChange() {
    FlowAttorneyCard.sharedFrontHeight = 0;
    FlowAttorneyCard.instances.forEach((card) => {
      card.scheduleFrontHeightSync();
    });
  }

  scheduleFrontHeightSync() {
    requestAnimationFrame(() => {
      this.syncSharedFrontHeight();
    });
  }

  syncSharedFrontHeight() {
    const frontFace = this.shadowRoot?.querySelector(".card-front");
    if (!frontFace) return;

    const requiredHeight = Math.ceil(frontFace.scrollHeight) + 2;
    if (!requiredHeight) return;

    FlowAttorneyCard.sharedFrontHeight = Math.max(
      FlowAttorneyCard.sharedFrontHeight,
      requiredHeight,
    );

    FlowAttorneyCard.instances.forEach((card) => {
      card.style.setProperty(
        "--attorney-card-front-height",
        `${FlowAttorneyCard.sharedFrontHeight}px`,
      );
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;

    // Dispatch custom event for analytics/tracking
    this.dispatchEvent(
      new CustomEvent("card-flip", {
        detail: {
          name: this.name,
          isFlipped: this.isFlipped,
          timestamp: new Date().toISOString(),
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  handleCardContainerClick(event) {
    const interactiveTarget = event.target.closest(
      "a, button, input, select, textarea",
    );

    if (interactiveTarget) {
      return;
    }

    this.flipCard();
  }

  handleFlipControlClick(event) {
    event.stopPropagation();
    this.flipCard();
  }

  handleCardKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.flipCard();
    }
  }

  handleSpecialtyClick(event, specialty) {
    event.stopPropagation(); // Prevent card flip

    // Dispatch custom event for specialty navigation
    this.dispatchEvent(
      new CustomEvent("specialty-click", {
        detail: {
          specialty,
          attorneyName: this.name,
          serviceId: `service-${specialty.toLowerCase().replace(/\s+/g, "-")}`,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  getSpecialtySlots() {
    const specialties = Array.isArray(this.specialties) ? this.specialties : [];
    const slots = specialties.slice(0, FlowAttorneyCard.specialtySlotCount);

    while (slots.length < FlowAttorneyCard.specialtySlotCount) {
      slots.push(null);
    }

    return slots;
  }

  render() {
    const specialtySlots = this.getSpecialtySlots();

    return html`
      <div
        class="card-container ${this.isFlipped ? "flipped" : ""}"
        tabindex="0"
        role="button"
        aria-label="${this.isFlipped
          ? "Show front of attorney card"
          : "Show back of attorney card"}"
        @click="${this.handleCardContainerClick}"
        @keydown="${this.handleCardKeydown}"
      >
        <!-- Front of card -->
        <div class="card-face card-front">
          <div
            class="flip-indicator"
            title="${this.isFlipped ? "Show front" : "Show back"}"
            role="button"
            tabindex="0"
            aria-label="${this.isFlipped ? "Show front" : "Show back"}"
            @click="${this.handleFlipControlClick}"
            @keydown="${this.handleCardKeydown}"
          >
            ${this.isFlipped ? "↻" : "↻"}
          </div>

          <img
            src="${this.image}"
            alt="${this.imageAlt}"
            class="attorney-image ${this.imageClass}"
            loading="lazy"
          />

          <h3 class="attorney-name">${this.name}</h3>

          <p class="flip-hint">Biography</p>

          <div class="attorney-specialties">
            ${specialtySlots.map((specialty) =>
              specialty
                ? html`
                    <button
                      type="button"
                      class="specialty-tag"
                      @click="${(e) => this.handleSpecialtyClick(e, specialty)}"
                      title="Click to view ${specialty} services"
                    >
                      ${specialty}
                    </button>
                  `
                : html`<span
                    class="specialty-slot-empty"
                    aria-hidden="true"
                  ></span>`,
            )}
          </div>
        </div>

        <!-- Back of card -->
        <div class="card-face card-back">
          <div
            class="flip-indicator"
            title="${this.isFlipped ? "Show front" : "Show back"}"
            role="button"
            tabindex="0"
            aria-label="${this.isFlipped ? "Show front" : "Show back"}"
            @click="${this.handleFlipControlClick}"
            @keydown="${this.handleCardKeydown}"
          >
            ${this.isFlipped ? "↻" : "↻"}
          </div>

          <div class="back-header">
            <h3>${this.name}</h3>
          </div>

          ${this.biography
            ? html`
                <div class="bio-section">
                  <h4>Biography</h4>
                  <p>${this.biography}</p>
                </div>
              `
            : ""}
          ${this.admissions?.length > 0
            ? html`
                <div class="bio-section">
                  <h4>Bar Admissions</h4>
                  <ul>
                    ${this.admissions.map((item) => html`<li>${item}</li>`)}
                  </ul>
                </div>
              `
            : ""}
          ${this.memberships?.length > 0
            ? html`
                <div class="bio-section">
                  <h4>Professional Memberships</h4>
                  <ul>
                    ${this.memberships.map((item) => html`<li>${item}</li>`)}
                  </ul>
                </div>
              `
            : ""}
          ${this.education?.length > 0
            ? html`
                <div class="bio-section">
                  <h4>Education</h4>
                  <ul>
                    ${this.education.map((item) => html`<li>${item}</li>`)}
                  </ul>
                </div>
              `
            : ""}
        </div>
      </div>
    `;
  }
}

customElements.define("flow-attorney-card", FlowAttorneyCard);
