import { LitElement, html, css } from "lit";

export class FlowTeamCard extends LitElement {
  static instances = new Set();
  static sharedFrontHeight = 0;
  static resizeHandlerAttached = false;

  static properties = {
    name: { type: String },
    image: { type: String },
    imageAlt: { type: String, attribute: "image-alt" },
    imageClass: { type: String, attribute: "image-class" },
    education: { type: Array },
    biography: { type: Array },
    isFlipped: { type: Boolean, state: true, attribute: false },
  };

  static styles = css`
    :host {
      display: block;
      perspective: 1000px;
      width: 100%;
      height: 100%;
      --team-card-front-height: 475px;
    }

    .card-container {
      position: relative;
      width: 100%;
      height: var(--team-card-front-height);
      min-height: var(--team-card-front-height);
    }

    .card-container.flippable {
      transform-style: preserve-3d;
      transition: transform 0.6s ease-in-out;
      cursor: pointer;
    }

    .card-container.flipped {
      transform: rotateY(180deg);
    }

    .card-face {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      padding: 20px;
      background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
      border: 1px solid #e5e7eb;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.3s ease;
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .card-container.flippable .card-face {
      position: absolute;
      backface-visibility: hidden;
    }

    .card-front {
      position: relative;
      justify-content: flex-start;
      padding-top: 56px;
    }

    .card-back {
      transform: rotateY(180deg);
      text-align: left;
      align-items: stretch;
      justify-content: flex-start;
    }

    .card-face:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: var(--subsection-card-hover, #b7a760);
    }

    .team-image {
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

    .team-image.barb {
      object-position: 0% 75%;
    }
    .team-image.karen {
      object-position: 0% 75%;
    }
    .team-image.tamara {
      object-position: 0% 75%;
    }

    .team-image:hover {
      transform: scale(1.05);
      border-color: var(--subsection-image-hover, #b7a760);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .team-name {
      font-family: var(--font-family-display);
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

    .team-bio {
      margin-top: 16px;
      width: 100%;
      text-align: left;
    }

    .team-bio p {
      font-size: 0.875rem;
      line-height: 1.5;
      color: #4b5563;
      margin: 0;
    }

    .team-bio p + p {
      margin-top: 0.75rem;
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

    .flip-indicator.placeholder,
    .flip-hint.placeholder {
      visibility: hidden;
      pointer-events: none;
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

    .bio-section h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--subsection-text-subtitle, #9a8b4e);
      margin: 0 0 8px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #e5e7eb;
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

      .team-name {
        font-size: 1.125rem;
      }
    }

    @media (max-width: 480px) {
      .card-face {
        padding: 14px;
      }

      .card-front {
        padding-top: 50px;
      }
    }

    @media (max-width: 390px) {
      .card-face {
        padding: 12px;
      }

      .card-front {
        padding-top: 46px;
      }
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.image = "";
    this.imageAlt = "";
    this.imageClass = "";
    this.education = [];
    this.biography = [];
    this.isFlipped = false;
  }

  connectedCallback() {
    super.connectedCallback();
    FlowTeamCard.instances.add(this);

    if (!FlowTeamCard.resizeHandlerAttached) {
      window.addEventListener("resize", FlowTeamCard.handleViewportChange);
      FlowTeamCard.resizeHandlerAttached = true;
    }
  }

  disconnectedCallback() {
    FlowTeamCard.instances.delete(this);

    if (
      FlowTeamCard.resizeHandlerAttached &&
      FlowTeamCard.instances.size === 0
    ) {
      window.removeEventListener("resize", FlowTeamCard.handleViewportChange);
      FlowTeamCard.resizeHandlerAttached = false;
      FlowTeamCard.sharedFrontHeight = 0;
    }

    super.disconnectedCallback();
  }

  firstUpdated() {
    this.scheduleFrontHeightSync();
  }

  updated(changedProperties) {
    if (
      changedProperties.has("name") ||
      changedProperties.has("image") ||
      changedProperties.has("imageClass") ||
      changedProperties.has("biography") ||
      changedProperties.has("education")
    ) {
      this.scheduleFrontHeightSync();
    }
  }

  static handleViewportChange() {
    FlowTeamCard.sharedFrontHeight = 0;
    FlowTeamCard.instances.forEach((card) => {
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

    FlowTeamCard.sharedFrontHeight = Math.max(
      FlowTeamCard.sharedFrontHeight,
      requiredHeight,
    );

    FlowTeamCard.instances.forEach((card) => {
      card.style.setProperty(
        "--team-card-front-height",
        `${FlowTeamCard.sharedFrontHeight}px`,
      );
    });
  }

  getEducationItems() {
    if (Array.isArray(this.education)) {
      return this.education.filter((item) => typeof item === "string" && item);
    }

    if (typeof this.education === "string" && this.education) {
      return [this.education];
    }

    return [];
  }

  getBiographyParagraphs() {
    if (Array.isArray(this.biography)) {
      return this.biography;
    }

    if (typeof this.biography === "string" && this.biography) {
      return [this.biography];
    }

    return [];
  }

  get hasEducationDetails() {
    return this.getEducationItems().length > 0;
  }

  flipCard() {
    if (!this.hasEducationDetails) return;

    this.isFlipped = !this.isFlipped;

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
    if (!this.hasEducationDetails) return;

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
    if (!this.hasEducationDetails) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.flipCard();
    }
  }

  render() {
    const biographyParagraphs = this.getBiographyParagraphs();
    const educationItems = this.getEducationItems();
    const isFlippable = educationItems.length > 0;

    return html`
      <div
        class="card-container ${isFlippable ? "flippable" : ""} ${this.isFlipped
          ? "flipped"
          : ""}"
        tabindex="${isFlippable ? "0" : "-1"}"
        role="${isFlippable ? "button" : "presentation"}"
        aria-label="${isFlippable
          ? this.isFlipped
            ? "Show front of team card"
            : "Show back of team card"
          : "Team member card"}"
        @click="${this.handleCardContainerClick}"
        @keydown="${this.handleCardKeydown}"
      >
        <div class="card-face card-front">
          <div
            class="flip-indicator ${isFlippable ? "" : "placeholder"}"
            title="${this.isFlipped ? "Show front" : "Show back"}"
            role="${isFlippable ? "button" : "presentation"}"
            tabindex="${isFlippable ? "0" : "-1"}"
            aria-label="${isFlippable
              ? this.isFlipped
                ? "Show front"
                : "Show back"
              : ""}"
            aria-hidden="${isFlippable ? "false" : "true"}"
            @click="${this.handleFlipControlClick}"
            @keydown="${this.handleCardKeydown}"
          >
            ↻
          </div>

          <img
            src="${this.image}"
            alt="${this.imageAlt}"
            class="team-image ${this.imageClass}"
            loading="lazy"
          />

          <h3 class="team-name">${this.name}</h3>

          <p class="flip-hint ${isFlippable ? "" : "placeholder"}">Education</p>
          ${biographyParagraphs.length > 0
            ? html`
                <div class="team-bio">
                  ${biographyParagraphs.map(
                    (paragraph) => html`<p>${paragraph}</p>`,
                  )}
                </div>
              `
            : ""}
        </div>

        ${isFlippable
          ? html`
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
                  ↻
                </div>

                <div class="back-header">
                  <h3>${this.name}</h3>
                </div>

                <div class="bio-section">
                  <h4>Education</h4>
                  <ul>
                    ${educationItems.map((item) => html`<li>${item}</li>`)}
                  </ul>
                </div>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define("flow-team-card", FlowTeamCard);
