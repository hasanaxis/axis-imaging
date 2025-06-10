/**
 * Scroll Effects Component
 */
export class ScrollEffects {
  constructor() {
    this.ticking = false;
  }

  init() {
    this.attachListeners();
    this.handleScrollEffects(); // Initial call
    console.log("🎨 Scroll Effects initialized");
  }

  attachListeners() {
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.handleScrollEffects();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  handleScrollEffects() {
    const scrollY = window.scrollY;

    this.updateHeader(scrollY);
    this.updateParallaxElements(scrollY);
    this.updateFadeInElements();
  }

  updateHeader(scrollY) {
    const header = document.querySelector(".header, header");
    if (header) {
      header.classList.toggle("scrolled", scrollY > 50);
    }
  }

  updateParallaxElements(scrollY) {
    const parallaxElements = document.querySelectorAll(".parallax");
    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  updateFadeInElements() {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  }

  destroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
