# Copilot instructions for this repository

## Project overview
- This repository contains a wedding invitation site built with React + Vite in `frontend/`.
- The backend folder contains the Supabase SQL schema used for RSVP storage in `backend/schema.sql`.
- The app is designed for mobile-first use and has a public invitation flow plus a private admin route at `/admin`.

## Key architecture
- `frontend/src/App.jsx` controls the landing experience, the welcome music, the intro video, and the `/admin` route.
- `frontend/src/components/InvitationPage.jsx` contains the invitation content and the QR image section for shared photos.
- `frontend/src/components/AdminPage.jsx` handles the private admin view and authentication flow.
- `frontend/.env` stores the public Supabase connection values (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Do not expose `service_role` keys in client code.

## Coding expectations
- Keep the implementation consistent with the existing React/Vite pattern and CSS-based component styling.
- Prefer simple, readable code and small, focused component changes.
- Preserve the wedding-brand aesthetic: premium, elegant, mobile-friendly, and easy to navigate.
- Use Spanish copy for user-facing text unless a file is clearly technical/admin-only.
- Maintain existing paths and asset conventions for public files (`frontend/public/...`).
- If you change an image or QR asset, point it to a valid asset under `frontend/public` and keep the path relative to the public folder.

## Validation
- Validate frontend changes with `cd frontend && npm run build`.
- When editing backend SQL, preserve the existing table schema, row-level security, and unique constraints.

## Constraints
- Do not add secrets or production credentials to the frontend.
- Do not break the `/admin` experience or the RSVP flow.
- Keep changes minimal, polished, and aligned with the current project style.
