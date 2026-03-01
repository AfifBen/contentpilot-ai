# ContentPilot AI - Spécifications Techniques

## 📋 Vue d'Ensemble

**Nom du Projet :** ContentPilot AI  
**Version :** 1.0.0 (MVP)  
**Type :** Micro-SaaS Web App  
**Objectif :** Transformer un contenu unique en multiples formats pour réseaux sociaux via IA

---

## 🎯 Fonctionnalités MVP

### Core Features (Must Have)

1. **Input de Contenu**
   - Zone de texte pour coller du contenu brut
   - Option : URL d'article de blog (fetch automatique)
   - Option : Upload fichier (.txt, .md)

2. **Génération IA Multi-Formats**
   - 🐦 **Twitter/X** : 5 tweets ou 1 thread (280 caractères chacun)
   - 💼 **LinkedIn** : 3 posts professionnels (150-300 mots)
   - 📧 **Newsletter** : 1 email structuré (titre, intro, corps, CTA)
   - 📸 **Instagram** : 3 captions avec hashtags (100-200 mots)

3. **Interface Utilisateur**
   - Dashboard simple et clean
   - Affichage des résultats par onglets (Twitter, LinkedIn, etc.)
   - Bouton "Copier" pour chaque output
   - Bouton "Tout exporter" (.txt ou .json)

4. **Gestion des Prompts IA**
   - Prompts optimisés par plateforme
   - Possibilité de personnaliser le ton (pro, casual, fun)

---

## 🏗️ Architecture Technique

### Stack Recommandée

```
Frontend:
├── React 18+ (Vite)
├── TailwindCSS
├── Shadcn/UI (composants)
└── React Query (state management)

Backend:
├── Node.js 20+
├── Express.js
├── CORS enabled
└── API RESTful simple

IA:
├── OpenAI API (gpt-4o-mini ou gpt-3.5-turbo)
├── OU Anthropic Claude (claude-3-haiku)
└── Abstraction layer pour switch facile

Deploy:
├── Frontend : Vercel (gratuit)
├── Backend : Railway/Render (gratuit)
└── Env vars : .env.local
```

### Structure du Repo

```
contentpilot-ai/
├── README.md
├── LICENSE (MIT)
├── .gitignore
├── .env.example
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── components/
│       │   ├── InputSection.jsx
│       │   ├── OutputTabs.jsx
│       │   ├── ExportButton.jsx
│       │   └── ToneSelector.jsx
│       ├── hooks/
│       │   └── useContentGeneration.js
│       └── utils/
│           └── api.js
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   │   └── generate.js
│   ├── services/
│   │   ├── aiService.js
│   │   └── contentParser.js
│   └── prompts/
│       ├── twitter.js
│       ├── linkedin.js
│       ├── newsletter.js
│       └── instagram.js
└── docs/
    ├── API.md
    └── DEPLOYMENT.md
```

---

## 🔌 API Endpoints

### POST /api/generate

**Request:**
```json
{
  "content": "texte brut ou URL",
  "contentType": "text|url",
  "tone": "professional|casual|fun",
  "platforms": ["twitter", "linkedin", "newsletter", "instagram"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "twitter": ["tweet 1", "tweet 2", ...],
    "linkedin": ["post 1", "post 2", "post 3"],
    "newsletter": { "title": "...", "body": "..." },
    "instagram": ["caption 1", "caption 2", "caption 3"]
  },
  "usage": {
    "tokens": 1500,
    "model": "gpt-4o-mini"
  }
}
```

---

## 🎨 Design System

### Couleurs
- Primary: `#6366f1` (Indigo)
- Background: `#ffffff` / `#0f172a` (dark mode)
- Accent: `#10b981` (Emerald pour CTAs)

### Typographie
- Headings: Inter Bold
- Body: Inter Regular
- Code: JetBrains Mono

### Composants Clés
- Input : Grande textarea avec compteur de mots
- Tabs : Navigation horizontale par plateforme
- Cards : Output dans des cards avec shadow
- Buttons : "Copier", "Régénérer", "Exporter"

---

## 📊 Modèle Économique (Futur)

| Plan | Prix | Limites |
|------|------|---------|
| Free | $0 | 5 générations/mois |
| Pro | $9/mois | 50 générations/mois |
| Business | $29/mois | Illimité + API access |

---

## ✅ Critères de Succès MVP

- [ ] Génère du contenu pour 4 plateformes
- [ ] Temps de réponse < 10 secondes
- [ ] UI responsive (mobile + desktop)
- [ ] 100% fonctionnel sans authentification (MVP)
- [ ] Code documenté sur GitHub
- [ ] README clair avec setup instructions

---

## 🚀 Roadmap Post-MVP

**v1.1** : Authentification utilisateur + historique  
**v1.2** : Templates personnalisables  
**v1.3** : Intégration directe (buffer, Hootsuite)  
**v2.0** : Versioning + A/B testing des outputs

---

## 📝 Notes pour Coder

1. **Priorité :** Fonctionnel > Parfait
2. **Code :** Clean, commenté, modulaire
3. **Tests :** Unit tests sur les fonctions critiques
4. **Sécurité :** Sanitize inputs, rate limiting basique
5. **Performance :** Lazy loading, cache si possible

---

## 📞 Contact Chef de Projet

**Ana** - Chef de projet  
En cas de question ou blocage, je suis disponible via sessions_send.

---

*Dernière mise à jour : 27 Février 2026*
