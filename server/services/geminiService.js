const { GoogleGenAI } = require("@google/genai");
const ajeetProfile = require("../data/ajeetProfile");
const { getRoutedKnowledge } = require("./knowledgeRouter");

function generateSmartFallback(question, routedKnowledge) {
  const q = (question || "").toLowerCase();

  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("study") || q.includes("semester")) {
    return `**Ajeet Gupta** is currently pursuing his Bachelor's degree in **Computer Science & Engineering** with a specialization in **Artificial Intelligence & Machine Learning** at **${ajeetProfile.education.university}** in Vadodara, Gujarat. He is currently in his **${ajeetProfile.education.semester}** (${ajeetProfile.education.duration}).`;
  }

  if (q.includes("project") || q.includes("built") || q.includes("work") || q.includes("innervoice") || q.includes("promptwar")) {
    const list = ajeetProfile.projects
      .map(
        (p) =>
          `* **${p.name}** (${p.category}): ${p.description}\n  * **Stack:** ${p.technologies.join(", ")}${p.live ? `\n  * **Live Demo:** [View Live](${p.live})` : ""}${p.github ? `\n  * **Code:** [GitHub](${p.github})` : ""}`
      )
      .join("\n\n");
    return `Here are the key projects **Ajeet** has developed:\n\n${list}`;
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language") || q.includes("python") || q.includes("react")) {
    return `**Ajeet's** technical expertise covers:\n\n* **AI / ML:** ${ajeetProfile.skills.ai_ml.join(", ")}\n* **Frontend:** ${ajeetProfile.skills.frontend.join(", ")}\n* **Backend:** ${ajeetProfile.skills.backend.join(", ")}\n* **Databases:** ${ajeetProfile.skills.databases.join(", ")}\n* **DevOps & Cloud:** ${ajeetProfile.skills.devops_cloud.join(", ")}\n* **Tools:** ${ajeetProfile.skills.tools.join(", ")}`;
  }

  if (q.includes("leetcode") || q.includes("dsa") || q.includes("problem")) {
    const lc = routedKnowledge?.leetcode;
    const stats = lc?.solvedStats?.map(s => `${s.difficulty}: ${s.count}`).join(", ");
    return `**Ajeet** actively practices problem-solving on **LeetCode** under the handle [**${ajeetProfile.profiles.leetcode.split('/').filter(Boolean).pop()}**](${ajeetProfile.profiles.leetcode}).${stats ? `\n\n* **Current Solved Stats:** ${stats}` : ""}`;
  }

  if (q.includes("contact") || q.includes("reach") || q.includes("email") || q.includes("phone")) {
    return `You can reach out to **Ajeet Gupta** directly via:\n\n* **Email:** [${ajeetProfile.contact.email}](mailto:${ajeetProfile.contact.email})\n* **Phone:** ${ajeetProfile.contact.phone}\n* **LinkedIn:** [Connect on LinkedIn](${ajeetProfile.profiles.linkedin})\n* **GitHub:** [GitHub Profile](${ajeetProfile.profiles.github})`;
  }

  if (q.includes("github") || q.includes("social") || q.includes("linkedin") || q.includes("instagram") || q.includes("profile")) {
    return `Here are **Ajeet's** verified public profiles:\n\n* **GitHub:** [${ajeetProfile.profiles.github}](${ajeetProfile.profiles.github})\n* **LinkedIn:** [LinkedIn Profile](${ajeetProfile.profiles.linkedin})\n* **LeetCode:** [LeetCode Profile](${ajeetProfile.profiles.leetcode})\n* **Instagram:** [Instagram Profile](${ajeetProfile.profiles.instagram})`;
  }

  return `**Ajeet Gupta** is a **${ajeetProfile.identity.role}** at **${ajeetProfile.education.university}**, focused on **${ajeetProfile.currentFocus.join(", ")}**.\n\nHe learns by building practical full-stack applications and AI experiments. You can explore his projects like **InnerVoice** and **PromptWar**, or view his code on [GitHub](${ajeetProfile.profiles.github}).`;
}

async function askGemini(messages) {
  const apiKey = process.env.GEMINI_API_KEY;

  const latestUserMessage =
    [...messages]
      .reverse()
      .find((message) => message.role === "user")
      ?.content || "";

  let routedKnowledge = null;
  try {
    routedKnowledge = await getRoutedKnowledge(latestUserMessage);
  } catch (err) {
    console.warn("Knowledge routing warning:", err.message);
  }

  if (!apiKey) {
    return generateSmartFallback(latestUserMessage, routedKnowledge);
  }

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
2. Use the provided data as your source of truth. Never invent facts about Ajeet.
3. If information is unavailable, state that it is not currently listed.
4. You may combine portfolio information with verified public GitHub or LeetCode data.
5. Do not fabricate statistics, followers, or achievements.
6. Provide public profile links when relevant.
7. Use **bold** for important names, projects and technologies.
8. Keep answers concise, natural, and helpful.
9. You are Ajeet's portfolio assistant, not Ajeet himself.
`;

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Filter out previous error messages from history so they don't confuse the model
    const conversation = messages
      .filter((m) => m && m.content && !m.content.includes("couldn't connect"))
      .map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      }));

    const primaryModel = process.env.GEMINI_MODEL || "gemini-3.5-flash";

    let response;
    try {
      response = await ai.models.generateContent({
        model: primaryModel,
        contents: conversation,
        config: {
          systemInstruction,
          temperature: 0.4,
          maxOutputTokens: 800,
        },
      });
    } catch (err) {
      if (err.status === 429 || err.status === 404) {
        console.warn("Primary model unavailable, falling back to gemini-3.5-flash...");
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: conversation,
          config: {
            systemInstruction,
            temperature: 0.4,
            maxOutputTokens: 800,
          },
        });
      } else {
        throw err;
      }
    }

    return response.text || generateSmartFallback(latestUserMessage, routedKnowledge);
  } catch (error) {
    console.error("Gemini API rate limited or unavailable, serving instant verified portfolio answer:", error.message);
    // Instant zero-downtime verified fallback instead of failing with 500
    return generateSmartFallback(latestUserMessage, routedKnowledge);
  }
}

module.exports = {
  askGemini,
  askDeepSeek: askGemini,
};
