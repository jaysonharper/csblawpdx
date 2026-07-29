import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { FlowTeamCard } from "./flow-team-card.js";

// Register the custom element
if (!customElements.get("flow-team-card")) {
  customElements.define("flow-team-card", FlowTeamCard);
}

describe("FlowTeamCard", () => {
  let element;
  let container;

  const defaultProps = {
    name: "Test Team Member",
    image: "test-image.jpg",
    imageAlt: "Test Team Member Profile",
    biography: ["First bio paragraph.", "Second bio paragraph."],
  };

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);

    element = document.createElement("flow-team-card");
    Object.assign(element, defaultProps);
    container.appendChild(element);

    // Wait for component to update
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  describe("Rendering", () => {
    it("should render the component", () => {
      expect(element).to.exist;
      expect(element.tagName.toLowerCase()).to.equal("flow-team-card");
    });

    it("should display the team member name", async () => {
      await element.updateComplete;
      const name = element.shadowRoot.querySelector(".team-name");
      expect(name?.textContent).to.equal(defaultProps.name);
    });

    it("should display the team member image", async () => {
      await element.updateComplete;
      const image = element.shadowRoot.querySelector(".team-image");
      expect(image?.getAttribute("src")).to.equal(defaultProps.image);
      expect(image?.getAttribute("alt")).to.equal(defaultProps.imageAlt);
    });

    it("should show the biography on the front", async () => {
      await element.updateComplete;
      const paragraphs = element.shadowRoot.querySelectorAll(".team-bio p");
      expect(paragraphs.length).to.equal(defaultProps.biography.length);
      paragraphs.forEach((p, index) => {
        expect(p.textContent).to.equal(defaultProps.biography[index]);
      });
    });

    it("should render a single-string biography as one paragraph", async () => {
      element.biography = "Just one paragraph.";
      await element.updateComplete;
      const paragraphs = element.shadowRoot.querySelectorAll(".team-bio p");
      expect(paragraphs.length).to.equal(1);
      expect(paragraphs[0].textContent).to.equal("Just one paragraph.");
    });

    it("should omit the biography block when empty", async () => {
      element.biography = [];
      await element.updateComplete;
      const bio = element.shadowRoot.querySelector(".team-bio");
      expect(bio).to.be.null;
    });
  });

  describe("Non-flip Behavior", () => {
    it("should not render any flip controls", async () => {
      await element.updateComplete;
      expect(element.shadowRoot.querySelector(".flip-indicator")).to.be.null;
      expect(element.shadowRoot.querySelector(".card-back")).to.be.null;
      expect(element.shadowRoot.querySelector(".card-front")).to.be.null;
    });

    it("should not emit a card-flip event when clicked", async () => {
      await element.updateComplete;
      const eventSpy = vi.fn();
      element.addEventListener("card-flip", eventSpy);

      const cardContainer = element.shadowRoot.querySelector(".card-container");
      cardContainer.click();
      await element.updateComplete;

      expect(eventSpy).not.toHaveBeenCalled();
    });
  });

  describe("Shared Height Sync", () => {
    it("should apply the shared front-height CSS variable", async () => {
      await element.updateComplete;
      // Allow the requestAnimationFrame-based sync to run.
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));

      const value = element.style.getPropertyValue("--team-card-front-height");
      expect(value).to.match(/^\d+px$/);
    });
  });
});
