/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from "vitest";
import { testimonials } from "./data/testimonials.js";

describe("click behavior (DOM)", () => {
  it("toggles app-active class and button text on click", async () => {
    // Prepare DOM before importing the module so it can attach listeners
    document.body.innerHTML = `
      <div id="app">
        <button id="btn">Click me</button>
      </div>
    `;

    // Clear module cache so importing will re-run top-level code
    await vi.resetModules();

    // Import the module after DOM is ready
    await import("./app.main.js");

    const app = document.getElementById("app");
    const btn = document.getElementById("btn");

    expect(btn.textContent).toBe("Click me");

    // First click -> active (utility classes added)
    btn.click();
    expect(app.classList.contains("scale-99")).toBe(true);
    expect(app.classList.contains("transition-transform")).toBe(true);
    expect(btn.textContent).toBe("Clicked ✓");

    // Second click -> not active (utility classes removed)
    btn.click();
    expect(app.classList.contains("scale-99")).toBe(false);
    expect(app.classList.contains("transition-transform")).toBe(false);
    expect(btn.textContent).toBe("Click me");
  });

  it("renders two testimonials and rotates by one every 5 seconds", async () => {
    vi.useFakeTimers();

    document.body.innerHTML = `
      <div class="testimonial-preview"></div>
    `;

    await vi.resetModules();
    const mod = await import("./app.main.js");
    mod.initializeApp();

    const container = document.querySelector(".testimonial-preview");
    expect(container.children).toHaveLength(2);

    const firstPair = [...container.children].map((card) => card.quote);
    expect(firstPair).toEqual([testimonials[0].quote, testimonials[1].quote]);

    vi.advanceTimersByTime(5000);

    const secondPair = [...container.children].map((card) => card.quote);
    expect(secondPair).toEqual([testimonials[1].quote, testimonials[2].quote]);

    vi.useRealTimers();
  });
});
