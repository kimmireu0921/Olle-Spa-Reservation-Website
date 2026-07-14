# Olle Spa Reservation Website

A reservation website for a massage shop: service listings with prices, therapist profiles, a real availability-based booking flow, Google Reviews, a contact form, and an admin dashboard. Supports English, Korean, Chinese, and Japanese.

## Stack

- **Client:** React + Vite, `react-router-dom`, `react-i18next`
- **Server:** Express + `better-sqlite3` (SQLite)

## Getting Started

```bash
npm run install:all
npm run dev
```

This starts the client at http://localhost:5173 and the API server at http://localhost:4000 (Vite proxies `/api` to the server, so just open the client URL). On first run, the SQLite database is created automatically at `server/data/olle-spa.db` and seeded with sample services, therapists, and business hours (Mon–Sat 9am–7pm, closed Sunday).

To re-seed manually (e.g. after wiping the db): `npm run seed`.

## Configuration

Copy `server/.env.example` to `server/.env` and set:

- `ADMIN_PASSWORD` — required to access `/admin` (defaults to `changeme`, change this before deploying).
- `GOOGLE_PLACES_API_KEY` / `GOOGLE_PLACE_ID` — optional. Without these, the Reviews section simply hides itself. To enable live Google Reviews:
  1. Create a project at https://console.cloud.google.com/ and enable the **Places API**.
  2. Create an API key (Credentials → Create Credentials → API key).
  3. Find your business's Place ID using Google's [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id).

## What to Customize Before Launch

- **Therapist profiles** (`server/src/seed.js`) — replace the two placeholder therapists with your real staff, photos, and bios (per-language: en/ko/zh/ja).
- **Services & prices** (`server/src/seed.js`) — edit the seeded service list, durations, and prices.
- **Contact info** (`client/src/pages/Contact.jsx`) — replace the placeholder address/phone/email.
- **Admin password** — set a real `ADMIN_PASSWORD` in `server/.env`.

Services and therapists are managed via the seed file rather than an admin UI — after editing `seed.js`, delete `server/data/olle-spa.db` and restart the server to re-seed (only re-seeds tables that are empty, so it won't touch existing bookings if you only add new services).

## Production Notes

This is built for a small single-admin business site, not high-security multi-tenant use:

- Admin auth is a single shared password compared in plaintext against a header — no sessions, no hashing. Fine for one trusted admin over HTTPS; don't extend it without adding real auth.
- To deploy: `npm run build` in `client/`, then have Express serve `client/dist` as static files in addition to the `/api/*` routes (removes the need for the Vite dev proxy / CORS in production).

## Project Structure

```
client/   React app (pages, components, i18n locales)
server/   Express API + SQLite schema/seed/routes
```
