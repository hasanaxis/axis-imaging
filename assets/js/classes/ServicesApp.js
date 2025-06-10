import { MobileMenu } from "../components/MobileMenu.js";
import { ModeToggle } from "../components/ModeToggle.js";
import { HeaderScrollHandler } from "../components/HeaderScrollHandler.js";
import { ServicesOverview } from "../components/ServicesOverview.js";
import { ServicesCTA } from "../components/ServicesCTA.js";
import { DOMHelpers } from "../utils/DOMHelpers.js";

/**
 * Simplified Services Application Class
 * For static content layout (no dynamic switching)
 */
export class ServicesApp {
  constructor() {
    this.components = {};
    this.initialized = false;
  }

  async init() {
    console.log("🚀 Initializing Services App...");

    try {
      await this.waitForDOM();
      await this.initializeComponents();
      this.attachGeneralListeners();
      this.addDynamicStyles();
      this.setupScrollAnimations();

      this.initialized = true;
      console.log("✅ Services App initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize services app:", error);
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
    console.log("🔧 Initializing services components...");

    // Initialize reused components
    this.components.mobileMenu = new MobileMenu();
    this.components.modeToggle = new ModeToggle();
    this.components.headerScrollHandler = new HeaderScrollHandler();

    // Initialize services-specific components
    this.components.servicesOverview = new ServicesOverview();
    this.components.servicesCTA = new ServicesCTA();

    // Initialize each component
    await Promise.all([
      this.components.mobileMenu.init(),
      this.components.modeToggle.init(),
      this.components.headerScrollHandler.init(),
      this.components.servicesOverview.init(),
      this.components.servicesCTA.init(),
    ]);

    console.log("✅ All services components initialized");
  }

  attachGeneralListeners() {
    // Learn more buttons
    const learnMoreButtons = document.querySelectorAll(".service-learn-more");
    learnMoreButtons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleLearnMoreClick(button, index);
      });
    });

    // Book appointment buttons
    const bookButtons = document.querySelectorAll(
      ".cta-primary, .book-appointment"
    );
    bookButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleBookingClick();
      });
    });

    // Call buttons
    const callButtons = document.querySelectorAll(".cta-secondary");
    callButtons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleCallClick();
      });
    });

    console.log("🔗 Services general listeners attached");
  }

  handleLearnMoreClick(button, index) {
    const serviceSection = button.closest(".service-section");
    const serviceName =
      serviceSection?.querySelector("h3")?.textContent || "Service";

    console.log(`📚 Learn more clicked for: ${serviceName}`);

    // Here you could navigate to detailed service pages
    // For now, we'll scroll to the service or show more info
    const serviceId = serviceSection?.id;
    if (serviceId) {
      // Could redirect to detailed service page
      // window.location.href = `service-details.html?service=${serviceId}`;

      // Or expand content in place
      this.expandServiceInfo(serviceSection);
    }
  }

  expandServiceInfo(serviceSection) {
    // Add a simple expansion animation or modal
    serviceSection.classList.add("expanded");

    // You could add more detailed content here
    console.log("Expanding service information...");
  }

  handleBookingClick() {
    // Force show header before action
    if (this.components.headerScrollHandler) {
      this.components.headerScrollHandler.forceShowHeader();
    }

    console.log("📅 Booking button clicked");

    // Here you would integrate with your booking system
    alert("Redirecting to booking system...");
  }

  handleCallClick() {
    console.log("📞 Call button clicked");

    const phoneNumber = "+61399990000";

    // Check if it's a mobile device
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      alert("Call us at: (03) 9999 0000");
    }
  }

  setupScrollAnimations() {
    // Setup intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe all service sections
    const serviceSections = document.querySelectorAll(".service-section");
    serviceSections.forEach((section) => {
      observer.observe(section);
    });
  }

  addDynamicStyles() {
    const css = `
      .service-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .service-section.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .service-learn-more:hover {
        transform: translateY(-2px);
      }
      
      .service-section.expanded {
        background: #f8f9fa;
        padding: 30px;
        border-radius: 20px;
        margin: 20px 0;
      }
      
      .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      }
    `;

    DOMHelpers.addStyles(css, "services-dynamic-styles");
  }

  // Getters for component access
  get mobileMenu() {
    return this.components.mobileMenu;
  }

  get servicesOverview() {
    return this.components.servicesOverview;
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
    if (window.servicesApp?.handleBookingClick) {
      window.servicesApp.handleBookingClick();
    }
  }
}
