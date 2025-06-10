/**
 * DOM Helper utilities
 */
export class DOMHelpers {
  /**
   * Wait for element to exist in DOM
   */
  static waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Wait for multiple elements
   */
  static waitForElements(selectors, timeout = 5000) {
    const promises = selectors.map((selector) =>
      this.waitForElement(selector, timeout)
    );
    return Promise.all(promises);
  }

  /**
   * Animate element height
   */
  static animateHeight(element, targetHeight) {
    if (!element) return;

    element.style.transition = "max-height 0.3s ease";
    element.style.maxHeight = targetHeight;
  }

  /**
   * Add dynamic styles to head
   */
  static addStyles(css, id = "dynamic-styles") {
    let style = document.getElementById(id);
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }
    style.textContent = css;
  }
}
