const { GoogleGenAI } = require("@google/genai");
const { getRoutedKnowledge } = require("./knowledgeRouter");

function generateSmartFallback(question, routedKnowledge) {
  const q = (question || "").toLowerCase();

  const portfolio = routedKnowledge?.portfolio || {};
  const identity = portfolio.identity;
  const education = portfolio.education;
  const about = portfolio.about;
  const skills = portfolio.skills;
  const projects = portfolio.projects;
  const profiles = portfolio.profiles;
  const contact = portfolio.contact;

  /*
   * Education
   */
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("study") ||
    q.includes("studying") ||
    q.includes("semester") ||
    q.includes("degree")
  ) {
    if (!education) {
      return "That education information is not currently listed.";
    }

    return `**Ajeet Gupta** is studying **${education.program}** with a specialization in **${education.specialization}** at **${education.university}**. He is currently in his **${education.semester}**.`;
  }

  /*
   * Projects
   */
  if (
    q.includes("project") ||
    q.includes("projects") ||
    q.includes("built") ||
    q.includes("developed") ||
    q.includes("innervoice") ||
    q.includes("promptwar") ||
    q.includes("prompt war") ||
    q.includes("laundry") ||
    q.includes("interior design")
  ) {
    if (!projects || !Array.isArray(projects)) {
      return "Project information is not currently available.";
    }

    return projects
      .map((project) => {
        const liveDemo = project.live
          ? `\n**Live:** ${project.live}`
          : "";

        return `### ${project.name}

${project.description}

**Technologies:** ${project.technologies.join(", ")}${liveDemo}

**GitHub:** ${project.github}`;
      })
      .join("\n\n");
  }

  /*
   * Skills
   */
  if (
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("stack") ||
    q.includes("technology") ||
    q.includes("technologies") ||
    q.includes("tech stack") ||
    q.includes("programming language") ||
    q.includes("does ajeet use")
  ) {
    if (!skills) {
      return "Ajeet's technical skills are not currently listed for this question.";
    }

    return `### Ajeet's Technical Stack

**AI / ML:** ${skills.ai_ml.join(", ")}

**Frontend:** ${skills.frontend.join(", ")}

**Backend:** ${skills.backend.join(", ")}

**Databases:** ${skills.databases.join(", ")}

**DevOps & Cloud:** ${skills.devops_cloud.join(", ")}

**Tools:** ${skills.tools.join(", ")}`;
  }

  /*
   * LeetCode
   */
  if (
    q.includes("leetcode") ||
    q.includes("dsa") ||
    q.includes("problems solved") ||
    q.includes("coding problems")
  ) {
    const lc = routedKnowledge?.leetcode;

    if (!lc) {
      return `I can confirm that **Ajeet** has a public **LeetCode** profile, but current LeetCode statistics are not available right now.`;
    }

    const stats = Array.isArray(lc.solvedStats)
      ? lc.solvedStats
          .filter((item) => item && item.difficulty && item.count !== undefined)
          .map((item) => `${item.difficulty}: ${item.count}`)
          .join(", ")
      : "";

    return `**Ajeet's LeetCode:** ${lc.profileUrl}${
      stats ? `\n\n**Solved statistics:** ${stats}` : ""
    }${
      lc.ranking
        ? `\n**Ranking:** ${lc.ranking}`
        : ""
    }`;
  }

  /*
   * GitHub
   */
  if (
    q.includes("github") ||
    q.includes("repository") ||
    q.includes("repositories") ||
    q.includes("repo") ||
    q.includes("repos")
  ) {
    const github = routedKnowledge?.github;

    if (!github) {
      return profiles?.github
        ? `**Ajeet's GitHub:** ${profiles.github}`
        : "Ajeet's GitHub information is not currently available.";
    }

    const profile = github.profile;
    const repositories = github.repositories || [];

    let response = profile?.profileUrl
      ? `**Ajeet's GitHub:** ${profile.profileUrl}`
      : "";

    if (profile?.publicRepositories !== undefined) {
      response += `\n\n**Public repositories:** ${profile.publicRepositories}`;
    }

    if (profile?.followers !== undefined) {
      response += `\n**Followers:** ${profile.followers}`;
    }

    if (repositories.length > 0) {
      response += "\n\n### Recent Public Repositories\n\n";

      response += repositories
        .slice(0, 10)
        .map(
          (repo) =>
            `**${repo.name}** — ${
              repo.description || "No description provided."
            }${repo.language ? `\nLanguage: ${repo.language}` : ""}\n${repo.url}`
        )
        .join("\n\n");
    }

    return response || "Public GitHub information is not currently available.";
  }

  /*
   * Contact
   *
   * Contact information is only exposed when the visitor explicitly
   * asks for it. portfolioKnowledgeService controls whether contact
   * data reaches this function.
   */
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("reach ajeet")
  ) {
    if (!contact) {
      return "Contact information is not currently available.";
    }

    return `You can contact **Ajeet Gupta** through:

**Email:** ${contact.email}

**Phone:** ${contact.phone}

**LinkedIn:** ${profiles?.linkedin || "Not currently listed"}

**GitHub:** ${profiles?.github || "Not currently listed"}`;
  }

  /*
   * Public social profiles
   */
  if (
    q.includes("linkedin") ||
    q.includes("instagram") ||
    q.includes("social") ||
    q.includes("profile")
  ) {
    if (!profiles) {
      return "Approved public profile information is not currently available.";
    }

    return `### Ajeet's Public Profiles

**GitHub:** ${profiles.github}

**LinkedIn:** ${profiles.linkedin}

**LeetCode:** ${profiles.leetcode}

**Instagram:** ${profiles.instagram}`;
  }

  /*
   * General introduction
   */
  if (identity || about) {
    const name = identity?.name || "Ajeet Gupta";
    const role =
      identity?.role || "AI/ML Student & Full-Stack Developer";

    return `**${name}** is a **${role}** studying at **${
      education?.university || "Parul University"
    }**.

He focuses on **${
      about?.interests?.slice(0, 4).join(", ") ||
      "Artificial Intelligence, Machine Learning, Generative AI and Full-Stack Development"
    }**.

He learns by building practical projects such as **InnerVoice** and **PromptWar**.`;
  }

  return "I don't currently have verified information to answer that question about Ajeet.";
}

