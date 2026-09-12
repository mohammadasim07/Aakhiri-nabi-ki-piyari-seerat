# Aakhri Nabi Ki Pyari Seerat (آخری نبی ﷺ کی پیاری سیرت)

**An Interactive, Trilingual, Offline Progressive Web App (PWA)**  
**Developer:** Mohammad Asim  
**Contact:** asim.lpu07@gmail.com  
**Original Book Publication:** Maktaba-tul-Madinah (Dawat-e-Islami)

---

## Overview

A mobile-first Islamic digital web application covering three complete editions of the renowned biographical work on the Beloved Final Messenger of Allah, Prophet Muhammad ﷺ:
1. **Urdu Edition (آخری نبی کی پیاری سیرت)** — 147 pages
2. **Hindi Edition (आखि़री नबी की प्यारी सीरत)** — 147 pages
3. **English Edition (The Sublime Biography of the Final Messenger of Allah ﷺ)** — 166 pages

---

## Key Features

- **100% Offline Progressive Web App (PWA)**:
  - Powered by custom Service Worker with Cache-First strategies.
  - Installable to home screens on Android, iPhone, and Windows PC.
  - One-click batch offline caching for all 466 book pages.
- **Interactive Dual & Single Reader**:
  - Compare Urdu and English side-by-side or read in immersive single page mode.
  - Smooth page navigation, zooming, full-screen, and thumbnail drawer.
  - Touch swipe gestures tailored for mobile devices.
- **Reading Progress Tracking**:
  - Automatically records pages read and displays overall completion percentages.
  - Tracks reading streak and active reading time.
  - 13 chapter-by-chapter completion checklist.
- **Chapter-Wise Seerat Quiz**:
  - Comprehensive quizzes across all 13 chapters in Urdu, Hindi, and English.
  - Instant answer validation, detailed explanations, and direct book page references.
- **Chronological Timeline (571 - 632 CE)**:
  - Major milestones from the blessed birth in 571 CE to the noble passing in 632 CE.
- **Shamail Explorer**:
  - Beautiful cards detailing the blessed physical traits, character, and sublime manners of the Prophet ﷺ.
- **Digital Tasbih (Salawat) Counter**:
  - Tactile, gentle bead click sound synthesis on tap with haptic mobile vibration.
- **3 Official PDF Downloads**:
  - Download original Maktaba-tul-Madinah publication PDFs for offline archival.

---

## Technologies Used

- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS with emerald and gold theme tokens (Light, Sepia, Midnight Dark)
- **Icons**: Lucide Icons
- **PDF Processing**: PyMuPDF (140 DPI vector rasterization)
- **PWA**: Service Worker Cache API + Web App Manifest

---

## Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/mohammadasim07/aakhiri-nabi-ki-piyari-seerat.git

# Navigate to project directory
cd aakhiri-nabi-ki-piyari-seerat

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

## Author & Developer

- **Developer:** Mohammad Asim
- **GitHub:** [@mohammadasim07](https://github.com/mohammadasim07)
- **Email:** asim.lpu07@gmail.com
