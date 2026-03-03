# ContentPilot AI

Transform one piece of content into multiple social formats (Twitter/X, LinkedIn, Newsletter, Instagram) using AI.

## ✨ Features
- Paste text or provide a URL
- Choose tone (professional, casual, fun)
- Generate platform‑specific outputs
- Copy or export all results

## 🧱 Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- AI: OpenAI‑compatible API

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

## 📄 License
MIT — see [LICENSE](LICENSE)