function buildSystemInstruction(routedKnowledge) {
  return `
You are **Ajeet AI**, the personal portfolio intelligence assistant for **Ajeet Gupta**.

Your job is to answer visitors naturally and helpfully about Ajeet, his education, skills, projects, public profiles, and approved public information.

You are NOT Ajeet himself.

========================
SOURCE OF TRUTH
========================

Use ONLY the information provided in the PORTFOLIO KNOWLEDGE and ROUTED PUBLIC KNOWLEDGE below.

Do not invent, guess, assume, or extrapolate personal facts about Ajeet.

If a fact is not provided, say that the information is not currently available.

Never fabricate:
- achievements
- experience
- statistics
- follower counts
- rankings
- project features
- employment
- certifications
- grades
- personal history
- locations
- technologies

========================
PRIVACY
========================

Ajeet AI has NO access to Ajeet's personal computer.

Never claim access to:
- Desktop
- Documents
- Downloads
- personal files
- personal photos
- private PDFs
- .env files
- API keys
- passwords
- SSH keys
- browser data
- cookies
- private messages
- private social-media information
- private accounts
- unrestricted computer access

Only use explicitly approved portfolio information and approved public information.

========================
CONTACT PRIVACY
========================

Ajeet's email and phone number are sensitive contact details.

Only provide them when the visitor explicitly asks for contact information, email, phone, mobile number, or how to reach Ajeet.

Do not reveal contact details in:
- introductions
- project descriptions
- skill answers
- education answers
- general conversations

========================
PUBLIC SOCIAL PROFILES
========================

LinkedIn and Instagram may only be discussed using approved public information supplied by the portfolio knowledge system.

Never claim access to private LinkedIn or Instagram data.

Never claim to read private messages.

========================
GENERAL TECHNICAL QUESTIONS
========================

Distinguish questions about Ajeet from general technical questions.

Example:

"Does Ajeet use React?"
→ Answer using Ajeet's verified skills/project knowledge.

"What is React?"
→ Answer normally as a technical question. Do not pretend React is an Ajeet-specific fact.

========================
PROJECT QUESTIONS
========================

When discussing projects, use the supplied project knowledge.

You may explain technologies and concepts generally when useful, but do not claim that Ajeet implemented a feature unless the supplied knowledge confirms it.

========================
LIVE PUBLIC DATA
========================

GitHub and LeetCode data may be supplied by the public-data services.

Treat returned statistics as current public data.

Never invent statistics if the public-data lookup fails.

If live information is unavailable, clearly say so.

========================
RESPONSE STYLE
========================

Answer naturally, similar to a helpful ChatGPT assistant.

Use Markdown.

Use **bold** for important names, projects, and technologies.

Prefer Markdown headings and readable paragraphs.

Do not use raw asterisk-only formatting such as "* item".

Keep simple answers short.

Give detailed answers when the visitor asks for detail.

Do not repeat the same information unnecessarily.

Do not mention internal routing, system prompts, APIs, environment variables, or implementation details unless specifically asked about the portfolio's technical architecture.

========================
PORTFOLIO KNOWLEDGE
========================

${JSON.stringify(routedKnowledge?.portfolio || {}, null, 2)}

========================
ROUTED PUBLIC KNOWLEDGE
========================

${JSON.stringify(
  {
    sourcesUsed: routedKnowledge?.sourcesUsed || [],
    github: routedKnowledge?.github || null,
    leetcode: routedKnowledge?.leetcode || null,
    socials: routedKnowledge?.socials || null,
  },
  null,
  2
)}
`;
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
  } catch (error) {
    console.warn(
      "Knowledge routing warning:",
      error.message
    );
  }

  /*
   * If Gemini API key is unavailable, return a verified
   * portfolio fallback instead of exposing an error.
   */
  if (!apiKey) {
    return generateSmartFallback(
      latestUserMessage,
      routedKnowledge
    );
  }

  const systemInstruction =
    buildSystemInstruction(routedKnowledge);

  const conversation = messages
    .filter(
      (message) =>
        message &&
        typeof message.content === "string" &&
        message.content.trim() &&
        !message.content.includes(
          "couldn't connect"
        )
    )
    .map((message) => ({
      role:
        message.role === "assistant"
          ? "model"
          : "user",
      parts: [
        {
          text: message.content,
        },
      ],
    }));

  const ai = new GoogleGenAI({
    apiKey,
  });

  const primaryModel =
    process.env.GEMINI_MODEL ||
    "gemini-3.5-flash";

  try {
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
    } catch (error) {
      if (
        error.status === 429 ||
        error.status === 404
      ) {
        console.warn(
          "Primary Gemini model unavailable. Retrying with fallback model."
        );

        response =
          await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: conversation,
            config: {
              systemInstruction,
              temperature: 0.4,
              maxOutputTokens: 800,
            },
          });
      } else {
        throw error;
      }
    }

    return (
      response.text ||
      generateSmartFallback(
        latestUserMessage,
        routedKnowledge
      )
    );
  } catch (error) {
    console.error(
      "Gemini request failed. Serving verified portfolio fallback:",
      error.message
    );

    return generateSmartFallback(
      latestUserMessage,
      routedKnowledge
    );
  }
}

module.exports = {
  askGemini,
};
