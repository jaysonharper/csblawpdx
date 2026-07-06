import { LitElement, html, css } from "lit";

export class FlowAttorneyCard extends LitElement {
  static properties = {
    name: { type: String },
    email: { type: String },
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
    }

    .card-container {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 475px;
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
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      border: 1px solid #e5e7eb;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .card-face:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: var(--subsection-card-hover, #2563eb);
    }

    .card-front {
      text-align: center;
      justify-content: center;
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
      border-radius: 50%;
      margin: 0 auto;
      object-fit: cover;
      border: 3px solid #e5e7eb;
      transition: all 0.3s ease;
      display: block;
    }

    /* Specific positioning adjustments for individual attorneys */
    .attorney-image.brett {
      object-position: center 0%; /* Moves the image down - face will be positioned lower in the circle */
    }

    .attorney-image.randall {
      object-position: center 0%; /* Moves the image down - face will be positioned lower in the circle */
    }

    .attorney-image.jakob {
      object-position: center 0%;
    }

    .attorney-image:hover {
      transform: scale(1.05);
      border-color: var(--subsection-image-hover, #2563eb);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .attorney-name {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--subsection-text-title, #0d1117);
      margin-bottom: 1px;
      line-height: 1.3;
    }

    .attorney-email {
      margin-bottom: 20px;
    }

    .attorney-email a {
      color: var(--subsection-links);
      font-weight: 500;
      font-size: 0.875rem;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .attorney-email a:hover {
      color: var(--subsection-links-hover);
      text-decoration: underline;
    }

    .attorney-specialties {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
      /* Ensure container doesn't overflow */
      max-width: 100%;
      overflow: hidden;
    }

    .specialty-tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 12px;
      border-radius: 5px;
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--subsection-tag);
      color: white;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      cursor: pointer;
      user-select: none;
      width: 140px;
      max-width: calc(50% - 4px);
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      /* Ensure tags shrink if needed */
      flex-shrink: 1;
    }

    .specialty-tag:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    }

    .flip-indicator {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 24px;
      height: 24px;
      background: rgba(37, 99, 235, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: var(--subsection-flip-indicator, #2563eb);
      border: 1px solid rgba(37, 99, 235, 0.2);
      transition: all 0.3s ease;
    }

    .flip-indicator:hover {
      background: rgba(37, 99, 235, 0.2);
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
      color: var(--subsection-text-title, #0d1117);
      margin: 0;
    }

    .bio-section {
      margin-bottom: 20px;
    }

    .bio-section h4 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--subsection-text-subtitle, #2563eb);
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

      .attorney-image {
        width: 112px;
        height: 112px;
      }

      .attorney-name {
        font-size: 1.125rem;
      }

      .attorney-specialties {
        gap: 6px;
      }

      .specialty-tag {
        width: 105px;
        max-width: calc(50% - 3px);
        font-size: 0.7rem;
        padding: 3px 6px;
      }
    }

    /* Extra small mobile screens */
    @media (max-width: 480px) {
      .card-face {
        padding: 14px;
      }

      .attorney-specialties {
        gap: 4px;
        margin-top: 8px;
      }

      .specialty-tag {
        width: 85px;
        max-width: calc(50% - 2px);
        font-size: 0.65rem;
        padding: 2px 4px;
        border-radius: 4px;
      }
    }

    /* Very small screens (like 390px and smaller) */
    @media (max-width: 390px) {
      .card-face {
        padding: 12px;
      }

      .attorney-specialties {
        gap: 3px;
      }

      .specialty-tag {
        width: 75px;
        max-width: calc(50% - 1.5px);
        font-size: 0.6rem;
        padding: 2px 3px;
      }
    }
  `;

  constructor() {
    super();
    this.name = "";
    this.email = "";
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

  render() {
    return html`
      <div
        class="card-container ${this.isFlipped ? "flipped" : ""}"
        @click="${this.flipCard}"
      >
        <!-- Front of card -->
        <div class="card-face card-front">
          <div
            class="flip-indicator"
            title="${this.isFlipped ? "Show front" : "Show back"}"
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

          <div class="attorney-email">
            <a
              href="mailto:${this.email}"
              @click="${(e) => e.stopPropagation()}"
            >
              ${this.email}
            </a>
          </div>

          <div class="attorney-specialties">
            ${this.specialties?.map(
              (specialty) => html`
                <span
                  class="specialty-tag"
                  @click="${(e) => this.handleSpecialtyClick(e, specialty)}"
                  title="Click to view ${specialty} services"
                >
                  ${specialty}
                </span>
              `,
            ) || ""}
          </div>
        </div>

        <!-- Back of card -->
        <div class="card-face card-back">
          <div
            class="flip-indicator"
            title="${this.isFlipped ? "Show front" : "Show back"}"
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
