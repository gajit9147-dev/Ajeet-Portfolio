require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║       AJEET PORTFOLIO SERVER        ║
╠══════════════════════════════════════╣
║ API:    http://localhost:${PORT}       ║
║ AI:     Gemini 2.5 Flash             ║
║ STATUS: ONLINE                       ║
╚══════════════════════════════════════╝
`);
});
