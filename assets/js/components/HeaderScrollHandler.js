import { EventManager } from "../utils/EventManager.js";

/**
 * Header Scroll Handler Component
 * Manages header visibility based on scroll direction
 */
export class HeaderScrollHandler {
  constructor() {
    this.eventManager = new EventManager();
    this.lastScrollY = 0;
    this.isScrollingDown = false;
    this.isHeaderHidden = false;
    this.scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
    this.mobileMenuOpen = false;
  }

  init() {
    this.setupScrollListener();
    this.setupMobileMenuListener();
    console.log("📜 Header Scroll Handler initialized");
  }

  setupScrollListener() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScrollDirection();
          ticking = false;
        });
        ticking = true;
      }
    };

    this.eventManager.addEventListener(window, "scroll", handleScroll, {
      passive: true,
    });
  }

  setupMobileMenuListener() {
    // Listen for mobile menu state changes
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    if (mobileMenuToggle) {
      this.eventManager.addEventListener(mobileMenuToggle, "click", () => {
        // Delay to let the menu toggle first
        setTimeout(() => {
          this.checkMobileMenuState();
        }, 50);
      });
    }
  }

  handleScrollDirection() {
    const currentScrollY = window.scrollY;
    const header = document.querySelector(".header");

    if (!header) return;

    // Don't hide header if mobile menu is open
    if (this.mobileMenuOpen) {
      return;
    }

    // Don't hide header at the very top of the page
    if (currentScrollY <= 100) {
      this.showHeader();
      this.lastScrollY = currentScrollY;
      return;
    }

    // Check scroll direction
    const scrollDifference = currentScrollY - this.lastScrollY;

    // Only trigger if scroll difference is significant enough
    if (Math.abs(scrollDifference) < this.scrollThreshold) {
      return;
    }

    if (scrollDifference > 0 && !this.isHeaderHidden) {
      // Scrolling down - hide header
      this.hideHeader();
    } else if (scrollDifference < 0 && this.isHeaderHidden) {
      // Scrolling up - show header
      this.showHeader();
    }

    this.lastScrollY = currentScrollY;
  }

  hideHeader() {
    const header = document.querySelector(".header");
    if (header && !this.mobileMenuOpen) {
      header.classList.add("hidden");
      header.classList.remove("visible");
      this.isHeaderHidden = true;
      console.log("📜 Header hidden on scroll down");
    }
  }

  showHeader() {
    const header = document.querySelector(".header");
    if (header) {
      header.classList.remove("hidden");
      header.classList.add("visible");
      this.isHeaderHidden = false;
      console.log("📜 Header shown on scroll up");
    }
  }

  checkMobileMenuState() {
    const mobileMenu = document.querySelector(".mobile-menu");
    const header = document.querySelector(".header");

    if (mobileMenu && header) {
      this.mobileMenuOpen = mobileMenu.classList.contains("active");

      if (this.mobileMenuOpen) {
        // Mobile menu is open - keep header visible
        header.classList.add("mobile-menu-open");
        header.classList.remove("hidden");
        header.classList.add("visible");
        console.log("📜 Header kept visible - mobile menu open");
      } else {
        // Mobile menu is closed - remove the override
        header.classList.remove("mobile-menu-open");
        console.log("📜 Header menu override removed");
      }
    }
  }

  // Method to force show header (useful for specific scenarios)
  forceShowHeader() {
    this.showHeader();
  }

  // Method to reset scroll position tracking
  resetScrollPosition() {
    this.lastScrollY = window.scrollY;
  }

  destroy() {
    this.eventManager.removeAllListeners();
  }
}
