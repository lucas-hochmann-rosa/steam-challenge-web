# 🧮 Number Challenge

<p align="center">
  <a href="https://github.com/lucas-hochmann-rosa/steam-challenge-web">
    <img src="https://img.shields.io/badge/GitHub-steam--challenge--web-181717?style=for-the-badge&logo=github">
  </a>
  <a href="https://www.linkedin.com/in/lucas-hochmann-rosa">
    <img src="https://img.shields.io/badge/LinkedIn-Lucas_Hochmann_Rosa-0A66C2?style=for-the-badge&logo=linkedin">
  </a>
  <a href="#-technologies-used">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111">
  </a>
  <a href="#-technologies-used">
    <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-2ea44f?style=for-the-badge">
  </a>
</p>

<p align="center"><a href="README.md">🇧🇷 Português</a> · 🇺🇸 English</p>

> Interactive mathematical logic experience created for the **2026 STEAM Fair** at Escola SESI Chapecó.

---

## ⚡ Quick Start

```bash
git clone https://github.com/lucas-hochmann-rosa/steam-challenge-web.git
cd steam-challenge-web
npm install
npm run dev
```

To build and preview the production version:

```bash
npm run build
npm start
```

---

## 📌 Overview

**Number Challenge** is an educational website/game built for an in-person presentation. The experience guides visitors through an initial math trick and then unlocks reasoning challenges in three levels: number sequence, expression building, and logic password.

The project was developed by **Lucas Hochmann Rosa**. **Augusto Belini Gasparetto** and **Maria Paula Rossetti Siqueira** are part of the 2026 STEAM Fair presentation group.

---

## ✨ Main Features

- Guided math trick with reveal and algebraic explanation.
- Three challenge modes: easy, medium, and hard.
- Timer with target time per difficulty.
- Answer validation and attempt flow with or without prize eligibility.
- Responsive interface for desktop, tablet, and mobile.
- Sound feedback through the Web Audio API, with a button to enable or disable sounds.
- Visual assets from Escola SESI and the group members.

---

## 🧭 Table of Contents

- [Architecture](#-architecture)
- [Module Map](#-module-map)
- [Technologies used](#-technologies-used)
- [Experience Flow](#-experience-flow)
- [Project Construction Rules](#-project-construction-rules)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Environment Configuration](#-environment-configuration)
- [Usage](#-usage)
- [Deployment](#-deployment)
- [Disclaimer](#-disclaimer)
- [License](#-license)
- [Author](#-author)

---

## 🏗️ Architecture

```text
steam-challenge-web/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── public/
│   ├── augusto.png
│   ├── escola-sesi.svg
│   ├── logo-escola-sesi.png
│   ├── lucas.jpg
│   ├── maria.jpg
│   └── math-icons/
│       ├── abaco.png
│       ├── calculadora.png
│       ├── dados.png
│       ├── grafico.png
│       └── operacoes.png
└── src/
    ├── main.jsx
    └── styles.css
```

---

## 🗺️ Module Map

| File | Purpose |
| ------ | ------ |
| `index.html` | HTML entry point and page metadata. |
| `src/main.jsx` | React application, screens, state, and challenge rules. |
| `src/styles.css` | Styles exported from the original experience. |
| `public/` | Images and icons served directly by the browser. |
| `vite.config.js` | Vite configuration, including automatic base path for GitHub Pages. |
| `vercel.json` | Build and output configuration for Vercel deployment. |
| `.github/workflows/deploy-pages.yml` | Automatic GitHub Pages publishing from the `main` branch. |

---

## 🧰 Technologies used

**Interface:** React 19.

**Build:** Vite 7.

**Language:** JavaScript with ES Modules.

**Icons:** Lucide React.

**Audio:** Web Audio API.

---

## 🎲 Experience Flow

The experience starts with a guided math trick. The participant chooses a number, follows simple operations, and reaches the result 7. After that, the app shows the algebraic reason behind the trick and unlocks three difficulty levels:

| Level | Flow | Target time |
| --- | --- | --- |
| Easy | Complete a number sequence. | 30 seconds |
| Medium | Build an expression using every number. | 60 seconds |
| Hard | Solve clues to open a numeric vault. | 90 seconds |

---

## 📐 Project Construction Rules

- Identifiers, functions, states, and file structure are written in English.
- Interface text and documentation are written in Portuguese.
- Code comments are written in Portuguese and reserved for non-obvious decisions - the "why", not the "what".
- The local version preserves the look and flow of the original exported version.
- Development authorship belongs to **Lucas Hochmann Rosa**; the other members appear as part of the presentation group, without code authorship responsibility.

---

## ⚙️ Requirements

- Node.js 20 or newer
- npm 10 or newer

---

## 🚀 Installation

```bash
npm install
```

---

## 🔐 Environment Configuration

This project does not use environment variables. The application runs entirely in the browser.

---

## ▶️ Usage

Development server:

```bash
npm run dev
```

Full check:

```bash
npm run check
```

Production build:

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Vercel

The `vercel.json` file already defines:

| Field | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework | `vite` |

### GitHub Pages

The `.github/workflows/deploy-pages.yml` workflow publishes the `dist` folder when there is a push to the `main` branch.

Expected address after deployment:

```text
https://lucas-hochmann-rosa.github.io/steam-challenge-web/
```

On GitHub, the page should use **GitHub Actions** as the Pages source.

---

## ⚠️ Disclaimer

This project was created for a school presentation and does not represent an official Escola SESI page. Institutional logos and images appear only in the context of the 2026 STEAM Fair project.

The `dist/` directory is generated by the build and should not be committed.

---

## 📄 License

Licensed under MIT. Feel free to use, modify, and distribute, while keeping the copyright notice and crediting **Lucas Hochmann Rosa**.

---

## 👨‍💻 Author

**Lucas Hochmann Rosa**

- Repository: <https://github.com/lucas-hochmann-rosa/steam-challenge-web>
- GitHub: <https://github.com/lucas-hochmann-rosa>
- LinkedIn: <https://www.linkedin.com/in/lucas-hochmann-rosa>
- Email: <hrlucas.dev@gmail.com>

Presentation group: Lucas Hochmann Rosa, Augusto Belini Gasparetto, and Maria Paula Rossetti Siqueira.

---
