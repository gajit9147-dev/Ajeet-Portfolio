const { askGemini } = require("../services/geminiService");

async function chatController(req, res) {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "messages must be an array",
      });
    }

    const cleanedMessages = messages
      .filter(
        (message) =>
          message &&
          ["user", "assistant"].includes(message.role) &&
          typeof message.content === "string"
      )
      .slice(-12);

    if (!cleanedMessages.length) {
      return res.status(400).json({
        success: false,
        message: "No valid messages provided",
      });
    }

    const answer = await askGemini(cleanedMessages);

    return res.json({
      success: true,
      message: answer,
    });
  } catch (error) {
    console.error("AI chat error:", error);

    return res.status(500).json({
      success: false,
      message: "AI service temporarily unavailable.",
    });
  }
}

module.exports = {
  chatController,
};
