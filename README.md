# 💼 BenefitsMax — Workplace Benefits Maximizer

> The average employee leaves **$1,400 in benefits** unclaimed every year. BenefitsMax helps you discover, understand, and claim every dollar you're entitled to.

## ✨ Features

- **📊 Benefits Dashboard** — Visual overview of all 15 benefits with usage progress bars
- **🔍 Smart Filtering & Sorting** — Filter by status (unused/partial/maximized), sort by value
- **📋 Benefit Detail Modals** — Full claim instructions, deadlines, and resource links
- **💬 AI Chat Assistant** — Keyword-matching chatbot with detailed, actionable advice
- **🧙 Onboarding Wizard** — 4-step personalized setup with estimated value calculation
- **✅ Claim Tracking** — Mark benefits as claimed, updates persist in session
- **📱 Fully Responsive** — Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Running

```bash
# Install all dependencies (root + backend + frontend)
npm run install:all

# Start both servers concurrently
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

### Individual Setup

```bash
# Backend only
cd backend && npm install && npm run dev

# Frontend only
cd frontend && npm install && npm run dev
```

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, TypeScript, Vite          |
| Styling    | Tailwind CSS 3                      |
| Backend    | Node.js, Express, TypeScript        |
| State      | React useState/useMemo (client)     |
| Data       | In-memory seed data (no DB needed)  |

## 📡 API Endpoints

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | /api/benefits         | List all 15 benefits           |
| GET    | /api/benefits/:id     | Get single benefit             |
| PATCH  | /api/benefits/:id/claim | Mark benefit as claimed      |
| GET    | /api/user/profile     | Get user profile               |
| POST   | /api/chat             | Send message to AI assistant   |
| GET    | /api/health           | Health check                   |

## 📁 Project Structure

```
csc165/
├── package.json              # Root scripts (concurrently)
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express app entry point
│   │   ├── data/
│   │   │   ├── benefits.ts   # 15 benefit seed records
│   │   │   └── user.ts       # User profile data
│   │   └── routes/
│   │       ├── benefits.ts   # Benefits CRUD routes
│   │       ├── user.ts       # User profile route
│   │       └── chat.ts       # AI chatbot route
│   ├── tsconfig.json
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.tsx            # Root component
    │   ├── main.tsx           # React entry point
    │   ├── index.css          # Tailwind + custom CSS
    │   ├── types/index.ts     # TypeScript interfaces
    │   └── components/
    │       ├── Header.tsx         # Top navigation bar
    │       ├── Dashboard.tsx      # Main benefits grid
    │       ├── BenefitCard.tsx    # Individual benefit card
    │       ├── BenefitDetail.tsx  # Modal with full details
    │       ├── ChatBot.tsx        # Floating AI chat widget
    │       └── OnboardingWizard.tsx # 4-step setup flow
    ├── index.html
    ├── vite.config.ts
    ├── tailwind.config.js
    └── package.json
```

## 🎭 Demo

**Pre-filled demo user:**
- Name: Alex Johnson
- Company: TechCorp Inc.
- Role: Software Engineer
- Salary: $80,000–$100,000
- Unclaimed benefits: ~$22,460

**Try the chatbot with:**
- "What am I missing?"
- "How do I maximize my 401k?"
- "Explain my FSA vs HSA"
- "Remote work stipend help"
