/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";

beforeEach(() => {
  // Setup DOM with footer structure
  document.body.innerHTML = `
    <div class="hero-section">Hero Content</div>
    <main>
      <section>Main Content</section>
    </main>
    <footer class="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white border-t border-gray-700">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Desktop/Tablet Footer (md and up) -->
        <div class="hidden md:block py-12">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-white mb-2">Law Offices of Carson Seegmuller & Baker LLP</h3>
            <p class="text-gray-300 text-sm">Professional Legal Services</p>
          </div>
          <div class="flex justify-center mb-8">
            <nav class="flex flex-wrap justify-center gap-6 md:gap-8">
              <a href="#why-us" class="text-gray-300 hover:text-white transition-colors duration-200 text-base">Why Us?</a>
              <a href="#attorneys" class="text-gray-300 hover:text-white transition-colors duration-200 text-base">Attorneys</a>
              <a href="#services" class="text-gray-300 hover:text-white transition-colors duration-200 text-base">Services</a>
              <a href="#testimonials" class="text-gray-300 hover:text-white transition-colors duration-200 text-base">Testimonials</a>
              <a href="#find-us" class="text-gray-300 hover:text-white transition-colors duration-200 text-base">Find Us</a>
            </nav>
          </div>
          <div class="text-center pt-6 border-t border-gray-700">
            <p class="text-gray-400 text-sm">&copy; 2026 Law Offices of Carson Seegmuller & Baker LLP. All rights reserved.</p>
          </div>
        </div>
        <!-- Mobile Footer (compact) -->
        <div class="md:hidden py-6 text-center">
          <h4 class="text-lg font-semibold text-white mb-2">Law Offices of Carson Seegmuller & Baker LLP</h4>
          <p class="text-gray-400 text-xs">&copy; 2026 Law Offices of Carson Seegmuller & Baker LLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Footer Structure and Content", () => {
  it("should have a footer element with correct classes", () => {
    const footer = document.querySelector("footer");
    expect(footer).toBeTruthy();
    expect(footer.classList.contains("relative")).toBe(true);
    expect(footer.classList.contains("bg-gradient-to-r")).toBe(true);
    expect(footer.classList.contains("from-gray-900")).toBe(true);
    expect(footer.classList.contains("to-gray-800")).toBe(true);
  });

  it("should contain business name in desktop version", () => {
    const desktopFooter = document.querySelector(".hidden.md\\:block");
    expect(desktopFooter).toBeTruthy();

    const businessName = desktopFooter.querySelector("h3");
    expect(businessName.textContent).toBe(
      "Law Offices of Carson Seegmuller & Baker LLP",
    );
    expect(businessName.classList.contains("text-2xl")).toBe(true);
    expect(businessName.classList.contains("font-bold")).toBe(true);
  });

  it("should contain business name in mobile version", () => {
    const mobileFooter = document.querySelector(".md\\:hidden");
    expect(mobileFooter).toBeTruthy();

    const businessName = mobileFooter.querySelector("h4");
    expect(businessName.textContent).toBe(
      "Law Offices of Carson Seegmuller & Baker LLP",
    );
    expect(businessName.classList.contains("text-lg")).toBe(true);
    expect(businessName.classList.contains("font-semibold")).toBe(true);
  });

  it("should have navigation links in desktop version only", () => {
    const desktopNav = document.querySelector(".hidden.md\\:block nav");
    expect(desktopNav).toBeTruthy();

    const navLinks = desktopNav.querySelectorAll("a");
    expect(navLinks).toHaveLength(5);

    const linkTexts = Array.from(navLinks).map((link) => link.textContent);
    expect(linkTexts).toEqual([
      "Why Us?",
      "Attorneys",
      "Services",
      "Testimonials",
      "Find Us",
    ]);
  });

  it("should have correct href attributes for navigation links", () => {
    const navLinks = document.querySelectorAll(".hidden.md\\:block nav a");
    const hrefs = Array.from(navLinks).map((link) => link.getAttribute("href"));
    expect(hrefs).toEqual([
      "#why-us",
      "#attorneys",
      "#services",
      "#testimonials",
      "#find-us",
    ]);
  });

  it("should not have navigation links in mobile version", () => {
    const mobileFooter = document.querySelector(".md\\:hidden");
    const mobileNav = mobileFooter.querySelector("nav");
    expect(mobileNav).toBeFalsy();
  });

  it("should have copyright notice in both versions", () => {
    // Desktop copyright
    const desktopCopyright = document.querySelector(
      ".hidden.md\\:block .text-gray-400",
    );
    expect(desktopCopyright.textContent).toContain(
      "© 2026 Law Offices of Carson Seegmuller & Baker LLP. All rights reserved.",
    );

    // Mobile copyright
    const mobileCopyright = document.querySelector(
      ".md\\:hidden .text-gray-400",
    );
    expect(mobileCopyright.textContent).toContain(
      "© 2026 Law Offices of Carson Seegmuller & Baker LLP. All rights reserved.",
    );
  });

  it("should have proper responsive classes", () => {
    const desktopFooter = document.querySelector(".hidden.md\\:block");
    const mobileFooter = document.querySelector(".md\\:hidden");

    expect(desktopFooter.classList.contains("hidden")).toBe(true);
    expect(desktopFooter.classList.contains("md:block")).toBe(true);
    expect(mobileFooter.classList.contains("md:hidden")).toBe(true);
  });

  it("should have appropriate padding for different screen sizes", () => {
    const desktopFooter = document.querySelector(".hidden.md\\:block");
    const mobileFooter = document.querySelector(".md\\:hidden");

    expect(desktopFooter.classList.contains("py-12")).toBe(true);
    expect(mobileFooter.classList.contains("py-6")).toBe(true);
  });

  it("should have hover effects on navigation links", () => {
    const navLinks = document.querySelectorAll(".hidden.md\\:block nav a");

    navLinks.forEach((link) => {
      expect(link.classList.contains("hover:text-white")).toBe(true);
      expect(link.classList.contains("transition-colors")).toBe(true);
      expect(link.classList.contains("duration-200")).toBe(true);
    });
  });

  it("should have proper semantic structure", () => {
    const footer = document.querySelector("footer");
    const businessNameH3 = footer.querySelector("h3");
    const businessNameH4 = footer.querySelector("h4");
    const nav = footer.querySelector("nav");

    expect(footer.tagName).toBe("FOOTER");
    expect(businessNameH3).toBeTruthy();
    expect(businessNameH4).toBeTruthy();
    expect(nav).toBeTruthy();
  });
});
