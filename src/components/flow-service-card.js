import { LitElement, html, css } from "lit";

/**
 * <flow-service-card>
 * Static (always-expanded) practice-area card. Rendered one-per-entry from
 * src/data/services.js. Consumes global design tokens (inherited through the
 * Shadow DOM boundary).
 *
 * The host element carries id="service-*" (set by the render layer) so attorney
 * specialty tags can deep-link and trigger the `.highlight-flash` animation.
 */
export class FlowServiceCard extends LitElement {
  static properties = {
    title: { type: String },
    summary: { type: String },
    description: { type: String },
    features: { type: Array },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      /* Enable container queries for intra-card tweaks. */
      container-type: inline-size;
    }

    .card {
      display: flex;
      flex-direction: column;
      flex: 1;
      text-align: center;
      padding: var(--space-sm);
      border-radius: var(--radius-card);
      background: var(--gradient-surface);
      border: 1px solid var(--color-divider, #e5e7eb);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background 0.3s ease,
        border-color 0.3s ease;
    }

    :host(:hover) .card {
      transform: translateY(-4px);
      box-shadow: var(--shadow-card-hover);
      background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
      border-color: var(--subsection-card-hover, #4682b4);
    }

    /* Flash effect triggered from the host (attorney specialty deep-link). */
    :host(.highlight-flash) .card {
      animation: highlightFlash 2s ease-out;
    }

    .title-row {
      margin-bottom: var(--space-2xs);
      flex-shrink: 0;
    }

    h3 {
      margin: 0;
      font-size: var(--font-h3);
      font-weight: 700;
      line-height: 1.3;
      color: var(--subsection-text-title, #000);
    }

    .summary {
      margin: 0;
      font-size: var(--font-sm);
      font-weight: 600;
      line-height: 1.4;
      color: #4b5563;
      flex-shrink: 0;
    }

    .details {
      text-align: left;
      padding-top: var(--space-xs);
      margin-top: var(--space-2xs);
      border-top: 3px solid var(--color-divider, #e5e7eb);
      border-image: var(--subsection-divider);
      flex-grow: 1;
    }

    .details p {
      margin: 0 0 var(--space-sm);
      font-size: var(--font-sm);
      line-height: 1.5;
      color: #374151;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
    }

    .features li {
      position: relative;
      padding: var(--space-3xs) 0 var(--space-3xs) 1.5rem;
      font-size: var(--font-sm);
      line-height: 1.4;
      color: #4b5563;
    }

    .features li::before {
      content: "✓";
      position: absolute;
      left: 0;
      font-weight: 700;
      color: #16a34a;
    }

    @keyframes highlightFlash {
      0% {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
        border-color: #1d4ed8;
      }
      25% {
        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
        transform: translateY(-6px) scale(1.01);
      }
      50% {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        transform: translateY(-2px);
      }
      100% {
        transform: translateY(-4px);
        box-shadow: var(--shadow-card-hover);
        border-color: #3b82f6;
      }
    }
  `;

  constructor() {
    super();
    this.title = "";
    this.summary = "";
    this.description = "";
    this.features = [];
  }

  render() {
    return html`
      <article class="card">
        <div class="title-row"><h3>${this.title}</h3></div>
        ${this.summary ? html`<p class="summary">${this.summary}</p>` : null}
        ${this.description
          ? html`<div class="details"><p>${this.description}</p></div>`
          : null}
        ${this.features?.length
          ? html`<ul class="features">
              ${this.features.map((f) => html`<li>${f}</li>`)}
            </ul>`
          : null}
      </article>
    `;
  }
}

if (!customElements.get("flow-service-card")) {
  customElements.define("flow-service-card", FlowServiceCard);
}
