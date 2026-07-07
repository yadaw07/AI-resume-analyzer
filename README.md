# Resumind

AI-powered resume analyzer that gives instant, actionable feedback on your resume against a target job description.

## Features

- Upload a resume (PDF) and job description
- AI-generated feedback on ATS compatibility, tone, content, structure, and skills
- Visual scoring breakdown per category
- Resume preview alongside feedback

## Tech Stack

- **React Router v7** — routing (SPA mode)
- **TypeScript**
- **Vite** — build tooling
- **Tailwind CSS** — styling
- **Puter.js** — client-side file storage, key-value store, and AI inference (no custom backend required)

## Getting Started

```bash
# install dependencies
npm install

# run dev server
npm run dev

# build for production
npm run build
```

## Deployment

This project runs in SPA mode (`ssr: false`) since Puter.js handles everything client-side (auth, storage, AI). Deployed on Vercel with a rewrite rule (`vercel.json`) to support client-side routing.

## How It Works

1. User uploads a resume (PDF) and pastes a job description
2. Resume is converted to an image preview and stored via Puter
3. Puter AI analyzes the resume against the job description
4. Feedback is stored in Puter's KV store and rendered as structured scores + suggestions

## License

MIT
