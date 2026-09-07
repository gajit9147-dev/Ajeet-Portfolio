# Deployment Guide

This project can be deployed easily to modern cloud hosting platforms like **Vercel**, **Render**, or **Railway**.

---

## 1. Deploying the Frontend (Client)

The client is a static Single-Page Application (SPA) built with Vite and React.

### Vercel
1. Link your GitHub repository in the Vercel dashboard.
2. Set the **Root Directory** to `client`.
3. Build Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variables:
   - `VITE_API_URL`: URL of your deployed backend (e.g. `https://your-api.vercel.app` or `https://your-api.onrender.com`).

---

## 2. Deploying the Backend (Server)

The backend is an Express Node.js application.

### Option A: Vercel (Serverless)
The repository includes a ready-to-deploy `server/vercel.json`:
1. In Vercel, create a new project linked to the repository.
2. Set **Root Directory** to `server`.
3. Add environment variables:
   - `GEMINI_API_KEY`: Your Google AI Gemini API key.
   - `GEMINI_MODEL`: `gemini-2.5-flash`
   - `GITHUB_TOKEN`: (Optional) GitHub personal access token for higher rate limits.
   - `PORT`: `5000` (optional)

### Option B: Render
1. Create a **Web Service** on Render.
2. Set **Root Directory** to `server`.
3. Set **Build Command** to `npm install`.
4. Set **Start Command** to `node server.js`.
5. Add environment variables:
   - `GEMINI_API_KEY`: Your Google AI Gemini API key.
   - `GEMINI_MODEL`: `gemini-2.5-flash`
   - `PORT`: `5000`
