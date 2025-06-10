import { EventManager } from "../utils/EventManager.js";

/**
 * Enhanced Diagnostic Services Component with Working Pagination and Intersection Observer
 */
export class DiagnosticServices {
  constructor() {
    this.eventManager = new EventManager();
    this.currentIndex = 0;
    this.serviceCards = [];
    this.paginationDots = [];
    this.servicesGrid = null;
    this.intersectionObserver = null;
  }

  init() {
    this.setupElements();
    this.attachListeners();
    this.setupIntersectionObserver();
    this.updateActiveCard(0); // Set first card as active initially
    console.log("🏥 Diagnostic Services initialized");
  }

  setupElements() {
    this.serviceCards = document.querySelectorAll(".diagnostic-card");
    this.paginationDots = document.querySelectorAll(".pagination-dot");
    this.servicesGrid = document.getElementById("services-grid");
  }

  attachListeners() {
    // Service card click listeners
    this.serviceCards.forEach((card, index) => {
      this.eventManager.addEventListener(card, "click", () => {
        this.handleServiceClick(card, index);
      });
    });

    // Pagination dot click listeners
    this.paginationDots.forEach((dot, index) => {
      this.eventManager.addEventListener(dot, "click", () => {
        this.scrollToServiceByDot(index);
      });
    });

    // Touch/scroll listeners for mobile
    if (this.servicesGrid) {
      this.eventManager.addEventListener(this.servicesGrid, "scroll", () => {
        this.handleScroll();
      });
    }

    console.log(
      `🏥 Diagnostic service listeners attached to ${this.serviceCards.length} cards`
    );
  }

  setupIntersectionObserver() {
    // Only set up intersection observer on mobile/tablet
    if (window.innerWidth <= 768) {
      const options = {
        root: this.servicesGrid,
        rootMargin: "0px",
        threshold: 0.6, // Card is considered "in view" when 60% visible
      };

      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = Array.from(this.serviceCards).indexOf(
              entry.target
            );
            if (cardIndex !== -1) {
              this.updateActiveCard(cardIndex);
            }
          }
        });
      }, options);

      // Observe all service cards
      this.serviceCards.forEach((card) => {
        this.intersectionObserver.observe(card);
      });
    }
  }

  handleServiceClick(card, index) {
    this.updateActiveCard(index);
    console.log(`🏥 Selected diagnostic service: ${card.dataset.service}`);
  }

  scrollToServiceByDot(index) {
    if (index < 0 || index >= this.serviceCards.length) return;

    const targetCard = this.serviceCards[index];
    if (!targetCard) return;

    // Scroll to the card
    if (window.innerWidth <= 768) {
      // Mobile: scroll horizontally
      targetCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } else {
      // Desktop: just update the active state
      this.updateActiveCard(index);
    }
  }

  updateActiveCard(index) {
    if (index < 0 || index >= this.serviceCards.length) return;

    this.currentIndex = index;

    // Update card focus states
    this.serviceCards.forEach((card, i) => {
      card.classList.toggle("focused", i === index);
    });

    // Update pagination dots
    this.paginationDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    console.log(`🏥 Active card updated to index: ${index}`);
  }

  handleScroll() {
    // Debounce scroll handling
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = setTimeout(() => {
      this.updateActiveCardFromScroll();
    }, 100);
  }

  updateActiveCardFromScroll() {
    if (window.innerWidth > 768) return; // Only on mobile

    const gridRect = this.servicesGrid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    this.serviceCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - gridCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== this.currentIndex) {
      this.updateActiveCard(closestIndex);
    }
  }

  // Navigation methods for external use
  nextService() {
    const nextIndex = (this.currentIndex + 1) % this.serviceCards.length;
    this.scrollToServiceByDot(nextIndex);
  }

  prevService() {
    const prevIndex =
      this.currentIndex === 0
        ? this.serviceCards.length - 1
        : this.currentIndex - 1;
    this.scrollToServiceByDot(prevIndex);
  }

  // Handle window resize
  handleResize() {
    // Reinitialize intersection observer on window resize
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    setTimeout(() => {
      this.setupIntersectionObserver();
    }, 100);
  }

  destroy() {
    this.eventManager.removeAllListeners();

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Remove resize listener if added
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  // Static methods for global access
  static scrollToServiceByDot(index) {
    if (window.axisApp?.diagnosticServices) {
      window.axisApp.diagnosticServices.scrollToServiceByDot(index);
    }
  }

  static nextService() {
    if (window.axisApp?.diagnosticServices) {
      window.axisApp.diagnosticServices.nextService();
    }
  }

  static prevService() {
    if (window.axisApp?.diagnosticServices) {
      window.axisApp.diagnosticServices.prevService();
    }
  }
}
