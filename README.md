<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://health-atlas-five.vercel.app/">
    <img src="health-atlas-frontend/public/icon.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Health Atlas</h1>

  <a href="https://health-atlas-five.vercel.app/">Click Here For Live Link (https://health-atlas-five.vercel.app/)</a>

  <p align="center">
    AI-powered multilingual health triage and primary-care assistant.
    <br />
    <strong>Frontend</strong>: Next.js • <strong>API</strong>: FastAPI (Supabase auth) • <strong>Model</strong>: Transformers (Gradio + FastAPI)
  </p>
</div>


## Table of Contents

- [About](#about)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start (Local)](#quick-start-local)
  - [1) Frontend (Next.js)](#1-frontend-nextjs)
  - [2) Backend (FastAPI + Supabase)](#2-backend-fastapi--supabase)
  - [3) AI Model (Gradio / Transformers)](#3-ai-model-gradio--transformers)
- [Environment Variables](#environment-variables)
- [How the pieces connect](#how-the-pieces-connect)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)
- [License & Contact](#license--contact)

---

## About

Health Atlas is an AI assistant focused strictly on health, symptom triage, and first-aid guidance. It uses a small ecosystem:

- A Next.js frontend app that provides UI and auth flows
- A FastAPI backend that handles auth/profile using **Supabase**
- A model service (Gradio + FastAPI) serving a streaming text endpoint for chat responses

Important: The system prompt enforces strict domain rules (no diagnoses, no medication/dosage, strict refusal when out-of-scope). See code in `ai-model/main.py` and `health-atlas-frontend/src/app/api/chat/route.ts` for the exact rules.

---

## Project Structure

Top-level directories:

- `health-atlas-frontend/` — Next.js app (UI)
- `health-atlass-backend/` — FastAPI backend (auth/profile); uses Supabase
- `ai-model/` — Model server (Gradio + Transformers, streaming /chat_api)

---

## Prerequisites

- Node.js 18+ and npm (or pnpm)
- Python 3.11+ and pip
- For `ai-model`: GPU is recommended for usable performance with large models (PyTorch + transformers). CPU will work but may be very slow.
- A Supabase project (for auth) if you plan to use the built-in auth endpoints

---

## Quick Start (Local)

Clone the repo:

```bash
git clone https://github.com/ayscript/health-atlas-full-project
cd health-atlas-full-project
```

### 1) Frontend (Next.js)

```bash
cd health-atlas-frontend
npm install    # or pnpm install
npm run dev
```

Visit: http://localhost:3000

Notes:
- The client side calls a backend URL in `src/app/api/chat/route.ts` (see `backendUrl` constant). Update that to point at your running model service (e.g. `http://localhost:7860/chat_api`).

### 2) Backend (FastAPI + Supabase)

```bash
cd ../health-atlass-backend
python -m venv .venv
.\.venv\Scripts\activate    # Windows
pip install -r requirements.txt
```

Create a `.env` with the following variables (see [Environment Variables](#environment-variables)). Then run:

```bash
uvicorn main:app --reload --port 8000
```

Available routes (examples):
- `POST /auth/signup` — sign up a user (email, password, display_name)
- `POST /auth/login` — login
- `GET /api/profile` — protected; requires `Authorization: Bearer <supabase_access_token>`

### 3) AI Model (Gradio + Transformers)

This service exposes a streaming `/chat_api` endpoint and a Gradio UI (mounted at `/`).

```bash
cd ../ai-model
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
# Option 1: run via python (the script runs uvicorn when executed)
python main.py
# OR (recommended) run uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 7860
```

Visit the Gradio UI: http://localhost:7860/

Caveat: MODEL_ID in `main.py` is set to `NCAIR1/N-ATLaS`. Ensure you have access to the model and enough VRAM for inference. The script auto-detects CUDA if available.

---

## Environment Variables

health-atlass-backend (create `.env`):

```
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SIGNUP_REDIRECT_URL=https://your-frontend-url/after-signup
```

ai-model: none required by default (model id is hard-coded in `ai-model/main.py`).

Frontend: update `backendUrl` in `health-atlas-frontend/src/app/api/chat/route.ts` to your model service URL (local or deployed). Example:

```ts
const backendUrl = "http://localhost:7860/chat_api";
```

---

## How the pieces connect

- User interacts with the Next.js app
- Frontend builds messages, prepends a server-side system prompt, and POSTs to `/api/chat` (server route)
- Server route forwards the conversation to the model service `/chat_api` (streamed)
- The model service returns a streaming plain-text response which is relayed back to the client

Note: The system prompt enforces strict behavior and domain restrictions. Review `src/app/api/chat/route.ts` and `ai-model/main.py` for the exact rules.

---

## Deployment notes

- Frontend → Vercel (Next.js recommended)
- Backend → Any Python host (Render, Fly, Railway, or Vercel Serverless functions). Make sure to set env vars.
- Model → Requires GPU for efficient inference. Consider hosted inference or cloud instances with GPUs (AWS/GCP/Azure), or hosted model endpoints.

Security: keep Supabase keys and any model credentials out of the repository.

---

<p align="right">(<a href="#readme-top">back to top</a>)</p>