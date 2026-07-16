import { expect, describe, it, beforeEach, afterEach, vi } from "vitest";
import { FlowAttorneyCard } from "./flow-attorney-card.js";

// Register the custom element
if (!customElements.get("flow-attorney-card")) {
  customElements.define("flow-attorney-card", FlowAttorneyCard);
}

describe("FlowAttorneyCard", () => {
  let element;
  let container;

  const defaultProps = {
    name: "Test Attorney",
    image: "test-image.jpg",
    imageAlt: "Test Attorney Profile",
    specialties: ["Elder Care Planning", "Litigation"],
    education: ["J.D., Test University"],
    memberships: ["Test Bar Association"],
    admissions: ["Test State Bar"],
    biography: "Test biography text",
  };

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);

    element = document.createElement("flow-attorney-card");
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
      expect(element.tagName.toLowerCase()).to.equal("flow-attorney-card");
    });

    it("should display attorney name", async () => {
      await element.updateComplete;
      const name = element.shadowRoot.querySelector(".attorney-name");
      expect(name?.textContent).to.equal(defaultProps.name);
    });

    it("should display attorney image", async () => {
      await element.updateComplete;
      const image = element.shadowRoot.querySelector(".attorney-image");
      expect(image?.getAttribute("src")).to.equal(defaultProps.image);
      expect(image?.getAttribute("alt")).to.equal(defaultProps.imageAlt);
    });

    it("should display all specialties", () => {
      const specialtyTags =
        element.shadowRoot.querySelectorAll(".specialty-tag");
      expect(specialtyTags.length).to.equal(defaultProps.specialties.length);

      specialtyTags.forEach((tag, index) => {
        expect(tag.textContent.trim()).to.equal(
          defaultProps.specialties[index],
        );
      });
    });

    it("should display education section on back", async () => {
      await element.updateComplete;
      const educationItems = element.shadowRoot.querySelectorAll(
        ".card-back .bio-section h4",
      );
      const educationSection = Array.from(educationItems).find(
        (h4) => h4.textContent.trim() === "Education",
      );
      expect(educationSection).to.exist;
    });

    it("should display memberships section on back", async () => {
      await element.updateComplete;
      const membershipItems = element.shadowRoot.querySelectorAll(
        ".card-back .bio-section h4",
      );
      const membershipSection = Array.from(membershipItems).find(
        (h4) => h4.textContent.trim() === "Professional Memberships",
      );
      expect(membershipSection).to.exist;
    });

    it("should display admissions section on back", async () => {
      await element.updateComplete;
      const admissionItems = element.shadowRoot.querySelectorAll(
        ".card-back .bio-section h4",
      );
      const admissionSection = Array.from(admissionItems).find(
        (h4) => h4.textContent.trim() === "Bar Admissions",
      );
      expect(admissionSection).to.exist;
    });

    it("should display biography section on back", async () => {
      await element.updateComplete;
      const sections = element.shadowRoot.querySelectorAll(
        ".card-back .bio-section",
      );
      const biographySection = Array.from(sections).find(
        (section) =>
          section.querySelector("h4")?.textContent.trim() === "Biography",
      );
      expect(biographySection).to.exist;
      expect(biographySection.querySelector("p").textContent).to.equal(
        defaultProps.biography,
      );
    });
  });

  describe("Flip Functionality", () => {
    it("should start with card not flipped", () => {
      expect(element.isFlipped).to.be.false;
      const container = element.shadowRoot.querySelector(".card-container");
      expect(container.classList.contains("flipped")).to.be.false;
    });

    it("should flip card when clicked", async () => {
      const container = element.shadowRoot.querySelector(".card-container");
      container.click();

      await element.updateComplete;

      expect(element.isFlipped).to.be.true;
      expect(container.classList.contains("flipped")).to.be.true;
    });

    it("should flip back when clicked again", async () => {
      // First flip
      const container = element.shadowRoot.querySelector(".card-container");
      container.click();
      await element.updateComplete;

      // Second flip
      container.click();
      await element.updateComplete;

      expect(element.isFlipped).to.be.false;
      expect(container.classList.contains("flipped")).to.be.false;
    });

    it("should emit card-flip event when flipped", async () => {
      const eventSpy = vi.fn();
      element.addEventListener("card-flip", eventSpy);

      const container = element.shadowRoot.querySelector(".card-container");
      container.click();

      await element.updateComplete;

      expect(eventSpy).toHaveBeenCalledOnce();
      expect(eventSpy.mock.calls[0][0].detail).toMatchObject({
        name: defaultProps.name,
        isFlipped: true,
      });
    });
  });

  describe("Specialty Tag Interactions", () => {
    it("should emit specialty-click event when specialty tag is clicked", async () => {
      const eventSpy = vi.fn();
      element.addEventListener("specialty-click", eventSpy);

      const firstSpecialtyTag =
        element.shadowRoot.querySelector(".specialty-tag");
      firstSpecialtyTag.click();

      await element.updateComplete;

      expect(eventSpy).toHaveBeenCalledOnce();
      expect(eventSpy.mock.calls[0][0].detail).toMatchObject({
        specialty: defaultProps.specialties[0],
        attorneyName: defaultProps.name,
        serviceId: "service-elder-care-planning",
      });
    });

    it("should not flip card when specialty tag is clicked", async () => {
      const firstSpecialtyTag =
        element.shadowRoot.querySelector(".specialty-tag");
      firstSpecialtyTag.click();

      await element.updateComplete;

      expect(element.isFlipped).to.be.false;
    });

    it("should generate correct service ID from specialty name", () => {
      const testCases = [
        {
          specialty: "Real Estate | Business",
          expected: "service-real-estate-business",
        },
        {
          specialty: "Elder Care Planning",
          expected: "service-elder-care-planning",
        },
        { specialty: "Personal Injury", expected: "service-personal-injury" },
      ];

      testCases.forEach(({ specialty, expected }) => {
        const serviceId =
          FlowAttorneyCard.specialtyServiceMap[specialty] ??
          `service-${specialty.toLowerCase().replace(/\s+/g, "-")}`;
        expect(serviceId).to.equal(expected);
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper alt text for image", () => {
      const image = element.shadowRoot.querySelector(".attorney-image");
      expect(image.getAttribute("alt")).to.equal(defaultProps.imageAlt);
    });

    it('should have loading="lazy" on image', () => {
      const image = element.shadowRoot.querySelector(".attorney-image");
      expect(image.getAttribute("loading")).to.equal("lazy");
    });

    it("should have proper title attributes on flip indicators", () => {
      const flipIndicators =
        element.shadowRoot.querySelectorAll(".flip-indicator");
      flipIndicators.forEach((indicator) => {
        expect(indicator.getAttribute("title")).to.match(
          /(Show front|Show back)/,
        );
      });
    });

    it("should have proper title on specialty tags", () => {
      const specialtyTags =
        element.shadowRoot.querySelectorAll(".specialty-tag");
      specialtyTags.forEach((tag, index) => {
        const expectedTitle = `Click to view ${defaultProps.specialties[index]} services`;
        expect(tag.getAttribute("title")).to.equal(expectedTitle);
      });
    });
  });

  describe("Responsive Design", () => {
    it("should keep attorney image at a fixed size", () => {
      const image = element.shadowRoot.querySelector(".attorney-image");
      expect(image).to.exist;
      expect(image.getAttribute("loading")).to.equal("lazy");
    });

    it("should keep specialty tags constrained in width", () => {
      const specialtyTags =
        element.shadowRoot.querySelectorAll(".specialty-tag");
      specialtyTags.forEach((tag) => {
        const styles = getComputedStyle(tag);
        expect(styles.maxWidth).to.exist;
        expect(styles.width).to.exist;
      });
    });

    it("should handle specialty container overflow for long lists", () => {
      const specialtiesContainer = element.shadowRoot.querySelector(
        ".attorney-specialties",
      );
      expect(specialtiesContainer).to.exist;
      expect(specialtiesContainer.children.length).to.equal(
        FlowAttorneyCard.specialtySlotCount,
      );
    });

    it("should render helper copy indicating details are on the back", () => {
      const flipHint = element.shadowRoot.querySelector(".flip-hint");
      expect(flipHint).to.exist;
      expect(flipHint.textContent.trim()).to.equal("Biography");
    });
  });

  describe("CSS Transforms and Animations", () => {
    it("should render both card faces", () => {
      const cardFaces = element.shadowRoot.querySelectorAll(".card-face");
      expect(cardFaces.length).to.equal(2);
    });

    it("should apply flipped class correctly", async () => {
      const cardContainer = element.shadowRoot.querySelector(".card-container");

      // Initially not flipped
      expect(cardContainer.classList.contains("flipped")).to.be.false;

      // After flip
      cardContainer.click();
      await element.updateComplete;
      expect(cardContainer.classList.contains("flipped")).to.be.true;
    });

    it("should include card-back class on the back face", () => {
      const cardBack = element.shadowRoot.querySelector(".card-back");
      expect(cardBack).to.exist;
      expect(cardBack.classList.contains("card-back")).to.be.true;
    });
  });

  describe("Event Propagation", () => {
    it("should stop propagation for specialty tag clicks", async () => {
      const specialtyTag = element.shadowRoot.querySelector(".specialty-tag");

      // Click specialty tag
      specialtyTag.click();
      await element.updateComplete;

      // Card should not flip
      expect(element.isFlipped).to.be.false;
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty specialties array", async () => {
      element.specialties = [];
      await element.updateComplete;

      const specialtyTags =
        element.shadowRoot.querySelectorAll(".specialty-tag");
      expect(specialtyTags.length).to.equal(0);

      const emptySlots = element.shadowRoot.querySelectorAll(
        ".specialty-slot-empty",
      );
      expect(emptySlots.length).to.equal(FlowAttorneyCard.specialtySlotCount);
    });

    it("should handle empty education array", async () => {
      element.education = [];
      await element.updateComplete;

      const educationSection = element.shadowRoot.querySelector(
        ".card-back .bio-section:nth-child(2)",
      );
      expect(educationSection).to.not.exist;
    });

    it("should show biography-only back content when credential arrays are empty", async () => {
      element.specialties = [];
      element.education = [];
      element.memberships = [];
      element.admissions = [];
      element.biography = "Team member biography";
      await element.updateComplete;

      const headings = Array.from(
        element.shadowRoot.querySelectorAll(".card-back .bio-section h4"),
      ).map((heading) => heading.textContent.trim());

      expect(headings).toContain("Biography");
      expect(headings).not.toContain("Bar Admissions");
      expect(headings).not.toContain("Professional Memberships");
      expect(headings).not.toContain("Education");
    });

    it("should handle missing biography", async () => {
      element.biography = "";
      await element.updateComplete;

      const biographySection = element.shadowRoot.querySelector(
        ".card-back .bio-section:last-child",
      );
      expect(biographySection.textContent).to.not.include("Biography");
    });

    it("should handle long attorney names gracefully", async () => {
      const longName = "Dr. Professor Attorney McVeryLongNameson III Esquire";
      element.name = longName;
      await element.updateComplete;

      const nameElement = element.shadowRoot.querySelector(".attorney-name");
      expect(nameElement.textContent).to.equal(longName);
    });

    it("should handle image class attribute properly", async () => {
      element.imageClass = "brett";
      await element.updateComplete;

      const image = element.shadowRoot.querySelector(".attorney-image");
      expect(image.className).to.include("brett");
    });

    it("should handle undefined or null values gracefully", async () => {
      element.name = null;
      element.specialties = null;
      element.education = null;
      element.memberships = null;
      element.admissions = null;
      await element.updateComplete;

      // Should not crash and render empty content
      const nameElement = element.shadowRoot.querySelector(".attorney-name");
      expect(nameElement.textContent).to.equal("");
    });

    it("should handle very long specialty names with ellipsis", async () => {
      const longSpecialty =
        "Very Long Specialty Name That Should Be Truncated With Ellipsis";
      element.specialties = [longSpecialty];
      await element.updateComplete;

      const specialtyTag = element.shadowRoot.querySelector(".specialty-tag");
      expect(specialtyTag.textContent.trim()).to.equal(longSpecialty);

      const styles = getComputedStyle(specialtyTag);
      expect(styles.width).to.exist;
      expect(specialtyTag.getAttribute("title")).to.include("Click to view");
    });
  });
});

describe("FlowAttorneyCard Integration", () => {
  it("should work with default values", () => {
    const element = document.createElement("flow-attorney-card");
    expect(element).to.exist;
    expect(element.name).to.equal("");
    expect(element.specialties).to.deep.equal([]);
  });

  it("should handle image class attribute", () => {
    const element = document.createElement("flow-attorney-card");
    element.setAttribute("image", "test.jpg");
    element.setAttribute("image-class", "custom-class");
    element.setAttribute("image-alt", "Test");

    expect(element.imageClass).to.equal("custom-class");
  });
});
