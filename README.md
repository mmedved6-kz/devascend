# DevPortfolioAI: AI-Guided Projects for Junior Devs in the AI Job Crunch

[![GitHub stars](https://img.shields.io/github/stars/mmedved6-kz/DevAscend)](https://github.com/mmedved6-kz/DevAscend/stargazers)

## The Problem
In 2025, AI is automating entry-level dev tasks, making it harder for juniors (0-2 years experience) to land jobs. Free GitHub project lists (like build-your-own-x or awesome-for-beginners) are great for ideas but feel like isolated homework—they lack personalization, real-world context, and guidance to build resume-worthy portfolios. As a result, grads waste months in "tutorial hell," facing rejections while skills stagnate.

DevPortfolioAI solves this by turning static ideas into **AI-assisted, personalized projects** that simulate senior workflows (e.g., fixing legacy code under deadlines). It's not just a list—it's a virtual mentor helping you stand out in an AI-driven market.

## Key Features (MVP)
- **Skill-Based Personalization**: Input your skills (e.g., "Beginner JS, no databases") and get tailored projects.
- **Guided Steps with AI Handholding**: Step-by-step walkthroughs, hints, and code snippets for real-world scenarios (e.g., "Integrate an API into a buggy app").
- **Shareable Outputs**: Auto-generate polished demos, code repos, and resume sections (e.g., PDFs with "What I built and learned").
- **Progress Tracking**: Save your work and resume anytime.
- **Freemium Model**: Free for 1 project/month; subscribe ($15/month) for unlimited access and premium templates.

This differentiates from free repos by focusing on **interactivity and job relevance**—e.g., brownfield tasks that AI can't fully automate yet.

## Tech Stack
- **Frontend**: Next.js with Tailwind CSS
- **Backend/Database**: Supabase (auth, storage, real-time)
- **AI**: Groq API (fast, cheap LLM for guidance)
- **Hosting**: Vercel
- **Payments**: Stripe (post-MVP)

## Getting Started (Local Development)
### Prerequisites
- Node.js >=18
- Git
- Supabase account (free)
- Groq/OpenAI API key (sign up for free tier)
