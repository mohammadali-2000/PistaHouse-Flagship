# 👑 Pista House | The Royal Taste of Hyderabad • Flagship Experience

> An ultra-luxury, high-performance digital flagship experience celebrating 25+ years of royal Hyderabadi culinary legacy — from world-renowned GI-Tagged Haleem to Zafrani Dum Biryani and authentic Osmania biscuits.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-gold?style=for-the-badge&logo=github)](https://mohammadali-2000.github.io/PistaHouse-Flagship/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP 3](https://img.shields.io/badge/Animations-GSAP%203-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

🌐 **Live Experience**: [https://mohammadali-2000.github.io/PistaHouse-Flagship/](https://mohammadali-2000.github.io/PistaHouse-Flagship/)

---

## 🌟 Overview

**Pista House Flagship** is a state-of-the-art web flagship built from the ground up to represent the majesty and heritage of Hyderabad's most iconic culinary brand. 

Instead of an ordinary e-commerce storefront, this project treats food as haute cuisine and heritage art — combining 60 FPS cinematic motion, bespoke ambient sound synthesis, interactive physics, and luxury typographic design inspired by Nizami architecture.

---

## ✨ Key Features & Technical Highlights

### 🏛️ 1. Royal Preloader Curtain
- Dynamic percentage loader with Charminar vector emblem and animated progress bar.
- Silky ease-out curtain reveal powered by GSAP timeline transitions directly into the hero experience.

### 🎵 2. Web Audio Ambient Sitar Drone (`RoyalAmbienceSynth`)
- Built using native Web Audio API oscillators without heavy external audio files.
- Generates an authentic Indian pentatonic drone (*Sa, Pa, Sa'* at 138.59 Hz, 207.65 Hz, 277.18 Hz, 415.30 Hz) with gentle low-frequency oscillation (LFO) vibrato for rich ambiance.
- Safe interactive mute/play toggle with audio context suspension handling.

### 🌿 3. Interactive Spice Particles Canvas
- High-performance HTML5 Canvas rendering ambient culinary particles (cardamom pods, saffron threads, star anise, golden embers, and roasted cloves).
- Natural floating physics with wind turbulence, mouse interaction repulsion, and alpha oscillation.

### 🃏 4. 3D Card Tilt & Dynamic Cursor
- Pure mathematical 3D perspective transforms responding to mouse coordinates.
- Specular holographic light sheen that follows the pointer across product cards.
- Custom luxury cursor with trailing follower ring and hover state magnification.

### 📜 5. Lenis Smooth Momentum Scrolling & GSAP Parallax
- Powered by Lenis for butter-smooth momentum-based inertia scrolling.
- Deep ScrollTrigger integration controlling navbar elevation, sticky menu categorization, text split reveals, and floating dish depth parallax.

### 🛍️ 6. Full Luxury Cart & Multi-Currency Engine
- Global reactive cart state with persistent localStorage sync.
- Real-time currency converter supporting **₹ INR, $ USD, د.إ AED, £ GBP, and ﷼ SAR**.
- Dynamic shipping tiers, luxury packaging toggles, and celebratory `canvas-confetti` bursts on checkout.

### 📱 7. Full Responsive Redesign & Mobile Drawer
- Bespoke slide-out Nizami navigation drawer on mobile and tablet screens.
- Zero horizontal overflow guarantee across all viewport sizes (from 320px mobile to 4K ultrawide).

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Build Tool** | [Vite 6](https://vitejs.dev/) | Sub-millisecond HMR, optimized tree-shaken bundling |
| **Scripting** | Modern ES Modules (Vanilla JavaScript) | High-speed DOM manipulation without framework overhead |
| **Styling** | Vanilla CSS3 + CSS Custom Properties | Modular token architecture, Glassmorphism, BEM conventions |
| **Motion & Scroll** | [GSAP 3](https://greensock.com/gsap/) + [Lenis](https://lenis.darkroom.engineering/) | 60 FPS timeline animations and inertial smooth scrolling |
| **Audio** | Native Web Audio API | Client-side harmonic drone synthesis |
| **Effects** | HTML5 Canvas + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Real-time particle simulation & celebration FX |
| **Deployment** | GitHub Actions + GitHub Pages | Automated zero-downtime CI/CD pipeline |

---

## 📂 Project Structure

```
PistaHouse-Flagship/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD pipeline
├── dist/                       # Production build output
├── public/                     # Static assets and media
├── src/
│   ├── scripts/
│   │   ├── 3d-card-tilt.js     # 3D perspective tilt & custom mouse cursor
│   │   ├── cart-state.js       # Cart state machine, currency & item calculations
│   │   ├── gsap-animations.js  # GSAP timelines & ScrollTrigger setup
│   │   ├── lenis-smooth.js     # Lenis smooth scrolling coordinator
│   │   ├── main.js             # Application entry point & Web Audio synth
│   │   └── spice-particles.js  # Interactive spice particles canvas simulation
│   └── styles/
│       ├── components.css      # Reusable UI component styling & cards
│       ├── main.css            # Layout, hero section, and responsive rules
│       ├── typography.css      # Fonts, typography hierarchy, and Nizami headings
│       └── variables.css       # Design tokens, color palette, and shadows
├── index.html                  # Semantic, accessible HTML5 structure
├── package.json                # Dependencies and project scripts
├── vite.config.js              # Vite bundler configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohammadali-2000/PistaHouse-Flagship.git
   cd PistaHouse-Flagship
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🚢 Continuous Deployment (GitHub Actions)

This repository includes a native GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that:
1. Triggers automatically on every `push` to the `main` branch.
2. Checks out the code and sets up Node.js 20.
3. Installs dependencies and runs `npm run build`.
4. Deploys the generated `dist/` directory to **GitHub Pages** seamlessly with zero configuration required.

---

## 👤 Author

**Syed Mohammad Ali**
- **GitHub**: [@mohammadali-2000](https://github.com/mohammadali-2000)
- **LinkedIn**: [syed-mohammad-ali-206050215](https://www.linkedin.com/in/syed-mohammad-ali-206050215/)
- **Telegram**: [@AliXDevs](https://t.me/AliXDevs)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
