# Ajeet Gupta — AI Systems Lab & Portfolio

An interactive, production-grade portfolio and AI systems lab showcasing full-stack engineering, algorithmic problem solving, and generative AI integrations with real-time developer telemetry.

---

## Highlights

- **Liquid Glass Design System**: Deep dark mode aesthetics, dynamic ambient light orbs, and glassmorphism with GPU-accelerated backdrop blur.
- **Embedded AI Assistant**: Real-time conversational agent powered by **Google Gemini 2.5 Flash**, equipped with dynamic knowledge routing and developer context grounding.
- **Live Telemetry & Telemetry Sync**: Integrated live statistics from GitHub repositories, LeetCode algorithmic benchmarks, and social feeds.
- **Featured System Showcases**:
  - **InnerVoice**: Secure full-stack digital space for personal journaling, authentication, Cloudinary storage, and analytics dashboards.
  - **PromptWar**: Competitive prompt engineering arena featuring AI-evaluated submissions, automated leaderboard scoring, and mentor guidance.
  - **Elite Wash & Luxury Living**: Modern, high-performance web applications focused on conversion optimization and clean aesthetics.
- **Robust Architecture**: Separation of concerns between a React 18 + Vite frontend and a Node.js + Express backend with rate limiting and automated fallback error handling.

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Vanilla CSS (Liquid Glass Architecture), Remark GFM, Lucide Icons |
| **Backend** | Node.js, Express.js, Express Rate Limit, Octokit, LeetCode Query |
| **AI / LLM** | Google Gemini API (`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-flash`), Prompt Engineering |
| **Database & Cloud** | MySQL, MongoDB, Cloudinary, Vercel, Render, Git/GitHub |

---

## Project Structure

```
ajeetPort/
├── client/                     # Frontend application (React 18 + Vite)
│   ├── public/                 # Static assets & Resume PDF
│   │   ├── images/             # Project screenshots
│   │   └── resume/             # Ajeet_Gupta_Resume.pdf
│   ├── src/
│   │   ├── components/         # Reusable UI components & AI Assistant
│   │   │   ├── ai/             # AIAssistant modal and messaging UI
│   │   │   └── layout/         # Header Navbar with smooth navigation
│   │   ├── sections/           # Modular page sections
│   │   │   ├── Hero/           # Terminal bio & dynamic status indicators
│   │   │   ├── About/          # Identity, core values & mission
│   │   │   ├── Projects/       # Featured full-stack & AI projects
│   │   │   ├── Workflow/       # Engineering process & architecture pipeline
│   │   │   ├── AILab/          # Live AI prompt playground & experiments
│   │   │   ├── Skills/         # Categorized tech proficiency matrix
│   │   │   ├── Journey/        # Academic & developmental milestone grid
│   │   │   └── Contact/        # Verified contact channels & social links
│   │   ├── styles/             # Global CSS & Liquid Glass styling system
│   │   ├── App.jsx             # Main layout orchestrator
│   │   └── main.jsx            # React root mount
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API & AI Gateway (Express)
│   ├── controllers/            # Request handlers (chatController)
│   ├── data/                   # Ground truth developer profile data
│   ├── routes/                 # Express route definitions (/api/chat, /api/health)
│   ├── services/               # Gemini client, Knowledge Router & Telemetry scrapers
│   ├── app.js                  # Express app configuration & middleware
│   ├── server.js               # HTTP listener & port conflict resolution
│   ├── package.json
│   └── vercel.json             # Serverless deployment configuration
│
├── docs/                       # Technical documentation (API, Architecture, Deployment)
├── LICENSE                     # MIT License
├── package.json                # Root orchestration scripts
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later
- **Google Gemini API Key**: [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/gajit9147-dev/Ajeet-Portfolio.git
cd Ajeet-Portfolio
```

### 2. Install Dependencies
Install dependencies across both client and server:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
cd ..
```

### 3. Configure Environment Variables
Create a `.env` file in the `server` directory:
```bash
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
INSTAGRAM_USERNAME=_ajeetgupta_07
GITHUB_USERNAME=gajit9147-dev
LEETCODE_USERNAME=COaYLmMANY
```

### 4. Run Locally
Run both client and server concurrently using the root npm script:
```bash
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

Alternatively, you can run them individually in separate terminals:
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run client
```

---

## Production Build

To compile and bundle the client for production:
```bash
npm run build
```
The optimized bundle will be generated in `client/dist/`.

---

## Deployment

Refer to [`docs/deployment.md`](docs/deployment.md) for full deployment instructions on **Vercel** and **Render**.

- **Frontend**: Deploy `client` to Vercel or GitHub Pages.
- **Backend**: Deploy `server` to Vercel using the included `server/vercel.json` or to Render / Railway as a Node Web Service.

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more details.

---

## Connect

- **Author**: Ajeet Gupta
- **Location**: Vadodara, Gujarat, India
- **Email**: [ajeetgupta80045@gmail.com](mailto:ajeetgupta80045@gmail.com)
- **LinkedIn**: [linkedin.com/in/ajeet-gupta-970478273](https://www.linkedin.com/in/ajeet-gupta-970478273/)
- **GitHub**: [github.com/gajit9147-dev](https://github.com/gajit9147-dev)
- **LeetCode**: [leetcode.com/u/COaYLmMANY](https://leetcode.com/u/COaYLmMANY/)
