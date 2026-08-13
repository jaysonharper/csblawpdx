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
    education: [],
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

  describe("Conditional Flip Behavior", () => {
    it("should render hidden flip placeholders when education is missing", async () => {
      await element.updateComplete;

      const frontIndicator = element.shadowRoot.querySelector(
        ".card-front .flip-indicator",
      );
      const frontHint = element.shadowRoot.querySelector(
        ".card-front .flip-hint",
      );

      expect(frontIndicator).to.exist;
      expect(frontIndicator?.classList.contains("placeholder")).to.be.true;
      expect(frontHint).to.exist;
      expect(frontHint?.classList.contains("placeholder")).to.be.true;
      expect(element.shadowRoot.querySelector(".card-back")).to.be.null;
      expect(element.shadowRoot.querySelector(".card-front")).to.exist;
    });

    it("should not emit a card-flip event when clicked without education", async () => {
      await element.updateComplete;
      const eventSpy = vi.fn();
      element.addEventListener("card-flip", eventSpy);

      const cardContainer = element.shadowRoot.querySelector(".card-container");
      cardContainer.click();
      await element.updateComplete;

      expect(eventSpy).not.toHaveBeenCalled();
    });

    it("should render flip controls and education hint when education exists", async () => {
      element.education = ["B.A., Linguistics and Italian"];
      await element.updateComplete;

      const flipIndicators =
        element.shadowRoot.querySelectorAll(".flip-indicator");
      expect(flipIndicators.length).to.equal(2);

      const flipHint = element.shadowRoot.querySelector(".flip-hint");
      expect(flipHint?.textContent?.trim()).to.equal("Education");
      expect(element.shadowRoot.querySelector(".card-back")).to.exist;
    });

    it("should flip card when clicked if education exists", async () => {
      element.education = ["B.A., Linguistics and Italian"];
      await element.updateComplete;

      const cardContainer = element.shadowRoot.querySelector(".card-container");
      cardContainer.click();
      await element.updateComplete;

      expect(element.isFlipped).to.be.true;
      expect(cardContainer.classList.contains("flipped")).to.be.true;
    });

    it("should emit card-flip event when flipped", async () => {
      element.education = ["B.A., Linguistics and Italian"];
      await element.updateComplete;

      const eventSpy = vi.fn();
      element.addEventListener("card-flip", eventSpy);

      const cardContainer = element.shadowRoot.querySelector(".card-container");
      cardContainer.click();
      await element.updateComplete;

      expect(eventSpy).toHaveBeenCalledOnce();
      expect(eventSpy.mock.calls[0][0].detail).toMatchObject({
        name: defaultProps.name,
        isFlipped: true,
      });
    });

    it("should support keyboard flip interactions", async () => {
      element.education = ["B.A., Linguistics and Italian"];
      await element.updateComplete;

      const cardContainer = element.shadowRoot.querySelector(".card-container");
      cardContainer.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );
      await element.updateComplete;

      expect(element.isFlipped).to.be.true;
    });

    it("should render only the Education section on the back", async () => {
      element.education = [
        "B.A., Linguistics and Italian, University of California at Los Angeles",
      ];
      await element.updateComplete;

      const sectionHeadings = Array.from(
        element.shadowRoot.querySelectorAll(".card-back .bio-section h4"),
      ).map((heading) => heading.textContent.trim());

      expect(sectionHeadings).to.deep.equal(["Education"]);

      const backEducationItems = Array.from(
        element.shadowRoot.querySelectorAll(".card-back .bio-section li"),
      ).map((item) => item.textContent.trim());

      expect(backEducationItems).to.deep.equal([
        "B.A., Linguistics and Italian, University of California at Los Angeles",
      ]);
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
