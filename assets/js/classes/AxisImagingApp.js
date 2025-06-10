import { MobileMenu } from "../components/MobileMenu.js";
import { ModeToggle } from "../components/ModeToggle.js";
import { BookingSteps } from "../components/BookingSteps.js";
import { FAQ } from "../components/FAQ.js";
import { DiagnosticServices } from "../components/DiagnosticServices.js";
import { ScrollEffects } from "../components/ScrollEffects.js";
import { HeaderScrollHandler } from "../components/HeaderScrollHandler.js";
import { DOMHelpers } from "../utils/DOMHelpers.js";
import { ViewportFix } from "../utils/ViewportFix.js";

/**
 * Main Axis Imaging Application Class
 */
export class AxisImagingApp {
  constructor() {
    this.components = {};
    this.initialized = false;
  }

  async init() {
    console.log("🚀 Initializing Axis Imaging App...");

    try {
      ViewportFix.init(); // Add this line
      await this.waitForDOM();
      await this.initializeComponents();
      this.attachGeneralListeners();
      this.addDynamicStyles();

      this.initialized = true;
      console.log("✅ App initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize app:", error);
    }
  }

  async waitForDOM() {
    if (document.readyState === "loading") {
      await new Promise((resolve) => {
        document.addEventListener("DOMContentLoaded", resolve, { once: true });
      });
    }

    // Additional wait for components to render
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async initializeComponents() {
    console.log("🔧 Initializing components...");

    // Initialize all components
    this.components.mobileMenu = new MobileMenu();
    this.components.modeToggle = new ModeToggle();
    this.components.bookingSteps = new BookingSteps();
    this.components.faq = new FAQ();
    this.components.diagnosticServices = new DiagnosticServices();
    this.components.scrollEffects = new ScrollEffects();
    this.components.headerScrollHandler = new HeaderScrollHandler();

    // Initialize each component
    await Promise.all([
      this.components.mobileMenu.init(),
      this.components.modeToggle.init(),
      this.components.bookingSteps.init(),
      this.components.faq.init(),
      this.components.diagnosticServices.init(),
      this.components.scrollEffects.init(),
      this.components.headerScrollHandler.init(),
    ]);

    console.log("✅ All components initialized");
  }

  attachGeneralListeners() {
    // Book appointment buttons
    const bookButtons = document.querySelectorAll(
      ".book-appointment, .cta-button, .book-now"
    );
    bookButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleBookingClick();
      });
    });

    // Service cards
    const serviceCards = document.querySelectorAll(
      ".service-card, .feature-card"
    );
    serviceCards.forEach((card) => {
      card.addEventListener("click", () => {
        this.handleServiceClick(card);
      });
    });

    console.log("🔗 General listeners attached");
  }

  handleBookingClick() {
    const bookingSection = document.querySelector(
      "#booking-component, .booking-section"
    );
    if (bookingSection) {
      // Force show header before scrolling
      if (this.components.headerScrollHandler) {
        this.components.headerScrollHandler.forceShowHeader();
      }

      bookingSection.scrollIntoView({ behavior: "smooth" });
      console.log("📅 Scrolled to booking section");
    } else {
      console.log("📅 Booking clicked - implement booking logic here");
      alert("Booking system would open here");
    }
  }

  handleServiceClick(card) {
    const serviceName =
      card.querySelector("h3, .service-title")?.textContent || "Service";
    console.log(`🏥 Service clicked: ${serviceName}`);

    // Add visual feedback
    card.classList.add("clicked");
    setTimeout(() => card.classList.remove("clicked"), 200);
  }

  addDynamicStyles() {
    const css = `
      .mobile-open .nav-menu {
        transform: translateX(0) !important;
      }
      
      .step-content {
        display: none;
      }
      
      .step-content.active {
        display: block;
      }
      
      .faq-answer, .answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      
      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .clicked {
        transform: scale(0.98);
        transition: transform 0.1s ease;
      }
      
      .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      }

      /* Header scroll transitions */
      .header {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .header.hidden {
        transform: translateY(-100%);
      }

      .header.visible {
        transform: translateY(0);
      }
    `;

    DOMHelpers.addStyles(css, "axis-dynamic-styles");
  }

  // Getters for component access
  get mobileMenu() {
    return this.components.mobileMenu;
  }
  get modeToggle() {
    return this.components.modeToggle;
  }
  get bookingSteps() {
    return this.components.bookingSteps;
  }
  get faq() {
    return this.components.faq;
  }
  get diagnosticServices() {
    return this.components.diagnosticServices;
  }
  get scrollEffects() {
    return this.components.scrollEffects;
  }
  get headerScrollHandler() {
    return this.components.headerScrollHandler;
  }

  // Cleanup method
  destroy() {
    Object.values(this.components).forEach((component) => {
      if (component.destroy) {
        component.destroy();
      }
    });
    this.components = {};
    this.initialized = false;
  }

  // Static method for global access
  static handleBooking() {
    if (window.axisApp?.handleBookingClick) {
      window.axisApp.handleBookingClick();
    }
  }
}
