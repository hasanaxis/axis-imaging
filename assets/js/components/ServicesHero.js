import { EventManager } from "../utils/EventManager.js";

/**
 * Services Hero Component
 */
export class ServicesHero {
  constructor() {
    this.eventManager = new EventManager();
    this.serviceData = {
      "ct-scan": {
        title: "CT-Scan",
        subtitle:
          "Discover more about CT-Scans and how they can benefit your health.",
        image: "assets/images/services/ct-scan-hero.jpg",
      },
      "x-ray": {
        title: "X-Ray",
        subtitle:
          "Quick and effective imaging for bones, joints, and internal structures.",
        image: "assets/images/services/x-ray-hero.jpg",
      },
      ultrasound: {
        title: "Ultrasound",
        subtitle:
          "Safe, real-time imaging using sound waves for detailed internal views.",
        image: "assets/images/services/ultrasound-hero.jpg",
      },
      dexa: {
        title: "DEXA Scan",
        subtitle:
          "Precise bone density measurement for osteoporosis detection and monitoring.",
        image: "assets/images/services/dexa-hero.jpg",
      },
      mri: {
        title: "MRI",
        subtitle:
          "Advanced magnetic resonance imaging for detailed soft tissue analysis.",
        image: "assets/images/services/mri-hero.jpg",
      },
      mammography: {
        title: "Mammography",
        subtitle:
          "Specialized breast imaging for early detection and comprehensive screening.",
        image: "assets/images/services/mammography-hero.jpg",
      },
    };
  }

  init() {
    this.setupElements();
    console.log("🎯 Services Hero initialized");
  }

  setupElements() {
    this.titleElement = document.querySelector(".services-hero-title");
    this.subtitleElement = document.querySelector(".services-hero-subtitle");
    this.imageElement = document.querySelector(".hero-image");
  }

  updateService(serviceType) {
    const service = this.serviceData[serviceType];

    if (!service) {
      console.warn(`Service data not found for: ${serviceType}`);
      return;
    }

    // Add loading class for smooth transition
    const heroSection = document.querySelector(".services-hero");
    if (heroSection) {
      heroSection.classList.add("loading");
    }

    // Update content with animation
    setTimeout(() => {
      if (this.titleElement) {
        this.titleElement.textContent = service.title;
      }

      if (this.subtitleElement) {
        this.subtitleElement.textContent = service.subtitle;
      }

      if (this.imageElement) {
        this.imageElement.src = service.image;
        this.imageElement.alt = `${service.title} procedure`;
      }

      // Remove loading class
      if (heroSection) {
        heroSection.classList.remove("loading");
      }

      console.log(`🎯 Hero updated for service: ${serviceType}`);
    }, 150);
  }

  destroy() {
    this.eventManager.removeAllListeners();
  }
}
