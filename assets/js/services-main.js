import { ServicesApp } from "./classes/ServicesApp.js";

/**
 * Services application entry point
 */
async function initializeServicesApp() {
  try {
    // Create and initialize services app
    const app = new ServicesApp();
    await app.init();

    // Make app globally accessible
    window.servicesApp = app;

    // Setup global functions for onclick handlers
    setupGlobalFunctions();

    console.log("🎉 Services application ready!");
  } catch (error) {
    console.error("❌ Failed to initialize services application:", error);
  }
}

/**
 * Setup global functions for HTML onclick handlers
 */
function setupGlobalFunctions() {
  window.toggleMobileMenu = () => {
    if (window.servicesApp?.mobileMenu) {
      window.servicesApp.mobileMenu.toggle();
    }
  };

  window.toggleMode = () => {
    if (window.servicesApp?.modeToggle) {
      window.servicesApp.modeToggle.toggle();
    }
  };

  window.handleBooking = ServicesApp.handleBooking;
}

// Auto-initialize when imported
initializeServicesApp();

// Export for manual initialization if needed
export default ServicesApp;
export { initializeServicesApp };
