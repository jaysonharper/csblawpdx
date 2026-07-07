import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { chromium } from "playwright";

// NOTE: This Playwright suite targets a running dev server (localhost:5174)
// and is intentionally NOT registered in vitest.config.js (neither the node
// nor browser project includes it), so it does not run in `npm run test`.
// It is kept for manual/local integration checks. Selectors below reflect the
// current fluid/intrinsic architecture (auto-fit grids, <flow-service-card>).
describe("CSS Integration Tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("styles should be loaded and applied to main elements", async () => {
    // Navigate to the development server
    await page.goto("http://localhost:5174");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check that hero section has proper styles
    const heroSection = page.locator(".hero-section");
    await expect(heroSection).toBeVisible();

    const heroStyles = await heroSection.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        minHeight: styles.minHeight,
        position: styles.position,
      };
    });

    expect(heroStyles.display).toBe("flex");
    expect(heroStyles.position).toBe("relative");
    expect(heroStyles.minHeight).toContain("100vh");

    // Check that service highlights grid is properly styled
    const serviceHighlights = page.locator(".service-highlights");
    await expect(serviceHighlights).toBeVisible();

    const gridStyles = await serviceHighlights.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    });

    expect(gridStyles.display).toBe("grid");
    expect(gridStyles.gridTemplateColumns).toBeTruthy();

    // Check that section titles have gradient text
    const sectionTitle = page.locator(".section-title").first();
    await expect(sectionTitle).toBeVisible();

    const titleStyles = await sectionTitle.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundClip: styles.webkitBackgroundClip || styles.backgroundClip,
        textFillColor: styles.webkitTextFillColor,
      };
    });

    expect(titleStyles.backgroundClip).toBe("text");
    expect(titleStyles.textFillColor).toBe("transparent");
  });

  test("responsive styles should work on mobile viewport", async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:5174");
    await page.waitForLoadState("networkidle");

    // Check mobile-specific styles
    const heroTitle = page.locator(".hero-title");
    const titleStyles = await heroTitle.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
      };
    });

    // On mobile, the fluid hero title clamps to its minimum end.
    const fontSize = parseFloat(titleStyles.fontSize);
    expect(fontSize).toBeLessThan(60); // Less than desktop size

    // Check that service highlights collapse to a single column on mobile
    const serviceHighlights = page.locator(".service-highlights");
    const mobileGridStyles = await serviceHighlights.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    });

    // Intrinsic auto-fit grid resolves to a single column track on narrow
    // viewports (computed value is a single length, no additional tracks).
    const columnCount = mobileGridStyles.gridTemplateColumns
      .trim()
      .split(/\s+/).length;
    expect(columnCount).toBe(1);
  });

  test("CSS animations should be working", async () => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("http://localhost:5174");
    await page.waitForLoadState("networkidle");

    // Check that service cards have hover effects (transform on the inner
    // card element, which lives in the component's Shadow DOM).
    const serviceCard = page.locator("flow-service-card").first();
    await expect(serviceCard).toBeVisible();

    // Get initial transform of the inner card
    const initialTransform = await serviceCard.evaluate((el) => {
      const card = el.shadowRoot.querySelector(".card");
      return window.getComputedStyle(card).transform;
    });

    // Hover over the card
    await serviceCard.hover();

    // Check that transform changed (hover effect applied)
    await page.waitForTimeout(100); // Wait for transition
    const hoverTransform = await serviceCard.evaluate((el) => {
      const card = el.shadowRoot.querySelector(".card");
      return window.getComputedStyle(card).transform;
    });

    expect(hoverTransform).not.toBe(initialTransform);
  });
});
