const ajeetProfile = require("../data/ajeetProfile");

function normalizeQuestion(question = "") {
  return String(question).trim().toLowerCase();
}

function includesAny(text, values) {
  return values.some((value) => text.includes(value));
}

function getProjects() {
  return Array.isArray(ajeetProfile.projects)
    ? ajeetProfile.projects
    : [];
}

function findProjectByName(query) {
  const projects = getProjects();

  const aliases = {
    innervoice: ["innervoice", "inner voice"],
    promptwar: ["promptwar", "prompt war"],
    laundry: ["laundry", "laundry service"],
    "interior design": ["interior design", "interior"],
  };

  for (const project of projects) {
    const name = String(project.name || "").toLowerCase();

    const matchingAliases = aliases[name] || [name];

    if (
      matchingAliases.some((alias) =>
        query.includes(alias)
      )
    ) {
      return project;
    }
  }

  return null;
}

function findProjectsByTechnology(query) {
  const projects = getProjects();

  const technologyMap = [
    {
      terms: ["gemini ai", "gemini"],
      technology: "Gemini AI",
    },
    {
      terms: ["react"],
      technology: "React",
    },
    {
      terms: ["vite"],
      technology: "Vite",
    },
    {
      terms: ["node.js", "nodejs"],
      technology: "Node.js",
    },
    {
      terms: ["express", "express.js"],
      technology: "Express",
    },
    {
      terms: ["mysql"],
      technology: "MySQL",
    },
    {
      terms: ["cloudinary"],
      technology: "Cloudinary",
    },
    {
      terms: ["jwt", "json web token"],
      technology: "JWT",
    },
    {
      terms: ["tailwind", "tailwind css"],
      technology: "Tailwind CSS",
    },
    {
      terms: ["emailjs", "email js"],
      technology: "EmailJS",
    },
    {
      terms: ["javascript"],
      technology: "JavaScript",
    },
    {
      terms: ["html"],
      technology: "HTML",
    },
    {
      terms: ["css"],
      technology: "CSS",
    },
  ];

  const matchedTechnology = technologyMap.find((item) =>
    includesAny(query, item.terms)
  );

  if (!matchedTechnology) {
    return [];
  }

  return projects.filter((project) =>
    project.technologies?.some(
      (technology) =>
        String(technology).toLowerCase() ===
        matchedTechnology.technology.toLowerCase()
    )
  );
}

function getKnowledge(question = "") {
  const q = normalizeQuestion(question);

  const wantsContact = includesAny(q, [
    "contact",
    "email",
    "mail",
    "phone",
    "mobile",
    "reach",
    "how can i contact",
    "how do i contact",
    "how can i reach",
  ]);

  const wantsEducation = includesAny(q, [
    "study",
    "studying",
    "university",
    "college",
    "education",
    "semester",
    "course",
    "degree",
    "branch",
    "specialization",
  ]);

  const wantsSkills = includesAny(q, [
    "skill",
    "skills",
    "tech stack",
    "technologies",
    "technology",
    "programming language",
    "what does ajeet use",
  ]);

  const wantsGeneralProjects = includesAny(q, [
    "what projects",
    "which projects",
    "all projects",
    "projects has ajeet built",
    "projects has ajeet",
    "what has ajeet built",
    "projects did ajeet build",
  ]);

  const explicitProject = findProjectByName(q);

  const technologyProjects = findProjectsByTechnology(q);

  const wantsCurrentFocus = includesAny(q, [
    "learning",
    "learn",
    "currently",
    "working on",
    "focus",
    "goal",
    "future",
  ]);

  const knowledge = {
    identity: {
      name: ajeetProfile.identity?.name,
      role: ajeetProfile.identity?.role,
    },
  };

  /*
   * Education
   */
  if (wantsEducation) {
    knowledge.education = ajeetProfile.education;
  }

  /*
   * Skills
   */
  if (wantsSkills) {
    knowledge.skills = ajeetProfile.skills;
  }

  /*
   * Current focus
   */
  if (wantsCurrentFocus) {
    knowledge.currentFocus = ajeetProfile.currentFocus;
    knowledge.goals = ajeetProfile.goals;
  }

  /*
   * Explicit project request:
   *
   * "Tell me about InnerVoice"
   */
  if (explicitProject) {
    knowledge.projects = [explicitProject];
  }

  /*
   * Technology-specific project request:
   *
   * "Which project uses Gemini AI?"
   *
   * Only matching projects are returned.
   */
  else if (technologyProjects.length > 0) {
    knowledge.projects = technologyProjects;
  }

  /*
   * General project request:
   *
   * "What projects has Ajeet built?"
   *
   * Return all projects.
   */
  else if (wantsGeneralProjects) {
    knowledge.projects = getProjects();
  }

  /*
   * Contact information is only returned for explicit
   * contact requests.
   */
  if (wantsContact) {
    knowledge.contact = ajeetProfile.contact;
  }

  /*
   * Public profile links remain approved information.
   */
  if (
    q.includes("github") ||
    q.includes("linkedin") ||
    q.includes("instagram") ||
    q.includes("social") ||
    q.includes("profile")
  ) {
    knowledge.profiles = ajeetProfile.profiles;
  }

  /*
   * General fallback.
   *
   * Do not attach the entire profile.
   */
  if (
    Object.keys(knowledge).length === 1 &&
    !wantsContact
  ) {
    knowledge.about = {
      summary: ajeetProfile.about?.summary,
      interests: ajeetProfile.about?.interests,
    };
  }

  return knowledge;
}

module.exports = {
  getKnowledge,
};
