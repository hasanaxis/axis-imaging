import { EventManager } from "../utils/EventManager.js";
import { DOMHelpers } from "../utils/DOMHelpers.js";

/**
 * Enhanced FAQ Component with Dynamic Category Loading
 */
export class FAQ {
  constructor() {
    this.eventManager = new EventManager();
    this.loadedCategories = new Set();
    this.categoryComponents = {
      general: "components/faq/faq-general.html",
      "ct-scan": "components/faq/faq-ct-scan.html",
      "x-ray": "components/faq/faq-x-ray.html",
      ultrasound: "components/faq/faq-ultrasound.html",
      dexa: "components/faq/faq-dexa.html",
    };
  }

  async init() {
    try {
      await DOMHelpers.waitForElements([".faq-tab", ".faq-category"], 3000);

      // Load the default category (general) first
      await this.loadCategory("general");

      this.attachListeners();
      console.log("❓ FAQ initialized with dynamic loading");
    } catch (error) {
      console.warn("FAQ elements not found:", error.message);
    }
  }

  async loadCategory(categoryId) {
    // Skip if already loaded
    if (this.loadedCategories.has(categoryId)) {
      return true;
    }

    const categoryElement = document.getElementById(categoryId);
    const componentPath = this.categoryComponents[categoryId];

    if (!categoryElement || !componentPath) {
      console.error(
        `Category element or component path not found: ${categoryId}`
      );
      return false;
    }

    try {
      console.log(`📂 Loading FAQ category: ${categoryId}`);

      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      categoryElement.innerHTML = html;

      // Attach item listeners for this category
      this.attachItemListenersForCategory(categoryElement);

      this.loadedCategories.add(categoryId);
      console.log(`✅ FAQ category loaded: ${categoryId}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to load FAQ category ${categoryId}:`, error);
      categoryElement.innerHTML = `
        <div style="padding: 20px; text-align: center; color: #666;">
          <p>Unable to load ${categoryId} questions at this time.</p>
          <button onclick="window.location.reload()">Reload Page</button>
        </div>
      `;
      return false;
    }
  }

  attachListeners() {
    this.attachTabListeners();
    // Item listeners are attached per category when loaded
  }

  attachTabListeners() {
    const faqTabs = document.querySelectorAll(".faq-tab");
    faqTabs.forEach((tab) => {
      this.eventManager.addEventListener(tab, "click", async (e) => {
        e.preventDefault();
        await this.switchCategory(tab);
      });
    });
    console.log(`📑 FAQ tab listeners attached to ${faqTabs.length} tabs`);
  }

  attachItemListenersForCategory(categoryElement) {
    const faqItems = categoryElement.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (question) {
        // Remove existing listeners to prevent duplicates
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);

        this.eventManager.addEventListener(newQuestion, "click", (e) => {
          e.preventDefault();
          this.toggleItem(item);
        });
      }
    });
    console.log(
      `❓ FAQ item listeners attached to ${faqItems.length} items in category`
    );
  }

  async switchCategory(activeTab) {
    const category = activeTab.dataset.category;

    if (!category) {
      console.error("No category data found on tab");
      return;
    }

    console.log(`📑 Switching to FAQ category: ${category}`);

    // Update tab states
    document.querySelectorAll(".faq-tab").forEach((tab) => {
      tab.classList.remove("active");
    });
    activeTab.classList.add("active");

    // Hide all categories
    document.querySelectorAll(".faq-category").forEach((cat) => {
      cat.classList.remove("active");
    });

    // Load category if not already loaded
    const loadSuccess = await this.loadCategory(category);

    if (loadSuccess) {
      // Show target category
      const targetCategory = document.getElementById(category);
      if (targetCategory) {
        targetCategory.classList.add("active");
        this.closeAllInCategory(targetCategory);
      }
    }
  }

  toggleItem(faqItem) {
    const answer = faqItem.querySelector(".faq-answer");
    const question = faqItem.querySelector(".faq-question");
    const isCurrentlyOpen =
      faqItem.classList.contains("active") ||
      faqItem.classList.contains("open");

    // Find current category and close other FAQs
    const currentCategory = faqItem.closest(".faq-category");
    this.closeAllInCategory(currentCategory);

    // Open this FAQ if it wasn't already open
    if (!isCurrentlyOpen) {
      faqItem.classList.add("active", "open");
      if (question) question.classList.add("active");

      if (answer) {
        DOMHelpers.animateHeight(answer, answer.scrollHeight + "px");
      }
      console.log("❓ FAQ opened");
    }
  }

  closeAllInCategory(category) {
    if (!category) return;

    const allFAQs = category.querySelectorAll(".faq-item");
    allFAQs.forEach((item) => {
      item.classList.remove("open", "active");
      const itemQuestion = item.querySelector(".faq-question");
      const itemAnswer = item.querySelector(".faq-answer");

      if (itemQuestion) itemQuestion.classList.remove("active");
      if (itemAnswer) DOMHelpers.animateHeight(itemAnswer, "0");
    });
  }

  // Preload all categories for better UX
  async preloadAllCategories() {
    console.log("🔄 Preloading all FAQ categories...");
    const promises = Object.keys(this.categoryComponents).map((categoryId) =>
      this.loadCategory(categoryId)
    );

    try {
      await Promise.all(promises);
      console.log("✅ All FAQ categories preloaded");
    } catch (error) {
      console.warn("⚠️ Some FAQ categories failed to preload:", error);
    }
  }

  destroy() {
    this.eventManager.removeAllListeners();
    this.loadedCategories.clear();
  }
}
