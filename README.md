# Resumind

**AI-Powered Resume Analyzer**

![Resumind Preview](./public/images/home-page-preview.webp)

Resumind helps job seekers understand exactly how their resume stacks up against a specific job posting — instantly, and entirely in the browser. Upload a resume and a job description, and get a detailed, actionable breakdown across every category that matters to hiring systems and hiring managers alike.

---

## What It Does

Resumind analyzes a resume against a target job title and job description, then returns a comprehensive score and feedback report covering:

- **Overall Score** — a single at-a-glance score summarizing resume strength for the role
- **ATS Compatibility** — how well the resume will parse through Applicant Tracking Systems (formatting, layout, keyword matching)
- **Tone & Style** — whether the language and framing reads as confident, professional, and role-appropriate
- **Content** — how well accomplishments, metrics, and responsibilities align with what the job actually requires
- **Structure** — section organization, formatting choices, and completeness
- **Skills** — keyword and competency alignment with the job's stated requirements

Each category includes specific, actionable tips — flagged as strengths or areas to improve — so users know exactly what to fix.

---

## How It Works

1. **Upload** — the user uploads their resume (PDF) along with the target company name, job title, and job description
2. **Convert & Store** — the resume is converted to an image preview and securely stored
3. **Analyze** — the resume is sent to an AI model for evaluation against the job posting
4. **Review** — the user is taken to a detailed results page with their score breakdown and tailored feedback
5. **Revisit anytime** — past resume reviews remain saved and accessible for the user to reference or compare

---

## Key Features

- 🔒 **Fully client-side** — no custom backend server; user data is stored securely via Puter.js (auth, file storage, and key-value storage all handled client-side)
- ⚡ **Fast, in-browser PDF preview** — resumes are converted to images for instant visual review alongside feedback
- 🎯 **Job-specific scoring** — feedback is tailored to the exact job title and description provided, not generic resume advice
- 📊 **Category-by-category breakdown** — clear, structured scoring instead of a single vague number
- 🗂️ **Resume history** — users can revisit previous analyses at any time

---

## Tech Stack

| Layer               | Technology      |
| ------------------- | --------------- |
| Framework           | React Router v7 |
| Language            | TypeScript      |
| Build Tool          | Vite            |
| Styling             | Tailwind CSS    |
| Auth / Storage / AI | Puter.js        |
| Hosting             | Vercel          |

---

## Live Demo

https://ai-resume-analyzer-delta-sand.vercel.app

---

## Getting Started (Development)

\`\`\`bash

# Install dependencies

npm install

# Run the development server

npm run dev

# Build for production

npm run build
\`\`\`

The app runs fully client-side — no environment variables or backend setup required, since authentication, storage, and AI inference are all handled through Puter.js.

---

## Notes for Clients

- All resume and feedback data is tied to the authenticated user's Puter account and is not shared or exposed to other users.
- The AI feedback is generated per-analysis and is not cached or reused across different job postings — each upload produces a fresh, tailored evaluation.
- This project is under active development. Feedback and feature requests are welcome.

---
