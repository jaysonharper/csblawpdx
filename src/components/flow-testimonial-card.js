import { LitElement, html, css } from "lit";

/**
 * <flow-testimonial-card>
 * Renders a single client testimonial. Rendered one-per-entry from
 * src/data/testimonials.js. Consumes global design tokens.
 */
export class FlowTestimonialCard extends LitElement {
  static properties = {
    quote: { type: String },
    cite: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    blockquote {
      flex: 1;
      margin: 0;
      padding: var(--space-sm);
      border-radius: var(--radius-card);
      border-left: 4px solid var(--subsection-border-left, #4682b4);
      background: var(--gradient-surface);
    }

    .quote-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      margin: 0 0 var(--space-xs);
      border-radius: 9999px;
      color: var(--subsection-cite, #4682b4);
      background: rgba(70, 130, 180, 0.12);
    }

    .quote-icon svg {
      width: 1rem;
      height: 1rem;
      display: block;
    }

    p {
      margin: 0 0 var(--space-sm);
      font-size: var(--font-lead);
      font-style: italic;
      line-height: 1.6;
      color: #374151;
    }

    cite {
      font-size: var(--font-sm);
      font-weight: 600;
      font-style: normal;
      color: var(--subsection-cite, #4682b4);
    }
  `;

  constructor() {
    super();
    this.quote = "";
    this.cite = "";
  }

  render() {
    return html`
      <blockquote>
        <span class="quote-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" role="presentation">
            <path
              d="M10.2 6.6c-2.5 1.3-4 3.6-4.2 7h3.1c0 2.2-1.2 3.7-3.3 4.6l1 2.1c3.6-1.4 5.6-4.2 5.6-8V6.6h-2.2Zm8.6 0c-2.5 1.3-4 3.6-4.2 7h3.1c0 2.2-1.2 3.7-3.3 4.6l1 2.1c3.6-1.4 5.6-4.2 5.6-8V6.6h-2.2Z"
            ></path>
          </svg>
        </span>
        <p>${this.quote}</p>
        <cite>${this.cite}</cite>
      </blockquote>
    `;
  }
}

if (!customElements.get("flow-testimonial-card")) {
  customElements.define("flow-testimonial-card", FlowTestimonialCard);
}
