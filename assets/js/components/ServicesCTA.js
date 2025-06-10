import { EventManager } from "../utils/EventManager.js";

/**
 * Services CTA Component
 */
export class ServicesCTA {
  constructor() {
    this.eventManager = new EventManager();
  }

  init() {
    this.attachListeners();
    this.setupAnimations();
    console.log("📞 Services CTA initialized");
  }

  attachListeners() {
    // Primary CTA buttons
    const primaryButtons = document.querySelectorAll(".cta-primary");
    primaryButtons.forEach((button) => {
      this.eventManager.addEventListener(button, "click", (e) => {
        e.preventDefault();
        this.handleBookingClick();
      });
    });

    // Secondary CTA buttons (phone)
    const secondaryButtons = document.querySelectorAll(".cta-secondary");
    secondaryButtons.forEach((button) => {
      this.eventManager.addEventListener(button, "click", (e) => {
        e.preventDefault();
        this.handleCallClick();
      });
    });

    console.log("📞 CTA listeners attached");
  }

  setupAnimations() {
    // Add scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    const ctaSection = document.querySelector(".services-cta");
    if (ctaSection) {
      observer.observe(ctaSection);
    }
  }

  handleBookingClick() {
    console.log("📅 CTA Booking button clicked");

    // Here you would integrate with your booking system
    // For now, we'll show an alert or redirect
    if (window.servicesApp) {
      window.servicesApp.handleBookingClick();
    } else {
      // Fallback
      alert("Redirecting to booking system...");
    }
  }

  handleCallClick() {
    console.log("📞 CTA Call button clicked");

    const phoneNumber = "+61399990000";

    // Check if it's a mobile device
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      // On mobile, initiate phone call
      window.location.href = `tel:${phoneNumber}`;
    } else {
      // On desktop, copy number and show alert
      this.copyToClipboard(phoneNumber);
      alert("Phone number copied to clipboard: (03) 9999 0000");
    }
  }

  copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      // Use modern clipboard API
      navigator.clipboard.writeText(text).catch((err) => {
        console.warn("Could not copy text: ", err);
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.warn("Could not copy text: ", err);
      }

      document.body.removeChild(textArea);
    }
  }

  // Method to update CTA content dynamically if needed
  updateCTAContent(service) {
    const ctaTitle = document.querySelector(".services-cta-content h2");
    const ctaDescription = document.querySelector(".services-cta-content p");

    if (ctaTitle && ctaDescription) {
      ctaTitle.textContent = `Ready to Book Your ${service
        .replace("-", " ")
        .toUpperCase()}?`;
      ctaDescription.textContent = `Experience modern ${service.replace(
        "-",
        " "
      )} imaging with care that feels personal — and billing that's fully bulk billed for most patients.`;
    }
  }

  destroy() {
    this.eventManager.removeAllListeners();
  }
}
