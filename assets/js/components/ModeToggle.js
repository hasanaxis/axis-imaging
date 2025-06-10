import { EventManager } from "../utils/EventManager.js";

/**
 * Mode Toggle Component (Patient/Referrer)
 */
export class ModeToggle {
  constructor() {
    this.currentMode = "patient";
    this.eventManager = new EventManager();
  }

  init() {
    this.attachListeners();
    this.updateContentForMode();
    console.log("🔄 Mode Toggle initialized");
  }

  attachListeners() {
    const toggleSwitch = document.querySelector(".toggle-switch");
    if (toggleSwitch) {
      this.eventManager.addEventListener(toggleSwitch, "click", () =>
        this.toggle()
      );
    }
  }

  toggle() {
    this.currentMode = this.currentMode === "patient" ? "referrer" : "patient";

    // Update toggle labels
    const toggleLabels = document.querySelectorAll(".toggle-label");
    toggleLabels.forEach((label) => {
      label.classList.remove("active");
      if (label.textContent.toLowerCase().includes(this.currentMode)) {
        label.classList.add("active");
      }
    });

    // Update toggle switch appearance
    const toggleSwitches = document.querySelectorAll(".toggle-switch");
    toggleSwitches.forEach((toggleSwitch) => {
      if (this.currentMode === "referrer") {
        toggleSwitch.classList.add("referrer-mode");
      } else {
        toggleSwitch.classList.remove("referrer-mode");
      }
    });

    this.updateContentForMode();
    console.log(`🔄 Mode switched to: ${this.currentMode}`);
  }

  updateContentForMode() {
    const modeSpecificElements = document.querySelectorAll("[data-mode]");
    modeSpecificElements.forEach((element) => {
      const elementMode = element.dataset.mode;
      element.style.display =
        elementMode === this.currentMode ? "block" : "none";
    });
  }

  getCurrentMode() {
    return this.currentMode;
  }

  destroy() {
    this.eventManager.removeAllListeners();
  }

  // Static method for global access
  static toggle() {
    if (window.axisApp?.modeToggle) {
      window.axisApp.modeToggle.toggle();
    }
  }
}
