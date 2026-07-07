import { describe, it, expect } from "vitest";
import { testimonials } from "./testimonials.js";

describe("testimonials data", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("every entry has a non-empty quote and cite", () => {
    testimonials.forEach((t) => {
      expect(typeof t.quote).toBe("string");
      expect(t.quote.length).toBeGreaterThan(0);
      expect(typeof t.cite).toBe("string");
      expect(t.cite.length).toBeGreaterThan(0);
    });
  });
});
