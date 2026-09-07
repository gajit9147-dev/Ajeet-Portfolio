const express = require("express");
const { chatController } = require("../controllers/chatController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ajeet AI Chat endpoint is ready. Send a POST request with { messages: [] } to chat.",
  });
});

router.post("/", chatController);

module.exports = router;
