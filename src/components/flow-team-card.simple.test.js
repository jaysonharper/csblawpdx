import { expect, describe, it, beforeEach } from "vitest";
import { FlowTeamCard } from "./flow-team-card.js";

describe("FlowTeamCard - Simple Tests", () => {
  let element;

  beforeEach(() => {
    // Register the custom element if not already registered
    if (!customElements.get("flow-team-card")) {
      customElements.define("flow-team-card", FlowTeamCard);
    }

    element = new FlowTeamCard();
  });

  describe("Component Creation", () => {
    it("should create a FlowTeamCard instance", () => {
      expect(element).toBeInstanceOf(FlowTeamCard);
    });

    it("should have default property values", () => {
      expect(element.name).toBe("");
      expect(element.image).toBe("");
      expect(element.imageAlt).toBe("");
      expect(element.imageClass).toBe("");
      expect(element.education).toEqual([]);
      expect(element.biography).toEqual([]);
      expect(element.isFlipped).toBe(false);
    });

    it("should accept property updates", () => {
      element.name = "Test Team Member";
      element.biography = "A short bio.";

      expect(element.name).toBe("Test Team Member");
      expect(element.biography).toBe("A short bio.");
    });
  });

  describe("Flip Capability", () => {
    it("should expose flip state and flip methods", () => {
      expect(element.isFlipped).toBe(false);
      expect(typeof element.flipCard).toBe("function");
    });
  });

  describe("Static Properties", () => {
    it("should have proper property definitions", () => {
      const properties = FlowTeamCard.properties;

      expect(properties.name).toEqual({ type: String });
      expect(properties.image).toEqual({ type: String });
      expect(properties.imageAlt).toEqual({
        type: String,
        attribute: "image-alt",
      });
      expect(properties.imageClass).toEqual({
        type: String,
        attribute: "image-class",
      });
      expect(properties.education).toEqual({ type: Array });
      expect(properties.biography).toEqual({ type: Array });
      expect(properties.isFlipped).toEqual({
        type: Boolean,
        state: true,
        attribute: false,
      });
    });

    it("should not define attorney-only credential properties", () => {
      const properties = FlowTeamCard.properties;

      expect(properties.specialties).toBeUndefined();
      expect(properties.memberships).toBeUndefined();
      expect(properties.admissions).toBeUndefined();
    });
  });

  describe("Edge Cases", () => {
    it("should handle null/undefined values", () => {
      element.name = null;
      element.biography = [];

      expect(element.name).toBeNull();
      expect(element.biography).toEqual([]);
    });

    it("should handle long team member names", () => {
      const longName = "Dr. Professor Assistant McVeryLongNameson III";
      element.name = longName;
      expect(element.name).toBe(longName);
    });
  });
});
