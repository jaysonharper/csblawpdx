import { describe, it, expect } from "vitest";
import { attorneys } from "./attorneys.js";

describe("attorneys data", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(attorneys)).toBe(true);
    expect(attorneys.length).toBeGreaterThan(0);
  });

  it("every entry has the required string fields", () => {
    attorneys.forEach((a) => {
      expect(typeof a.name).toBe("string");
      expect(a.name.length).toBeGreaterThan(0);
      expect(typeof a.image).toBe("string");
      expect(typeof a.imageAlt).toBe("string");
      expect(typeof a.imageClass).toBe("string");
    });
  });

  it("every entry has the required array fields", () => {
    attorneys.forEach((a) => {
      expect(Array.isArray(a.specialties)).toBe(true);
      expect(Array.isArray(a.education)).toBe(true);
      expect(Array.isArray(a.memberships)).toBe(true);
      expect(Array.isArray(a.admissions)).toBe(true);
      expect(Array.isArray(a.biography)).toBe(true);
    });
  });
});
