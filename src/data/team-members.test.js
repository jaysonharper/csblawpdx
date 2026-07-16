import { describe, it, expect } from "vitest";
import { teamMembers } from "./team-members.js";

describe("team members data", () => {
  it("contains exactly three temporary team profiles", () => {
    expect(Array.isArray(teamMembers)).toBe(true);
    expect(teamMembers).toHaveLength(3);
  });

  it("uses the expected names", () => {
    expect(teamMembers.map((member) => member.name)).toEqual([
      "Barb",
      "Karen",
      "Tamara",
    ]);
  });

  it("every entry has required display fields", () => {
    teamMembers.forEach((member) => {
      expect(typeof member.name).toBe("string");
      expect(member.name.length).toBeGreaterThan(0);
      expect(typeof member.image).toBe("string");
      expect(member.image.length).toBeGreaterThan(0);
      expect(typeof member.imageAlt).toBe("string");
      expect(typeof member.imageClass).toBe("string");
      expect(typeof member.biography).toBe("string");
      expect(member.biography.length).toBeGreaterThan(0);
    });
  });

  it("keeps specialties and credential sections optional by default", () => {
    teamMembers.forEach((member) => {
      expect(Array.isArray(member.specialties)).toBe(true);
      expect(member.specialties).toHaveLength(0);
      expect(Array.isArray(member.education)).toBe(true);
      expect(member.education).toHaveLength(0);
      expect(Array.isArray(member.memberships)).toBe(true);
      expect(member.memberships).toHaveLength(0);
      expect(Array.isArray(member.admissions)).toBe(true);
      expect(member.admissions).toHaveLength(0);
    });
  });
});
