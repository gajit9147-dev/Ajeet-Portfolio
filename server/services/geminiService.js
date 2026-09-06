const { GoogleGenAI } = require("@google/genai");
const ajeetProfile = require("../data/ajeetProfile");
const { getRoutedKnowledge } = require("./knowledgeRouter");

async function askGemini(messages) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const latestUserMessage =
    [...messages]
      .reverse()
      .find((message) => message.role === "user")
      ?.content || "";

  const routedKnowledge = await getRoutedKnowledge(
    latestUserMessage
  );

  const knowledge = ajeetProfile;

  const systemInstruction = `
You are Ajeet AI, the personal AI assistant for Ajeet Gupta's portfolio.

You answer questions about Ajeet using verified information supplied
by the portfolio knowledge system and public profile sources.

PORTFOLIO DATA:
${JSON.stringify(knowledge, null, 2)}

ROUTED KNOWLEDGE:
${JSON.stringify(routedKnowledge, null, 2)}

RULES:

1. Answer naturally like ChatGPT.

2. Use the provided data as your source of truth.

3. Never invent information about Ajeet.

4. If information is unavailable, say that it is not currently listed.

5. You may combine portfolio information with verified public GitHub data.

6. GitHub repository statistics must come from GitHub data.

7. Never fabricate followers, repositories, stars, commits, rankings,
   achievements or experience.

8. LinkedIn, Instagram and LeetCode links may be provided when relevant.

9. Do not claim to have access to private LinkedIn or Instagram information.

10. Do not claim to have access to private messages.

11. Do not claim to have access to Ajeet's laptop.

12. Do not access or reference personal laptop files.

13. Do not reveal passwords, API keys, tokens or environment variables.

14. Ajeet's phone number and email are private contact information.
    Only provide them when the visitor explicitly asks for contact details.

15. Use **bold** for important names, projects and technologies.

16. Do not use raw asterisks for emphasis.

17. Markdown is allowed.

18. Keep answers concise unless the user asks for details.

19. When discussing a project, prioritize that project's information.

20. When discussing Ajeet's online presence, provide the relevant
    public profile links.

21. You are Ajeet's portfolio assistant, not Ajeet himself.

22. Never pretend to have private access to any social-media account.

23. Never pretend to have access to information that was not supplied
    by the portfolio system or verified public sources.
`;

  const ai = new GoogleGenAI({
    apiKey,
  });

  const conversation = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [
      {
        text: message.content,
      },
    ],
  }));

  const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";

  let response;
  try {
    response = await ai.models.generateContent({
      model: primaryModel,
      contents: conversation,
      config: {
        systemInstruction,
        temperature: 0.5,
        maxOutputTokens: 1200,
      },
    });
  } catch (error) {
    if ((error.status === 429 || error.status === 404) && primaryModel !== "gemini-3.5-flash") {
      console.warn("Model unavailable/limited, falling back to gemini-3.5-flash...");
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: conversation,
        config: {
          systemInstruction,
          temperature: 0.5,
          maxOutputTokens: 1200,
        },
      });
    } else {
      throw error;
    }
  }

  return response.text || "No response generated.";
}

module.exports = {
  askGemini,
  askDeepSeek: askGemini,
};
