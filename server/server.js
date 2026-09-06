require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const MODEL = process.env.GEMINI_MODEL || "Gemini 3.5 Flash";

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║       AJEET PORTFOLIO SERVER        ║
╠══════════════════════════════════════╣
║ API:    http://localhost:${PORT}       ║
║ AI:     ${MODEL.padEnd(20)} ║
║ STATUS: ONLINE                       ║
╚══════════════════════════════════════╝
`);
});
