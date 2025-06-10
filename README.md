# Axis Imaging - Medical Radiology Website

A modern, responsive website for Axis Imaging, a medical radiology clinic specializing in CT scans, X-rays, ultrasounds, DEXA scans, and other diagnostic imaging services.

## 🚀 Live Demo

[View Live Website](https://github.com/hasanaxis/axis-imaging)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages)
- [Components](#components)
- [Responsive Design](#responsive-design)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modular Architecture** - Component-based structure for easy maintenance
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Service Pages** - Detailed information about medical imaging services
- **Interactive Elements** - FAQ sections, service cards, and navigation
- **Mobile Menu** - Collapsible navigation for mobile devices
- **Scroll Effects** - Header hide/show on scroll and smooth animations
- **Accessibility** - Semantic HTML and keyboard navigation support

## 🛠 Technologies Used

- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Grid, Flexbox, animations, and responsive design
- **Vanilla JavaScript** - ES6+ modules and modern JavaScript features
- **Component Architecture** - Modular, reusable components
- **CSS Variables** - Consistent theming and easy customization

## 📁 Project Structure

```
axis-imaging/
├── index.html                 # Homepage
├── services.html             # Services page
├── assets/
│   ├── css/
│   │   ├── main.css         # Global styles and variables
│   │   └── services.css     # Services page specific styles
│   ├── js/
│   │   ├── main.js          # Homepage entry point
│   │   ├── services-main.js # Services page entry point
│   │   ├── classes/
│   │   │   ├── AxisImagingApp.js
│   │   │   └── ServicesApp.js
│   │   ├── components/
│   │   │   ├── MobileMenu.js
│   │   │   ├── FAQ.js
│   │   │   ├── DiagnosticServices.js
│   │   │   └── [other components]
│   │   └── utils/
│   │       ├── ComponentLoader.js
│   │       ├── EventManager.js
│   │       └── DOMHelpers.js
│   └── images/
│       ├── logos/
│       ├── services/
│       └── [other image folders]
└── components/
    ├── header.html
    ├── footer.html
    ├── hero.html
    ├── faq.html
    └── services/
        ├── services-hero.html
        └── services-overview.html
```

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/hasanaxis/axis-imaging.git
   cd axis-imaging
   ```

2. **Start a local server**

   Using Python:

   ```bash
   python -m http.server 8000
   ```

   Using Node.js (live-server):

   ```bash
   npx live-server
   ```

   Using VS Code Live Server extension or any other local server

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 💻 Usage

### Development

The website uses a modular component system:

1. **HTML Components** - Stored in `/components/` folder
2. **JavaScript Modules** - ES6 modules with component classes
3. **CSS Organization** - Global styles in `main.css`, page-specific in separate files

### Adding New Components

1. Create HTML file in `/components/`
2. Create corresponding JavaScript class in `/assets/js/components/`
3. Add component to the main app initialization
4. Include component styles in CSS files

### Customization

- **Colors**: Update CSS variables in `main.css`
- **Typography**: Modify font imports and CSS font properties
- **Layout**: Adjust grid and flexbox properties
- **Content**: Update HTML files and component data

## 📱 Pages

### Homepage (`index.html`)

- Hero section with clinic introduction
- Service overview cards
- Features and benefits
- Booking process steps
- FAQ section
- Contact information

### Services (`services.html`)

- Service hero section
- Detailed service descriptions
- Alternating layout design
- Call-to-action sections

## 🧩 Components

### Core Components

- **Header** - Navigation with mobile menu
- **Hero** - Main banner sections
- **FAQ** - Expandable question/answer sections
- **DiagnosticServices** - Interactive service cards
- **MobileMenu** - Responsive navigation menu

### Utility Classes

- **ComponentLoader** - Dynamic HTML component loading
- **EventManager** - Event listener management
- **DOMHelpers** - DOM manipulation utilities

## 📱 Responsive Design

- **Mobile First** - Designed for mobile devices first
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Friendly** - Optimized for touch interactions
- **Performance** - Optimized images and efficient loading

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Color Scheme

```css
:root {
  --axis-royal-blue: #262262;
  --axis-magenta: #ec008c;
  --axis-charcoal: #333333;
  --axis-light-purple: #b8006b;
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📞 Contact

**Axis Imaging**

- Website: [www.axisimaging.com.au](https://www.axisimaging.com.au)
- Phone: (03) 9999 0000
- Email: info@axisimaging.com.au

---

**Built with ❤️ for Axis Imaging**
