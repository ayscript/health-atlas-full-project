# Health Atlas — Frontend

AI-powered, multilingual UI for Health Atlas. Built with Next.js and designed to work with the project backend (FastAPI + Supabase) and the model service (Gradio/Transformers).

## ⭐ Key features

- Chat UI with streaming responses (connects to a model `/chat_api` endpoint)
- Login / Signup pages that integrate with the backend auth endpoints
- Responsive design, voice recorder, and accessibility-focused components
- Built with Next.js, Tailwind CSS and Radix UI primitives

## Tech Stack

- Next.js 16 (app router)
- React 19
- Tailwind CSS, Radix UI
- Supabase (auth handled via backend)

---

## Getting started (local)

### Prerequisites

- Node.js 18+ and npm (or pnpm)

### Install & run

```bash
git clone https://github.com/ayscript/health-atlas-full-project
cd health-atlas-frontend
npm install    # or pnpm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Build & start (production)

```bash
npm run build
npm run start
```
---

## Configuration

### Model backend URL

The frontend forwards chat messages to a model service via the server route `src/app/api/chat/route.ts`.

By default the route contains a `backendUrl` constant — update that value to point to your running model service (e.g. `http://localhost:7860/chat_api`). Example location:

```ts
// file: src/app/api/chat/route.ts
const backendUrl = "http://localhost:7860/chat_api";
```

Tip: you can replace that constant with `process.env.NEXT_PUBLIC_MODEL_URL` and add the value to `.env.local` if you prefer env-driven config.

### Supabase / Auth

Auth is handled server-side by the FastAPI backend (`health-atlass-backend`). If you run your own Supabase project, set the backend environment variables there. The frontend does not require Supabase keys by default.

---

## How it works (brief)

- The client builds a message list and POSTs to `/api/chat` (server route)
- The server route prepends a system prompt and forwards the conversation to the model `/chat_api`
- The model service streams the response back to the frontend, which updates the chat UI progressively

---

## Troubleshooting

- If you see CORS or network errors when chatting, ensure the model service URL in `route.ts` is reachable and that the model server allows incoming requests from your origin.
- If responses are empty or fail: confirm the model service is running (port 7860 by default) and that it returns a streaming text/plain response.

---

