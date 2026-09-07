# API Reference

The backend exposes RESTful endpoints for health verification and AI conversational interaction with live developer knowledge routing.

## Base URL

- **Development**: `http://localhost:5000`
- **Production**: Configured via environment variable `VITE_API_URL` (or proxy)

---

## Endpoints

### 1. Health Check
Checks if the backend API service is running.

- **URL**: `/api/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "service": "Ajeet Portfolio API",
    "status": "online"
  }
  ```

---

### 2. AI Chat Endpoint
Chat with Ajeet's integrated AI Assistant powered by Google Gemini and live developer telemetry.

- **URL**: `/api/chat`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Rate Limit**: 100 requests per 15 minutes per IP.
- **Request Body**:
  ```json
  {
    "message": "What projects has Ajeet built?",
    "history": [
      {
        "role": "user",
        "content": "Hi"
      },
      {
        "role": "model",
        "content": "Hello! I am Ajeet's AI Assistant. How can I help you today?"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "reply": "Ajeet has engineered several key projects including InnerVoice (a full-stack AI journal with user authentication and dashboard metrics), PromptWar (a competitive prompt engineering arena), and high-performance modern web experiences like Elite Wash and Luxury Living.",
    "model": "gemini-2.5-flash",
    "timestamp": "2025-01-01T00:00:00.000Z"
  }
  ```

---

### 3. AI Service Health
Verification route for the chat subservice.

- **URL**: `/api/chat`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "message": "AI Chat endpoint is active. Send a POST request with { message, history } to interact with Ajeet's AI assistant."
  }
  ```
