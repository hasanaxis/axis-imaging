import { EventManager } from "../utils/EventManager.js";

/**
 * Enhanced Mobile Menu Component
 */
export class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.eventManager = new EventManager();
  }

  init() {
    this.attachListeners();
    console.log("📱 Mobile Menu initialized");
  }

  attachListeners() {
    // Mobile menu toggle button
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    if (mobileToggle) {
      this.eventManager.addEventListener(mobileToggle, "click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      });
    }

    // Close mobile menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-menu a");
    mobileNavLinks.forEach((link) => {
      this.eventManager.addEventListener(link, "click", () => {
        if (this.isOpen) {
          this.close();
        }
      });
    });

    // Close mobile menu when clicking outside
    this.eventManager.addEventListener(document, "click", (e) => {
      const mobileMenu = document.querySelector(".mobile-menu");
      const mobileToggle = document.querySelector(".mobile-menu-toggle");

      if (
        this.isOpen &&
        mobileMenu &&
        !mobileMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        this.close();
      }
    });

    // Close mobile menu on escape key
    this.eventManager.addEventListener(document, "keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Handle window resize - close menu on desktop
    this.eventManager.addEventListener(window, "resize", () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.updateUI();
    console.log("📱 Mobile menu opened");
  }

  close() {
    this.isOpen = false;
    this.updateUI();
    console.log("📱 Mobile menu closed");
  }

  updateUI() {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const body = document.body;

    if (mobileToggle) {
      mobileToggle.classList.toggle("active", this.isOpen);
    }

    if (mobileMenu) {
      mobileMenu.classList.toggle("active", this.isOpen);
    }

    // Prevent body scrolling when menu is open
    body.classList.toggle("menu-open", this.isOpen);

    // Update aria attributes for accessibility
    if (mobileToggle) {
      mobileToggle.setAttribute("aria-expanded", this.isOpen.toString());
    }

    if (mobileMenu) {
      mobileMenu.setAttribute("aria-hidden", (!this.isOpen).toString());
    }
  }

  destroy() {
    // Clean up - close menu and remove listeners
    if (this.isOpen) {
      this.close();
    }
    this.eventManager.removeAllListeners();
  }

  // Static method for global access
  static toggle() {
    if (window.axisApp?.mobileMenu) {
      window.axisApp.mobileMenu.toggle();
    }
  }

  static close() {
    if (window.axisApp?.mobileMenu) {
      window.axisApp.mobileMenu.close();
    }
  }
}
