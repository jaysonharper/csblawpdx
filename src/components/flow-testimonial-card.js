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
        <p>${this.quote}</p>
        <cite>${this.cite}</cite>
      </blockquote>
    `;
  }
}

if (!customElements.get("flow-testimonial-card")) {
  customElements.define("flow-testimonial-card", FlowTestimonialCard);
}
