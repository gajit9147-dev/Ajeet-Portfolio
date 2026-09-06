const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "Ajeet Portfolio API",
    status: "online",
  });
});

/*
 * Protect the AI endpoint from excessive requests.
 *
 * Limit:
 * - 20 chat requests per IP
 * - within a 15-minute window
 */
const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many AI requests from this IP. Please try again later.",
  },
});

app.use("/api/chat", chatRateLimiter, chatRoutes);

module.exports = app;
