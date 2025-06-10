/**
 * Application constants and configuration
 * Extracted from your original scripts.js
 */

// Step content data for desktop booking process
export const STEP_DATA = {
  1: {
    title: "Get Your Referral",
    description:
      "Visit your GP or specialist to obtain a referral for your imaging needs. Our team can help coordinate with your doctor to ensure you get the right scan.",
    image: "assets/images/gallery/Group 8.png",
    alt: "Doctor consultation for referral",
  },
  2: {
    title: "Book an Appointment",
    description:
      "Call us or use our convenient online booking system to schedule your appointment. We offer flexible scheduling to fit your busy lifestyle.",
    image: "assets/images/process/booking-step.png", // You'll need to create this image
    alt: "Booking appointment online",
  },
  3: {
    title: "We'll guide you through the rest",
    description:
      "Our experienced technologists will guide you through your scan, ensuring you're comfortable throughout the process. Results are typically available within 24 hours.",
    image: "assets/images/process/scan-step.png", // You'll need to create this image
    alt: "Medical technologist guiding patient",
  },
};

// Mobile booking carousel data (4 steps)
export const MOBILE_STEP_DATA = {
  1: {
    title: "Get Your Referral",
    description:
      "Visit your GP or specialist to obtain a referral for your imaging needs. Our team can help coordinate with your doctor to ensure you get the right scan.",
    image: "assets/images/gallery/Group 8.png",
    alt: "Doctor consultation for referral",
  },
  2: {
    title: "Book an Appointment",
    description:
      "Call us or use our convenient online booking system to schedule your appointment. We offer flexible scheduling to fit your busy lifestyle.",
    image: "assets/images/process/booking-step.png", // You'll need to create this image
    alt: "Booking appointment online",
  },
  3: {
    title: "Attend Your Scan",
    description:
      "We'll guide you from arrival to results with comfort and care. Our experienced technologists ensure you're comfortable throughout the process.",
    image: "assets/images/process/scan-step.png", // You'll need to create this image
    alt: "Patient attending scan",
  },
  4: {
    title: "Receive Reports",
    description:
      "Your doctor receives detailed results within 24 hours. Results are typically available fast for quick review and next steps.",
    image: "assets/images/process/report-step.png", // You'll need to create this image
    alt: "Receiving medical reports",
  },
};

// Application configuration
export const CONFIG = {
  // Mobile booking carousel settings
  TOTAL_MOBILE_STEPS: 4,
  AUTO_ADVANCE_INTERVAL: 5000, // 5 seconds
  SWIPE_THRESHOLD: 50,

  // Services carousel settings
  SERVICES_AUTO_ADVANCE: false,
  SERVICES_ADVANCE_INTERVAL: 3000,

  // Responsive breakpoints
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1200,

  // Animation settings
  TRANSITION_DURATION: 300,
  FADE_DURATION: 150,
  RESIZE_DEBOUNCE: 250,
  SCROLL_THROTTLE: 50,

  // Booking system settings
  BOOKING_URL: "https://your-booking-system.com", // Replace with actual URL
  PHONE_NUMBER: "03 000 00",
  IS_TEST_MODE: true, // Set to false in production

  // Analytics settings
  TRACK_INTERACTIONS: true,
  TRACK_SCROLL_DEPTH: true,

  // Accessibility settings
  FOCUS_OUTLINE_COLOR: "#EC008C",
  FOCUS_OUTLINE_WIDTH: "2px",
  FOCUS_OUTLINE_OFFSET: "2px",
};

// Color palette (matching CSS variables)
export const COLORS = {
  AXIS_MAGENTA: "#EC008C",
  AXIS_LIGHT_PURPLE: "#B41E8E",
  AXIS_DARK_PURPLE: "#662D91",
  AXIS_ROYAL_BLUE: "#262262",
  AXIS_CHARCOAL: "#3C4247",
  AXIS_GREY_MID: "#606A70",
  AXIS_GREY_LIGHT: "#C4CED4",
  AXIS_GREEN: "#00A496",
  AXIS_BLUE: "#006CB3",
};

