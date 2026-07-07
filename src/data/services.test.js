import { describe, it, expect } from "vitest";
import { services } from "./services.js";

describe("services data", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });

  it("every entry has the required fields", () => {
    services.forEach((service) => {
      expect(typeof service.id).toBe("string");
      expect(service.id.length).toBeGreaterThan(0);
      expect(typeof service.title).toBe("string");
      expect(service.title.length).toBeGreaterThan(0);
      expect(typeof service.summary).toBe("string");
      expect(typeof service.description).toBe("string");
      expect(Array.isArray(service.features)).toBe(true);
      expect(service.features.length).toBeGreaterThan(0);
    });
  });

  it("has unique ids, each prefixed with 'service-'", () => {
    const ids = services.map((s) => s.id);
    // Uniqueness — duplicate ids would break getElementById deep-linking.
    expect(new Set(ids).size).toBe(ids.length);
    // Prefix — attorney specialty tags scroll to these ids.
    ids.forEach((id) => expect(id).toMatch(/^service-/));
  });
});
