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
    biography: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
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

    .card-face {
      position: relative;
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

    @media (max-width: 767px) {
      .card-face {
        padding: 16px;
      }

      .team-name {
        font-size: 1.125rem;
      }
    }

    @media (max-width: 480px) {
      .card-face {
        padding: 14px;
      }
    }

    @media (max-width: 390px) {
      .card-face {
        padding: 12px;
      }
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.image = "";
    this.imageAlt = "";
    this.imageClass = "";
    this.biography = [];
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
      changedProperties.has("biography")
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
    const frontFace = this.shadowRoot?.querySelector(".card-face");
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

  render() {
    const biographyParagraphs = Array.isArray(this.biography)
      ? this.biography
      : typeof this.biography === "string" && this.biography
        ? [this.biography]
        : [];

    return html`
      <div class="card-container">
        <div class="card-face">
          <img
            src="${this.image}"
            alt="${this.imageAlt}"
            class="team-image ${this.imageClass}"
            loading="lazy"
          />

          <h3 class="team-name">${this.name}</h3>

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
      </div>
    `;
  }
}

customElements.define("flow-team-card", FlowTeamCard);
