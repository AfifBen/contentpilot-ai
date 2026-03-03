# ContentPilot AI

![GitHub license](https://img.shields.io/github/license/AfifBen/contentpilot-ai) ![GitHub stars](https://img.shields.io/github/stars/AfifBen/contentpilot-ai) ![GitHub issues](https://img.shields.io/github/issues/AfifBen/contentpilot-ai) ![Demo](https://img.shields.io/badge/demo-live-brightgreen)

**Démo :** https://contentpilot-ai.vercel.app/

Transformez un contenu unique en plusieurs formats sociaux (Twitter/X, LinkedIn, Newsletter, Instagram) grâce à l’IA.

## ✨ Features
- Paste text or provide a URL
- Choose tone (professional, casual, fun)
- Generate platform‑specific outputs
- Copy or export all results

## 🧱 Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- IA: Gemini / OpenAI (API compatibles)

## 🚀 Quick Start

### 1) Clone
```bash
git clone https://github.com/AfifBen/contentpilot-ai.git
cd contentpilot-ai
```

### 2) Backend
```bash
cd backend
cp .env.example .env
# set OPENAI_API_KEY in .env
npm install
npm run dev
```

### 3) Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend:  http://localhost:4000

## 🔐 Environment
See `backend/.env.example`:
```bash
AI_PROVIDER=gemini  # or openai
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-1.5-flash-latest
```

## 📦 Scripts
- `npm run dev` (frontend/backend)

## 🗺️ Roadmap
- Auth + history
- Templates
- Direct integrations (Buffer, Hootsuite)

## 🔎 SEO Keywords
content repurposing, AI content generator, micro‑saas, social media automation, LinkedIn post generator, Twitter thread generator, newsletter generator

## 📄 License
MIT — see [LICENSE](LICENSE)
