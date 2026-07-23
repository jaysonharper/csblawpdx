import { describe, it, expect, beforeAll, afterEach } from "vitest";
import "../styles/main.css";
import { FlowServiceCard } from "../components/flow-service-card.js";
import { FlowAttorneyCard } from "../components/flow-attorney-card.js";
import { FlowTestimonialCard } from "../components/flow-testimonial-card.js";

/**
 * Runs in the real Chromium browser project (matches *.dom.test.js).
 *
 * Verifies the computed typography contract:
 * - Titles/subtitles resolve to the Playfair Display family.
 * - Subsection content resolves to the Montserrat family.
 *
 * Computed font-family reflects the declared family stack regardless of
 * whether the web font itself has downloaded, so no network fonts are needed.
 */
describe("Typography font families (computed)", () => {
  let container;

  beforeAll(() => {
    for (const [tag, ctor] of [
      ["flow-service-card", FlowServiceCard],
      ["flow-attorney-card", FlowAttorneyCard],
      ["flow-testimonial-card", FlowTestimonialCard],
    ]) {
      if (!customElements.get(tag)) customElements.define(tag, ctor);
    }
  });

  afterEach(() => {
    if (container?.parentNode) container.parentNode.removeChild(container);
  });

  const mount = (html) => {
    container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
    return container;
  };

  const fontFamilyOf = (el) => window.getComputedStyle(el).fontFamily;

  it("uses Playfair Display for section titles (light DOM)", () => {
    mount('<h2 class="section-title">Meet Our Attorneys</h2>');
    const ff = fontFamilyOf(container.querySelector(".section-title"));

    expect(ff).toContain("Playfair Display");
    expect(ff).not.toContain("Montserrat");
  });

  it("uses Playfair Display for the hero subtitle", () => {
    mount('<h1 class="hero-subtitle">Serving Our Community Since 1952</h1>');
    const ff = fontFamilyOf(container.querySelector(".hero-subtitle"));

    expect(ff).toContain("Playfair Display");
  });

  it("uses Montserrat for body content (light DOM)", () => {
    mount("<p>Some subsection content paragraph.</p>");
    const ff = fontFamilyOf(container.querySelector("p"));

    expect(ff).toContain("Montserrat");
    expect(ff).not.toContain("Playfair Display");
  });

  it("uses Playfair Display for the service card title (shadow DOM)", async () => {
    mount("<flow-service-card></flow-service-card>");
    const card = container.querySelector("flow-service-card");
    card.title = "Elder Law";
    await card.updateComplete;

    const heading = card.shadowRoot.querySelector("h3");
    expect(fontFamilyOf(heading)).toContain("Playfair Display");
  });

  it("uses Playfair Display for the attorney name (shadow DOM)", async () => {
    mount("<flow-attorney-card></flow-attorney-card>");
    const card = container.querySelector("flow-attorney-card");
    card.name = "Test Attorney";
    await card.updateComplete;

    const name = card.shadowRoot.querySelector(".attorney-name");
    expect(fontFamilyOf(name)).toContain("Playfair Display");
  });

  it("keeps testimonial quote and cite on Montserrat (shadow DOM)", async () => {
    mount("<flow-testimonial-card></flow-testimonial-card>");
    const card = container.querySelector("flow-testimonial-card");
    card.quote = "Great service.";
    card.cite = "A. Client";
    await card.updateComplete;

    const quote = card.shadowRoot.querySelector("p");
    const cite = card.shadowRoot.querySelector("cite");
    expect(fontFamilyOf(quote)).toContain("Montserrat");
    expect(fontFamilyOf(quote)).not.toContain("Playfair Display");
    expect(fontFamilyOf(cite)).toContain("Montserrat");
    expect(fontFamilyOf(cite)).not.toContain("Playfair Display");
  });
});
