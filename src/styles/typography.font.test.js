import { describe, test, expect } from "vitest";
import fs from "fs";
import path from "path";

/**
 * Source-level typography contract:
 * - Titles/subtitles (all heading levels + title/subtitle classes) use the
 *   Playfair Display family via var(--font-family-display).
 * - Subsection content defaults to the Montserrat family via
 *   var(--font-family-body).
 * - Shadow DOM component titles explicitly opt into the display family, since
 *   global base rules do not cross the shadow boundary.
 */
describe("Typography font families (source)", () => {
  const root = process.cwd();
  const read = (...segments) =>
    fs.readFileSync(path.join(root, ...segments), "utf-8");

  test("variables.css defines Playfair display + Montserrat body families", () => {
    const content = read("src", "styles", "base", "variables.css");

    expect(content).toMatch(
      /--font-family-display:\s*[\s\S]*?"Playfair Display"/,
    );
    expect(content).toMatch(/--font-family-body:\s*[\s\S]*?"Montserrat"/);
  });

  test("typography.css maps all heading levels + subtitle to the display family", () => {
    const content = read("src", "styles", "base", "typography.css");

    // Capture the selector list that assigns the display font family.
    const rule = content.match(
      /([^{}]+){\s*font-family:\s*var\(--font-family-display\);\s*}/,
    );
    expect(rule).not.toBeNull();

    const selectors = rule[1];
    for (const selector of [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      ".hero-title",
      ".hero-subtitle",
      ".section-title",
    ]) {
      expect(selectors).toContain(selector);
    }
  });

  test("service card title (h3) uses the display family in shadow DOM", () => {
    const content = read("src", "components", "flow-service-card.js");
    const h3Block = content.match(/h3\s*{[\s\S]*?}/);

    expect(h3Block).not.toBeNull();
    expect(h3Block[0]).toContain("font-family: var(--font-family-display)");
  });

  test("attorney name uses the display family in shadow DOM", () => {
    const content = read("src", "components", "flow-attorney-card.js");
    const nameBlock = content.match(/\.attorney-name\s*{[\s\S]*?}/);

    expect(nameBlock).not.toBeNull();
    expect(nameBlock[0]).toContain("font-family: var(--font-family-display)");
  });

  test("testimonial card leaves quote and cite on the inherited body family", () => {
    const content = read("src", "components", "flow-testimonial-card.js");

    // Content should not opt into the display family; it stays Montserrat via
    // inheritance from the host document.
    expect(content).not.toContain("var(--font-family-display)");
  });
});
