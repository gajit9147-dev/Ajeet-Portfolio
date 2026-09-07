require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║       AJEET PORTFOLIO SERVER         ║
╠══════════════════════════════════════╣
║ API:    http://localhost:${PORT}        ║
║ AI:     ${MODEL.padEnd(21)}║
║ STATUS: ONLINE                       ║
╚══════════════════════════════════════╝
`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`\n❌ Port ${PORT} is already in use by another process.`);
    console.error(`👉 Close the process using port ${PORT} or change PORT in server/.env.\n`);
  } else {
    console.error("\n❌ Server failed to start:", error.message, "\n");
  }
});

