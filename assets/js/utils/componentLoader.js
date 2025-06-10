/**
 * Enhanced Component Loader with Debug Information
 * Replace your current componentLoader.js with this version
 */

class ComponentLoader {
  constructor() {
    this.loadedComponents = new Set();
    this.errors = [];
    this.debug = true; // Enable debug mode
  }

  /**
   * Log debug information
   */
  log(message, type = "info") {
    if (!this.debug) return;

    const timestamp = new Date().toLocaleTimeString();
    const emoji = {
      info: "ℹ️",
      success: "✅",
      error: "❌",
      warning: "⚠️",
    };

    console.log(`${emoji[type]} [${timestamp}] ${message}`);
  }

  /**
   * Load an HTML component into a target element
   * @param {string} componentPath - Path to the HTML component file
   * @param {string} targetSelector - CSS selector for target element
   */
  async loadComponent(componentPath, targetSelector) {
    this.log(`Attempting to load: ${componentPath} → ${targetSelector}`);

    try {
      // Check if target element exists
      const targetElement = document.querySelector(targetSelector);
      if (!targetElement) {
        throw new Error(`Target element not found: ${targetSelector}`);
      }

      this.log(`Target element found: ${targetSelector}`);

      // Attempt to fetch component
      this.log(`Fetching: ${componentPath}`);
      const response = await fetch(componentPath);

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: ${response.statusText} for ${componentPath}`
        );
      }

      const html = await response.text();
      this.log(`Component content length: ${html.length} characters`);

      targetElement.innerHTML = html;
      this.loadedComponents.add(componentPath);
      this.log(`Successfully loaded: ${componentPath}`, "success");

      return true;
    } catch (error) {
      const errorMsg = `Failed to load ${componentPath}: ${error.message}`;
      this.log(errorMsg, "error");
      this.errors.push({ componentPath, targetSelector, error: error.message });

      // Add error placeholder to target element
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.innerHTML = `
          <div style="background: #ffebee; border: 1px solid #f44336; padding: 10px; margin: 5px; border-radius: 4px; color: #c62828;">
            <strong>Component Load Error:</strong><br>
            <code>${componentPath}</code><br>
            <small>${error.message}</small>
          </div>
        `;
      }

      return false;
    }
  }

  /**
   * Load multiple components with detailed progress tracking
   * @param {Array} components - Array of {path, target} objects
   */
  async loadComponents(components) {
    this.log(`Starting to load ${components.length} components`);

    const results = [];

    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      this.log(
        `Loading component ${i + 1}/${components.length}: ${component.path}`
      );

      const success = await this.loadComponent(
        component.path,
        component.target
      );
      results.push({ ...component, success });
    }

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.length - successCount;

    this.log(
      `Component loading complete: ${successCount} success, ${failCount} failed`,
      failCount > 0 ? "warning" : "success"
    );

    if (this.errors.length > 0) {
      this.log("Errors encountered:", "error");
      this.errors.forEach((error) => {
        this.log(`  - ${error.componentPath}: ${error.error}`, "error");
      });
    }

    return results;
  }

  /**
   * Check if a component is loaded
   * @param {string} componentPath
   * @returns {boolean}
   */
  isLoaded(componentPath) {
    return this.loadedComponents.has(componentPath);
  }

  /**
   * Get loading statistics
   */
  getStats() {
    return {
      loaded: this.loadedComponents.size,
      errors: this.errors.length,
      loadedComponents: Array.from(this.loadedComponents),
      errors: this.errors,
    };
  }

  /**
   * Test if all component files exist
   */
  async testComponentPaths(components) {
    this.log("Testing component file existence...");

    for (const component of components) {
      try {
        const response = await fetch(component.path, { method: "HEAD" });
        this.log(
          `${component.path}: ${response.ok ? "EXISTS" : "NOT FOUND"}`,
          response.ok ? "success" : "error"
        );
      } catch (error) {
        this.log(`${component.path}: ERROR - ${error.message}`, "error");
      }
    }
  }
}

export default ComponentLoader;
