/**
 * Viewport and Scroll Fix for Mobile
 * Add this to your main app initialization
 */
export class ViewportFix {
  static init() {
    // Prevent overscroll/bounce on iOS
    this.preventOverscroll();

    // Fix viewport height issues
    this.fixViewportHeight();

    // Prevent pull-to-refresh
    this.preventPullToRefresh();

    console.log("📱 Viewport fixes applied");
  }

  static preventOverscroll() {
    // Prevent elastic scrolling on iOS
    document.addEventListener(
      "touchmove",
      (e) => {
        // Allow scrolling within scrollable elements
        if (e.target.closest(".diagnostic-grid, .mobile-menu, .faq-content")) {
          return;
        }

        // Prevent overscroll at document level
        const scrollY = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        if (scrollY <= 0 || scrollY >= maxScroll) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  static fixViewportHeight() {
    // Fix mobile viewport height issues
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);
  }

  static preventPullToRefresh() {
    // Prevent pull-to-refresh on mobile
    let startY = 0;

    document.addEventListener(
      "touchstart",
      (e) => {
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        const currentY = e.touches[0].clientY;
        const scrollY = window.scrollY;

        // If at top and pulling down, prevent
        if (scrollY === 0 && currentY > startY) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
}

// Add this to your AxisImagingApp init method:
// ViewportFix.init();
