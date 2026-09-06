const ajeetProfile = require("../data/ajeetProfile");

function normalize(text = "") {
  return text.toLowerCase().trim();
}

function includesAny(query, words) {
  return words.some((word) => query.includes(word));
}

function getKnowledge(question = "") {
  const query = normalize(question);

  const knowledge = {
    identity: null,
    education: null,
    about: null,
    skills: null,
    projects: null,
    currentFocus: null,
    goals: null,
    profiles: null,
    contact: null,
  };

  /*
   * Identity / introduction questions
   */
  if (
    includesAny(query, [
      "who is ajeet",
      "who's ajeet",
      "tell me about ajeet",
      "about ajeet",
      "introduce ajeet",
      "introduction",
    ])
  ) {
    knowledge.identity = ajeetProfile.identity;
    knowledge.about = ajeetProfile.about;
    knowledge.education = ajeetProfile.education;
    knowledge.skills = ajeetProfile.skills;
    knowledge.projects = ajeetProfile.projects;
  }

  /*
   * Education questions
   */
  if (
    includesAny(query, [
      "education",
      "university",
      "college",
      "study",
      "studies",
      "semester",
      "degree",
      "course",
      "program",
      "specialization",
      "where does ajeet study",
      "where is ajeet studying",
    ])
  ) {
    knowledge.education = ajeetProfile.education;
  }

  /*
   * About / interests questions
   */
  if (
    includesAny(query, [
      "about",
      "interest",
      "interests",
      "learning",
      "learn",
      "focus",
      "currently working",
      "what is ajeet learning",
    ])
  ) {
    knowledge.identity = ajeetProfile.identity;
    knowledge.about = ajeetProfile.about;
    knowledge.currentFocus = ajeetProfile.currentFocus;
    knowledge.goals = ajeetProfile.goals;
  }

  /*
   * Skills / technology questions
   */
  if (
    includesAny(query, [
      "skill",
      "skills",
      "tech stack",
      "technology",
      "technologies",
      "technical",
      "programming language",
      "framework",
      "tools",
      "what technologies",
      "what tech",
      "does ajeet use react",
      "does ajeet use",
    ])
  ) {
    knowledge.skills = ajeetProfile.skills;
  }

  /*
   * Project questions
   */
  if (
    includesAny(query, [
      "project",
      "projects",
      "built",
      "build",
      "developed",
      "development",
      "work",
      "portfolio project",
      "innervoice",
      "promptwar",
      "prompt war",
      "laundry",
      "interior design",
    ])
  ) {
    knowledge.projects = ajeetProfile.projects;
  }

  /*
   * Public profile questions.
   *
   * These contain only the approved public profile URLs.
   * Dynamic GitHub/LeetCode information is handled separately
   * by knowledgeRouter/profileService.
   */
  if (
    includesAny(query, [
      "github",
      "linkedin",
      "instagram",
      "social",
      "social media",
      "profile",
      "profiles",
    ])
  ) {
    knowledge.profiles = ajeetProfile.profiles;
  }

  /*
   * Contact information is deliberately NOT included merely because
   * the question mentions Ajeet.
   *
   * It is only exposed when the visitor explicitly asks for contact
   * information, email, phone, or how to reach Ajeet.
   */
  if (
    includesAny(query, [
      "contact",
      "contact information",
      "contact details",
      "email",
      "email address",
      "phone",
      "phone number",
      "mobile",
      "mobile number",
      "how can i contact",
      "how do i contact",
      "how can i reach",
      "how do i reach",
      "reach ajeet",
    ])
  ) {
    knowledge.contact = ajeetProfile.contact;
    knowledge.profiles = ajeetProfile.profiles;
  }

  /*
   * If nothing matched, provide only safe general identity information.
   * This prevents the entire profile from being sent to Gemini for
   * unrelated questions.
   */
  const hasKnowledge = Object.values(knowledge).some(
    (value) => value !== null
  );

  if (!hasKnowledge) {
    knowledge.identity = ajeetProfile.identity;
    knowledge.about = {
      summary: ajeetProfile.about.summary,
      interests: ajeetProfile.about.interests,
    };
  }

  return knowledge;
}

module.exports = {
  getKnowledge,
};
