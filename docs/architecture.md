# System Architecture

This portfolio operates as an interactive AI Systems Lab showcasing real-time developer telemetry, modern glassmorphism design, and an integrated LLM assistant.

```
┌────────────────────────────────────────────────────────┐
│               Client (React 18 + Vite)                │
│  - Liquid Glass UI System (CSS Glassmorphism)         │
│  - AIAssistant Interactive Chat Modal                  │
│  - Hero, About, Projects, Workflow, Skills, Journey    │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌────────────────────────────────────────────────────────┐
│            Express.js Backend (Node.js)                │
│  - Rate Limiter (express-rate-limit)                   │
│  - Knowledge Router (Context Injection)               │
│  - Fallback Resilient Gemini API Client                │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│   Live Data Aggregators  │   │     Google Gemini API    │
│  - GitHub API (Octokit)  │   │  - gemini-2.5-flash      │
│  - LeetCode GraphQL API  │   │  - Structured Grounding  │
│  - Public Instagram Feed │   │  - Safe History Handling │
└──────────────────────────┘   └──────────────────────────┘
```

## Architectural Highlights

1. **Liquid Glass Design System**:
   - Modern glassmorphism using CSS variables (`--glass-bg`, `--glass-border`, `--glass-glow`).
   - Smooth GPU-accelerated backdrop blur filters (`backdrop-filter: blur(...)`).
   - Responsive layouts optimized for desktop, tablet, and mobile screens.

2. **Knowledge Routing & Grounding**:
   - When users query the assistant about Ajeet's repositories, GitHub stats, LeetCode accomplishments, or bio, the backend queries live external APIs and injects verified context into the Gemini system instruction prompt.
   - Prevents hallucinations and ensures answers reflect real-time code activity and actual verified metrics.

3. **Multi-Turn Chat Safety**:
   - Strict conversation alternation format (`user` -> `model` -> `user`).
   - Automatic trimming of system prompts or metadata from history to comply with Gemini API validation rules.
   - Dynamic API base URL resolution supporting both local development and remote deployments.
