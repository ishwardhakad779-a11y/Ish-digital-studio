# ISH Digital Studio — Official Website

Premium, AI-operating-system-styled marketing site for ISH Digital Studio, founded by Ishwar Dhakad.

## Tech Stack
React 19 + Vite + Tailwind CSS v4 + Framer Motion + Lucide React + React Icons

## Getting Started
```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Structure
```
src/
  components/    Public site: layout, sections, effects, ui
  admin/         Admin dashboard: pages, components, context, api
  data/          siteData.js (all editable public-site copy)
  utils/         api.js (public site API calls)
```

## Admin Dashboard
Visit `/admin/login` to sign in (credentials created via the backend's `python -m app.seed`).
Once logged in you get: Dashboard (KPIs), Clients, Projects, Messages, Appointments,
Invoices, Payments, Analytics (charts), Settings. All protected by JWT — the token is
stored in `localStorage` and attached automatically via `src/admin/api/client.js`.

## Editing Content
All copy — services, portfolio, pricing, testimonials, FAQ, contact info — lives in `src/data/siteData.js`. Edit that file to update site content without touching components.

## Connecting the Backend (Phase 2)
The contact form already calls `submitContactForm()` in `src/utils/api.js`, which POSTs to `${VITE_API_BASE_URL}/contact`. Once the FastAPI backend is live, set `VITE_API_BASE_URL` in your `.env` and the form will work end-to-end.

## Deployment
Static build via `npm run build`, output in `dist/`. Deploy `dist/` to Vercel, Netlify, or any static host.
