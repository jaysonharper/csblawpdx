/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { FlowServiceCard } from "./flow-service-card.js";

describe("FlowServiceCard", () => {
  it("registers the custom element", () => {
    expect(customElements.get("flow-service-card")).toBeTruthy();
  });

  it("has sensible default properties", () => {
    const el = new FlowServiceCard();
    expect(el.title).toBe("");
    expect(el.summary).toBe("");
    expect(el.description).toBe("");
    expect(el.features).toEqual([]);
  });

  it("renders title, summary, description and features", async () => {
    const el = document.createElement("flow-service-card");
    el.title = "Personal Injury";
    el.summary = "Accident claims and compensation cases";
    el.description = "We advocate for injured individuals.";
    el.features = ["Auto Accidents", "Slip & Fall"];
    document.body.appendChild(el);
    await el.updateComplete;

    const text = el.shadowRoot.textContent;
    expect(text).toContain("Personal Injury");
    expect(text).toContain("Accident claims and compensation cases");
    expect(text).toContain("We advocate for injured individuals.");
    expect(el.shadowRoot.querySelectorAll(".features li").length).toBe(2);

    el.remove();
  });

  it("is findable by the id set on the host (deep-link scrolling)", () => {
    const el = document.createElement("flow-service-card");
    el.id = "service-personal-injury";
    document.body.appendChild(el);

    expect(document.getElementById("service-personal-injury")).toBe(el);

    el.remove();
  });

  it("accepts the highlight-flash class on the host", () => {
    const el = document.createElement("flow-service-card");
    el.classList.add("highlight-flash");
    expect(el.classList.contains("highlight-flash")).toBe(true);
  });
});
