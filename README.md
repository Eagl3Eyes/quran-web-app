# 🕌 Al-Quran (আল-কুরআন)

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://quranwebapp.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)

An ethereal, museum-quality Quranic experience designed for deep study and spiritual immersion. Built with a modern tech stack and a premium "majestic" Islamic aesthetic.


---

## ✨ Features

*   **🔍 Instant Discovery Search**: A high-speed, universal search engine that finds Surahs and Ayahs as you type. Includes a language toggle for both English and Bengali queries.
*   **🇧🇩 Full Bengali Support**: Beautifully rendered Bengali translations (`bn.bengali`) alongside English (`en.sahih`), searchable and togglable.
*   **🎨 Majestic Islamic UI**: Immersive backgrounds featuring animated geometric patterns, drifting "Noor" (light) particles, and a symbolic Mihrab overlay.
*   **⚙️ Personalized Sanctuaries**: Fully customizable reading experience with adjustable Arabic fonts (Amiri/Noto Naskh), font sizes, and layout preferences.
*   **📱 Responsive Symmetry**: A glassmorphic design that feels premium on everything from high-end desktops to mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org) (App Router), React, Tailwind CSS.
- **Backend**: [Node.js](https://nodejs.org) & [Express](https://expressjs.com).
- **Icons**: [Lucide React](https://lucide.dev).
- **Typography**: Google Fonts (Amiri, Noto Naskh Arabic, Noto Serif Bengali, Inter).
- **Data Architecture**: Real-time proxying to the [AlQuran Cloud API](https://alquran.cloud/api).

---

## 🚀 Getting Started

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Backend Setup
```bash
cd quran-app/backend
npm install
node server.js
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd quran-app/frontend
npm install
npm run dev
```
Open `http://localhost:3000` to witness the experience.

---

## 📖 Project Structure

```text
├── quran-app/
│   ├── backend/        # Express API (Search proxy & Multi-Language weaving)
│   └── frontend/       # Next.js Application (Islamic UI & Settings)
├── .gitignore          # Centralized repository protection
└── README.md           # This majestic document
```

---

## 📝 License

Designed and developed by **Tuhin Al Jobayer**. 
*May this project be a source of guidance and peace.*

---

> "The best among you are those who learn the Quran and teach it." 
