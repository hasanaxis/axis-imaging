import { EventManager } from "../utils/EventManager.js";

/**
 * Services Overview Component
 * Handles the static list of services with alternating layout
 */
export class ServicesOverview {
  constructor() {
    this.eventManager = new EventManager();
    this.services = [
      "ct-scan",
      "x-ray",
      "ultrasound",
      "dexa",
      "mri",
      "mammography",
    ];
  }

  init() {
    this.setupScrollAnimations();
    this.attachServiceListeners();
    console.log("📋 Services Overview initialized");
  }

  setupScrollAnimations() {
    // Add staggered animation delays
    const serviceSections = document.querySelectorAll(".service-section");
    serviceSections.forEach((section, index) => {
      section.style.setProperty("--animation-delay", `${index * 0.1}s`);
    });

    // Setup intersection observer for animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Add special animation for images
          const image = entry.target.querySelector(".service-image img");
          if (image) {
            setTimeout(() => {
              image.classList.add("loaded");
            }, 200);
          }
        }
      });
    }, observerOptions);

    serviceSections.forEach((section) => {
      observer.observe(section);
    });
  }

  attachServiceListeners() {
    // Learn more button interactions
    const learnMoreButtons = document.querySelectorAll(".service-learn-more");
    learnMoreButtons.forEach((button) => {
      this.eventManager.addEventListener(button, "mouseenter", () => {
        this.highlightService(button);
      });

      this.eventManager.addEventListener(button, "mouseleave", () => {
        this.unhighlightService(button);
      });

      this.eventManager.addEventListener(button, "click", (e) => {
        e.preventDefault();
        this.handleLearnMore(button);
      });
    });

    // Service section hover effects
    const serviceSections = document.querySelectorAll(".service-section");
    serviceSections.forEach((section) => {
      this.eventManager.addEventListener(section, "mouseenter", () => {
        section.classList.add("hovered");
      });

      this.eventManager.addEventListener(section, "mouseleave", () => {
        section.classList.remove("hovered");
      });
    });
  }

  highlightService(button) {
    const serviceSection = button.closest(".service-section");
    if (serviceSection) {
      serviceSection.classList.add("highlighted");
    }
  }

  unhighlightService(button) {
    const serviceSection = button.closest(".service-section");
    if (serviceSection) {
      serviceSection.classList.remove("highlighted");
    }
  }

  handleLearnMore(button) {
    const serviceSection = button.closest(".service-section");
    const serviceName =
      serviceSection?.querySelector("h3")?.textContent || "Service";

    console.log(`📚 Learn more clicked for: ${serviceName}`);

    // Add click animation
    button.classList.add("clicked");
    setTimeout(() => {
      button.classList.remove("clicked");
    }, 150);

    // Here you could:
    // 1. Navigate to a detailed service page
    // 2. Open a modal with more information
    // 3. Scroll to a detailed section

    // For now, we'll show an alert
    alert(
      `Learn more about ${serviceName} - This would open detailed information or navigate to a dedicated page.`
    );
  }

  // Method to programmatically scroll to a specific service
  scrollToService(serviceName) {
    const serviceId = `${serviceName.toLowerCase().replace(" ", "-")}-section`;
    const serviceSection = document.getElementById(serviceId);

    if (serviceSection) {
      serviceSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Highlight the service temporarily
      serviceSection.classList.add("highlighted");
      setTimeout(() => {
        serviceSection.classList.remove("highlighted");
      }, 2000);
    }
  }

  // Method to add dynamic content or expand services
  expandService(serviceSection) {
    // Could be used to show additional content
    serviceSection.classList.toggle("expanded");
  }

  destroy() {
    this.eventManager.removeAllListeners();
  }
}
