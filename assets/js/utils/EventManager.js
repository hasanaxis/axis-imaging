/**
 * Event Manager utility for handling event listeners
 */
export class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Add event listener and track it
   */
  addEventListener(element, event, handler, options = {}) {
    if (!element) return;

    const key = `${element.constructor.name}-${event}`;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }

    element.addEventListener(event, handler, options);
    this.listeners.get(key).push({ element, event, handler });
  }

  /**
   * Remove all tracked listeners
   */
  removeAllListeners() {
    this.listeners.forEach((listeners) => {
      listeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
    });
    this.listeners.clear();
  }

  /**
   * Replace element to remove all its listeners
   */
  replaceElement(element) {
    if (!element || !element.parentNode) return element;
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
  }
}