// Image paths configuration
export const IMAGE_PATHS = {
  LOGOS: {
    MAIN: "assets/images/logos/AXIS_LOGO_COLOUR-CMYK.png",
    FOOTER: "assets/images/logos/Group 4.png",
  },
  HERO: {
    MOBILE: "assets/images/hero/mobile-hero.png",
    DESKTOP: "assets/images/hero/Hero.png",
  },
  ICONS: {
    HAND: "assets/images/icons/hand.png",
    ARROW: "assets/images/icons/arrow.png",
    DOLLAR: "assets/images/icons/dollar.png",
    CIRCULAR_ARROW: "assets/images/icons/circular-arrow.png",
    DOLLAR_CIRCLE: "assets/images/icons/dollar-circle.png",
    PARKING: "assets/images/icons/parking.png",
    PHONE: "assets/images/icons/Frame.png",
    MAIL: "assets/images/icons/Frame-1.png",
    MAP: "assets/images/icons/Frame-2.png",
  },
  SERVICES: {
    CT_SCAN: "assets/images/services/Frame 16.png",
    X_RAY: "assets/images/services/Frame 14.png",
    ULTRASOUND: "assets/images/services/Frame 13.png",
    DEXA: "assets/images/services/Frame 15.png",
  },
  GALLERY: {
    PATIENT_CONSULTATION: "assets/images/gallery/patient-consultation.png",
    DOCTOR_WORKSTATION: "assets/images/gallery/doctor-workstation.png",
    CTA_IMAGE: "assets/images/gallery/Group 6.png",
    BOOKING_MAIN: "assets/images/gallery/Group 8.png",
  },
  PROCESS: {
    BOOKING_STEP: "assets/images/process/booking-step.png",
    SCAN_STEP: "assets/images/process/scan-step.png",
    REPORT_STEP: "assets/images/process/report-step.png",
  },
};

// FAQ categories and structure
export const FAQ_CATEGORIES = [
  "general",
  "ct-scan",
  "x-ray",
  "ultrasound",
  "dexa",
];

// Services configuration
export const SERVICES = [
  {
    id: "ct-scan",
    name: "CT-Scan",
    image: IMAGE_PATHS.SERVICES.CT_SCAN,
    description: "Detailed cross-sectional imaging for accurate diagnosis",
  },
  {
    id: "x-ray",
    name: "X-Ray",
    image: IMAGE_PATHS.SERVICES.X_RAY,
    description: "Quick and effective imaging for bones and organs",
  },
  {
    id: "ultrasound",
    name: "Ultrasound",
    image: IMAGE_PATHS.SERVICES.ULTRASOUND,
    description: "Safe, non-invasive imaging using sound waves",
  },
  {
    id: "dexa",
    name: "DEXA",
    image: IMAGE_PATHS.SERVICES.DEXA,
    description: "Bone density scanning for osteoporosis detection",
  },
];

// Animation easing functions
export const EASING = {
  EASE_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
  EASE_IN: "cubic-bezier(0.4, 0, 1, 1)",
  EASE_IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
  BOUNCE: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

// Event names for custom events
export const EVENTS = {
  MODE_CHANGE: "modeChange",
  BOOKING_CLICK: "bookingClick",
  SERVICE_FOCUS: "serviceFocus",
  STEP_CHANGE: "stepChange",
  FAQ_TOGGLE: "faqToggle",
  APP_READY: "axisImagingReady",
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_MODE: "axis_user_mode",
  LAST_VISIT: "axis_last_visit",
  FAQ_EXPANDED: "axis_faq_expanded",
};

// API endpoints (when you have a backend)
export const API_ENDPOINTS = {
  BOOKING: "/api/booking",
  CONTACT: "/api/contact",
  SERVICES: "/api/services",
  FAQ: "/api/faq",
};

// Validation patterns
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+61|0)[2-9]\d{8}$/,
  POSTCODE: /^\d{4}$/,
};

// Default export for easy importing
export default {
  STEP_DATA,
  MOBILE_STEP_DATA,
  CONFIG,
  COLORS,
  IMAGE_PATHS,
  FAQ_CATEGORIES,
  SERVICES,
  EASING,
  EVENTS,
  STORAGE_KEYS,
  API_ENDPOINTS,
  VALIDATION,
};
