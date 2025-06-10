import { EventManager } from "../utils/EventManager.js";

/**
 * Booking Steps Component
 */
export class BookingSteps {
  constructor() {
    this.currentStep = 1;
    this.maxSteps = 3;
    this.eventManager = new EventManager();

    this.stepData = {
      1: {
        title: "Get Your Referral",
        description:
          "Located in the booming Merrifield precinct of Mickleham. The very first Radiology clinic in the suburb.",
        image: "assets/images/gallery/Group 8.png",
      },
      2: {
        title: "Book an Appointment",
        description:
          "Call us or book online through our simple booking system. We'll find a time that works for you.",
        image: "assets/images/gallery/Group 6.png",
      },
      3: {
        title: "We'll guide you through the rest",
        description:
          "Our friendly team will take care of everything else. Just arrive 15 minutes early and we'll handle the rest.",
        image: "assets/images/gallery/patient-consultation.png",
      },
    };
  }

  init() {
    this.attachListeners();
    this.updateSteps();
    console.log("📋 Booking Steps initialized");
  }

  attachListeners() {
    // Next step buttons
    const nextButtons = document.querySelectorAll(".step-next, .next-step");
    nextButtons.forEach((button) => {
      this.eventManager.addEventListener(button, "click", () =>
        this.nextStep()
      );
    });

    // Previous step buttons
    const prevButtons = document.querySelectorAll(".step-prev, .prev-step");
    prevButtons.forEach((button) => {
      this.eventManager.addEventListener(button, "click", () =>
        this.prevStep()
      );
    });

    // Direct step navigation
    const stepButtons = document.querySelectorAll(".step-button");
    stepButtons.forEach((button, index) => {
      this.eventManager.addEventListener(button, "click", () =>
        this.goToStep(index + 1)
      );
    });
  }

  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      this.updateSteps();
      console.log(`➡️ Next step: ${this.currentStep}`);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateSteps();
      console.log(`⬅️ Previous step: ${this.currentStep}`);
    }
  }

  goToStep(step) {
    if (step >= 1 && step <= this.maxSteps) {
      this.currentStep = step;
      this.updateSteps();
      console.log(`🎯 Jump to step: ${this.currentStep}`);
    }
  }

  updateSteps() {
    // Update step indicators
    const stepIndicators = document.querySelectorAll(".process-step, .step");
    stepIndicators.forEach((indicator, index) => {
      const stepNumber = index + 1;
      indicator.classList.toggle("active", stepNumber === this.currentStep);
      indicator.classList.toggle("completed", stepNumber < this.currentStep);
    });

    // Update step content
    const currentStepData = this.stepData[this.currentStep];
    if (currentStepData) {
      this.updateStepContent(currentStepData);
    }

    // Update pagination dots
    const dots = document.querySelectorAll(".pagination-dots .dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index + 1 === this.currentStep);
    });

    // Update step content visibility
    const stepContents = document.querySelectorAll(".step-content");
    stepContents.forEach((content, index) => {
      content.classList.toggle("active", index + 1 === this.currentStep);
    });

    // Update navigation buttons
    this.updateNavigationButtons();
  }

  updateStepContent(stepData) {
    // Desktop version
    const stepTitle = document.getElementById("step-title");
    const stepDescription = document.getElementById("step-description");
    const stepImage = document.getElementById("step-image");

    if (stepTitle) stepTitle.textContent = stepData.title;
    if (stepDescription) stepDescription.textContent = stepData.description;
    if (stepImage) stepImage.src = stepData.image;

    // Mobile version
    const mobileStepTitle = document.getElementById("mobile-step-title");
    const mobileStepDescription = document.getElementById(
      "mobile-step-description"
    );
    const mobileStepImage = document.getElementById("mobile-step-image");

    if (mobileStepTitle) mobileStepTitle.textContent = stepData.title;
    if (mobileStepDescription)
      mobileStepDescription.textContent = stepData.description;
    if (mobileStepImage) mobileStepImage.src = stepData.image;
  }

  updateNavigationButtons() {
    const prevButtons = document.querySelectorAll(".step-prev, .prev-step");
    const nextButtons = document.querySelectorAll(".step-next, .next-step");

    prevButtons.forEach((btn) => {
      btn.disabled = this.currentStep === 1;
      btn.style.opacity = this.currentStep === 1 ? "0.5" : "1";
    });

    nextButtons.forEach((btn) => {
      btn.disabled = this.currentStep === this.maxSteps;
      btn.style.opacity = this.currentStep === this.maxSteps ? "0.5" : "1";
    });
  }

  getCurrentStep() {
    return this.currentStep;
  }

  destroy() {
    this.eventManager.removeAllListeners();
  }

  // Static methods for global access
  static nextStep() {
    if (window.axisApp?.bookingSteps) {
      window.axisApp.bookingSteps.nextStep();
    }
  }

  static prevStep() {
    if (window.axisApp?.bookingSteps) {
      window.axisApp.bookingSteps.prevStep();
    }
  }
}
