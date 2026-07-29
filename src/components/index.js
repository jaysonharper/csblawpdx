// Component registry - imports and registers all custom components
// Import this file to use all components in your app

// UI Components (Basic building blocks)
import "./flow-button.js";
import "./flow-alert.js";
import "./flow-attorney-card.js";
import "./flow-team-card.js";
import "./flow-service-card.js";
import "./flow-testimonial-card.js";

// Layout Components (Page structure)
import "./flow-navbar.js";
import "./flow-scroll-to-top.js";

// Feature Components (Business logic)
import "./flow-call-button.js";
import "./flow-floating-call-button.js";

// Icons & Graphics
// Note: Scales icon is now inlined as a static SVG in the navbar.

// Export for programmatic access
// UI Components
export { FlowButton } from "./flow-button.js";
export { FlowAlert } from "./flow-alert.js";
export { FlowTeamCard } from "./flow-team-card.js";
export { FlowServiceCard } from "./flow-service-card.js";
export { FlowTestimonialCard } from "./flow-testimonial-card.js";

// Layout Components
export { FlowNavbar } from "./flow-navbar.js";
export { FlowScrollToTop } from "./flow-scroll-to-top.js";

// Feature Components
export { FlowCallButton } from "./flow-call-button.js";
export { FlowFloatingCallButton } from "./flow-floating-call-button.js";

// Icons & Graphics
// export { FlowScalesIcon } from "./flow-scales-icon.js"; // Not used

if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
  console.log("🎨 Flow Components loaded successfully");
}
