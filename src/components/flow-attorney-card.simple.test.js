import { expect, describe, it, beforeEach, vi } from "vitest";
import { FlowAttorneyCard } from "./flow-attorney-card.js";

describe("FlowAttorneyCard - Simple Tests", () => {
  let element;

  beforeEach(() => {
    // Register the custom element if not already registered
    if (!customElements.get("flow-attorney-card")) {
      customElements.define("flow-attorney-card", FlowAttorneyCard);
    }

    element = new FlowAttorneyCard();
  });

  describe("Component Creation", () => {
    it("should create a FlowAttorneyCard instance", () => {
      expect(element).toBeInstanceOf(FlowAttorneyCard);
    });

    it("should have default property values", () => {
      expect(element.name).toBe("");
      expect(element.image).toBe("");
      expect(element.specialties).toEqual([]);
      expect(element.education).toEqual([]);
      expect(element.memberships).toEqual([]);
      expect(element.admissions).toEqual([]);
      expect(element.biography).toBe("");
      expect(element.isFlipped).toBe(false);
    });

    it("should accept property updates", () => {
      element.name = "Test Attorney";
      element.specialties = ["Corporate Law", "Litigation"];

      expect(element.name).toBe("Test Attorney");
      expect(element.specialties).toEqual(["Corporate Law", "Litigation"]);
    });
  });

  describe("Flip Functionality", () => {
    it("should start with card not flipped", () => {
      expect(element.isFlipped).toBe(false);
    });

    it("should flip card state when flipCard method is called", () => {
      element.flipCard();
      expect(element.isFlipped).toBe(true);

      element.flipCard();
      expect(element.isFlipped).toBe(false);
    });

    it("should dispatch card-flip event when flipped", () => {
      const eventSpy = vi.fn();
      element.addEventListener("card-flip", eventSpy);

      element.name = "Test Attorney";
      element.flipCard();

      expect(eventSpy).toHaveBeenCalledOnce();
      expect(eventSpy.mock.calls[0][0].detail).toMatchObject({
        name: "Test Attorney",
        isFlipped: true,
      });
    });
  });

  describe("Specialty Tag Interactions", () => {
    it("should generate correct service ID from specialty name", () => {
      const testCases = [
        { specialty: "Corporate Law", expected: "service-corporate-law" },
        { specialty: "Personal Injury", expected: "service-personal-injury" },
        { specialty: "Estate Plans", expected: "service-estate-plans" },
      ];

      testCases.forEach(({ specialty, expected }) => {
        const serviceId = `service-${specialty
          .toLowerCase()
          .replace(/\s+/g, "-")}`;
        expect(serviceId).toBe(expected);
      });
    });

    it("should dispatch specialty-click event with correct data", () => {
      const eventSpy = vi.fn();
      element.addEventListener("specialty-click", eventSpy);

      const mockEvent = { stopPropagation: vi.fn() };
      element.name = "Test Attorney";
      element.handleSpecialtyClick(mockEvent, "Corporate Law");

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(eventSpy).toHaveBeenCalledOnce();
      expect(eventSpy.mock.calls[0][0].detail).toMatchObject({
        specialty: "Corporate Law",
        attorneyName: "Test Attorney",
        serviceId: "service-corporate-law",
      });
    });
  });

  describe("Static Properties", () => {
    it("should have proper property definitions", () => {
      const properties = FlowAttorneyCard.properties;

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
      expect(properties.specialties).toEqual({ type: Array });
      expect(properties.education).toEqual({ type: Array });
      expect(properties.memberships).toEqual({ type: Array });
      expect(properties.admissions).toEqual({ type: Array });
      expect(properties.biography).toEqual({ type: String });
      expect(properties.isFlipped).toEqual({
        type: Boolean,
        state: true,
        attribute: false,
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty arrays gracefully", () => {
      element.specialties = [];
      element.education = [];
      element.memberships = [];
      element.admissions = [];

      expect(element.specialties).toEqual([]);
      expect(element.education).toEqual([]);
      expect(element.memberships).toEqual([]);
      expect(element.admissions).toEqual([]);
    });

    it("should handle null/undefined values", () => {
      element.name = null;
      element.biography = "";

      expect(element.name).toBeNull();
      expect(element.biography).toBe("");
    });

    it("should handle long attorney names", () => {
      const longName = "Dr. Professor Attorney McVeryLongNameson III Esquire";
      element.name = longName;
      expect(element.name).toBe(longName);
    });
  });
});
