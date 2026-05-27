# EduPath AI — SDG 4 Quality Education Agent

A single-page web application for university assignment: an AI Agent supporting **UN SDG 4 (Quality Education)** aligned with **Saudi Vision 2030**.

## Tech Stack

- **HTML5** — structure and semantics
- **Tailwind CSS** (CDN) — styling
- **Vanilla JavaScript** — interactivity (no build step required)

## Project Structure

```
sdg-ai-agent/
├── index.html      # Main entry point
├── css/
│   └── styles.css  # Custom styles & animations
├── js/
│   └── app.js      # View switching, chat, dashboards
└── README.md
```

## How to Run

1. Open the project folder.
2. Double-click `index.html`, or right-click → **Open with** → your browser (Chrome, Edge, Firefox).
3. No installation or server required.

## Features

| View | Description |
|------|-------------|
| **User Dashboard** | Chat with the AI Career Advisor; quick prompts for common questions |
| **Admin Dashboard** | Stats (142 users, 12 sessions, 85% SDG impact) + recent users table |
| **Client Dashboard** | Top skills chart + university feedback form |

## LM Arena API on Netlify (CORS fix)

Browser calls to `https://api.lmarena.ai` are blocked by CORS. This project uses a **Netlify serverless function** at `/.netlify/functions/chat` that proxies requests server-side.

1. In Netlify: **Site settings → Environment variables**
2. Add `LM_ARENA_API_KEY` with your LM Arena API key (see `.env.example`)
3. Redeploy the site

Local testing with the proxy: run `npx netlify dev` in the project folder.

**Do not** put your API key in `js/app.js` — it would be visible to anyone visiting your site.

## Assignment Notes

- Admin and client dashboards use **dummy/sample** data.
- The user chat calls the real LM Arena API via the Netlify proxy when deployed.
