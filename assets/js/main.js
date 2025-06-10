import { AxisImagingApp } from "./classes/AxisImagingApp.js";
import { MobileMenu } from "./components/MobileMenu.js";
import { ModeToggle } from "./components/ModeToggle.js";
import { BookingSteps } from "./components/BookingSteps.js";
import { DiagnosticServices } from "./components/DiagnosticServices.js";

/**
 * Main application entry point
 */
async function initializeApp() {
  try {
    // Create and initialize main app
    const app = new AxisImagingApp();
    await app.init();

    // Make app globally accessible
    window.axisApp = app;

    // Setup global functions for onclick handlers
    setupGlobalFunctions();

    console.log("🎉 Axis Imaging application ready!");
  } catch (error) {
    console.error("❌ Failed to initialize application:", error);
  }
}

/**
 * Setup global functions for HTML onclick handlers
 */
function setupGlobalFunctions() {
  window.toggleMobileMenu = MobileMenu.toggle;
  window.toggleMode = ModeToggle.toggle;
  window.nextStep = BookingSteps.nextStep;
  window.prevStep = BookingSteps.prevStep;
  window.scrollToServiceByDot = DiagnosticServices.scrollToServiceByDot;
  window.handleBooking = AxisImagingApp.handleBooking;
}

// Auto-initialize when imported
initializeApp();

// Export for manual initialization if needed
export default AxisImagingApp;
export { initializeApp };
