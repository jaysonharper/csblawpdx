/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { FlowTestimonialCard } from "./flow-testimonial-card.js";

describe("FlowTestimonialCard", () => {
  it("registers the custom element", () => {
    expect(customElements.get("flow-testimonial-card")).toBeTruthy();
  });

  it("has sensible default properties", () => {
    const el = new FlowTestimonialCard();
    expect(el.quote).toBe("");
    expect(el.cite).toBe("");
  });

  it("renders the quote and cite", async () => {
    const el = document.createElement("flow-testimonial-card");
    el.quote = "Fantastic at his craft.";
    el.cite = "— Joe S.";
    document.body.appendChild(el);
    await el.updateComplete;

    const text = el.shadowRoot.textContent;
    expect(text).toContain("Fantastic at his craft.");
    expect(text).toContain("— Joe S.");

    el.remove();
  });
});
