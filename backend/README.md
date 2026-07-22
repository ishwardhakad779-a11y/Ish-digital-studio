# ISH Digital Studio — Backend API

FastAPI backend powering the ISH Digital Studio website: contact/consultation forms,
JWT-secured admin dashboard, clients, projects, invoices, payments and appointments.

## Tech Stack
FastAPI · SQLAlchemy · Supabase Postgres · JWT (python-jose) · Passlib (bcrypt)

## Local Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # then fill in real values
```

### 1. Get your Supabase Postgres URL
Supabase Dashboard → Project Settings → Database → Connection String (URI, "Session pooler" or direct).
Paste it into `DATABASE_URL` in `.env`.

### 2. Create tables + first admin login
```bash
python -m app.seed
```
This creates all 10 tables and one admin user using `ADMIN_EMAIL` / `ADMIN_INITIAL_PASSWORD`
from `.env`. **Log in and change the password immediately after first login** (a
"change password" endpoint can be added under `/api/auth` when needed).

### 3. Run the API
```bash
uvicorn app.main:app --reload --port 8000
```
Docs available at `http://localhost:8000/api/docs`.

## Environment Variables
See `.env.example` — every variable is documented there (DB, JWT secret, CORS
origins, SMTP for email notifications).

## Email Notifications
`app/services/email_service.py` uses SMTP (works with Gmail App Passwords, SendGrid,
Resend, Zoho, etc). If `SMTP_HOST` is left blank, emails are skipped and logged instead
— the API keeps working in development without crashing.

## API Overview
- `POST /api/contact` — public contact form
- `POST /api/consultation` — public "Book Free Consultation" form
- `GET /api/portfolio`, `GET /api/testimonials` — public read-only content
- `POST /api/auth/login`, `GET /api/auth/me` — admin authentication
- `/api/admin/*` — JWT-protected: clients, projects, messages, consultations,
  appointments, invoices, payments
- `/api/admin/analytics/summary` — dashboard KPIs

## Deploying

**Render**
1. New Web Service → connect this repo, root directory `backend`
2. Build command: `pip install -r requirements.txt`
3. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add all `.env.example` variables in Render's Environment tab

**Vercel** is not recommended for this FastAPI backend (built for long-running Python
processes); use Render, Railway, or Fly.io. The React frontend is what should go on Vercel.

## Rate Limiting
`app/middlewares/rate_limit.py` limits `/api/contact` and `/api/consultation` to 5
requests/minute per IP (in-memory). For multi-instance deployments, swap this for a
Redis-backed limiter.
