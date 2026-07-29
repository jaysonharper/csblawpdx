/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { FlowNavbar } from "./flow-navbar.js";

if (!customElements.get("flow-navbar")) {
  customElements.define("flow-navbar", FlowNavbar);
}

describe("FlowNavbar", () => {
  let element;

  beforeEach(async () => {
    element = document.createElement("flow-navbar");
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element.parentNode) {
      document.body.removeChild(element);
    }
    vi.restoreAllMocks();
  });

  describe("Branding", () => {
    it("should render the logo as an image", () => {
      const logo = element.shadowRoot.querySelector("img.logo-image");
      expect(logo).toBeTruthy();
      expect(logo.getAttribute("src")).toBe("/images/csb-logo-transparent.svg");
      expect(logo.getAttribute("alt")).toContain("Carson Seegmuller & Baker");
    });

    it("should NOT render the deprecated scales-of-justice icon", () => {
      expect(element.shadowRoot.querySelector(".justice-icon")).toBeNull();
      expect(
        element.shadowRoot.querySelector(".justice-icon-container"),
      ).toBeNull();
      expect(element.shadowRoot.querySelector(".logo-text")).toBeNull();
    });
  });

  describe("Call-to-action button", () => {
    it("should render a navbar-variant call button on the right side", () => {
      const cta = element.shadowRoot.querySelector(".navbar-cta");
      expect(cta).toBeTruthy();

      const callButton = cta.querySelector("flow-call-button");
      expect(callButton).toBeTruthy();
      expect(callButton.getAttribute("variant")).toBe("navbar");
      expect(callButton.getAttribute("phone-number")).toBe("+15032889291");
    });
  });

  describe("Menu toggle", () => {
    it("should default to a closed mobile menu", () => {
      expect(element.mobileMenuOpen).toBe(false);
    });

    it("should toggle the mobile menu when the burger is clicked", async () => {
      const toggle = element.shadowRoot.querySelector(".menu-toggle");
      toggle.click();
      await element.updateComplete;

      expect(element.mobileMenuOpen).toBe(true);
      expect(
        element.shadowRoot
          .querySelector(".nav-menu")
          .classList.contains("active"),
      ).toBe(true);

      toggle.click();
      await element.updateComplete;
      expect(element.mobileMenuOpen).toBe(false);
    });
  });

  describe("Logo scroll-to-top", () => {
    it("should scroll to top when the logo is clicked", () => {
      window.scrollTo = vi.fn();
      const logoContainer = element.shadowRoot.querySelector(".logo-container");
      logoContainer.click();

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    });

    it("should scroll to top when Enter is pressed on the logo", () => {
      window.scrollTo = vi.fn();
      element._handleCompanyNameKeydown({
        key: "Enter",
        preventDefault: () => {},
      });

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });
    });
  });
});
