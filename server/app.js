const express = require("express");
const cors = require("cors");

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

app.use("/api/chat", chatRoutes);

module.exports = app;
