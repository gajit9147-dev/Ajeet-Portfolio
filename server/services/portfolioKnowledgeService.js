const ajeetProfile = require("../data/ajeetProfile");

function normalizeQuestion(question = "") {
  return String(question).trim().toLowerCase();
}

function includesAny(text, values) {
  return values.some((value) => text.includes(value));
}

function getProjectMatchesByTechnology(query) {
  const projects = Array.isArray(ajeetProfile.projects)
    ? ajeetProfile.projects
    : [];

  const technologyQuestions = [
    {
      terms: ["gemini ai", "gemini"],
      technologies: ["Gemini AI"],
    },
    {
      terms: ["react"],
      technologies: ["React"],
    },
    {
      terms: ["vite"],
      technologies: ["Vite"],
    },
    {
      terms: ["node.js", "nodejs", "node"],
      technologies: ["Node.js"],
    },
    {
      terms: ["express", "express.js"],
      technologies: ["Express"],
    },
    {
      terms: ["mysql"],
      technologies: ["MySQL"],
    },
    {
      terms: ["mongodb", "mongo db"],
      technologies: ["MongoDB"],
    },
    {
      terms: ["cloudinary"],
      technologies: ["Cloudinary"],
    },
    {
      terms: ["jwt", "json web token"],
      technologies: ["JWT"],
    },
    {
      terms: ["tailwind", "tailwind css"],
      technologies: ["Tailwind CSS"],
    },
    {
      terms: ["javascript"],
      technologies: ["JavaScript"],
    },
    {
      terms: ["html"],
      technologies: ["HTML"],
    },
    {
      terms: ["css"],
      technologies: ["CSS"],
    },
    {
      terms: ["emailjs", "email js"],
      technologies: ["EmailJS"],
    },
  ];

  const matches = technologyQuestions
    .filter((item) => includesAny(query, item.terms))
    .flatMap((item) =>
      projects.filter((project) =>
        item.technologies.some((technology) =>
          project.technologies?.some(
            (projectTechnology) =>
              String(projectTechnology).toLowerCase() ===
              technology.toLowerCase()
          )
        )
      )
    );

  return [...new Map(
    matches.map((project) => [project.name, project])
  ).values()];
}

function getKnowledge(question = "") {
  const q = normalizeQuestion(question);

  const wantsContact =
    includesAny(q, [
      "contact",
      "email",
      "mail",
      "phone",
      "mobile",
      "reach",
    ]);

  const wantsEducation =
    includesAny(q, [
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

  const wantsSkills =
    includesAny(q, [
      "skill",
      "skills",
      "tech stack",
      "technologies",
      "technology",
      "what does ajeet use",
      "programming language",
    ]);

  const wantsProjects =
    includesAny(q, [
      "project",
      "projects",
      "built",
      "developed",
      "created",
    ]);

  const projectKeywords = [
    "innervoice",
    "inner voice",
    "promptwar",
    "prompt war",
    "laundry service",
    "laundry",
    "interior design",
    "interior",
  ];

  const requestedProject = projectKeywords.find((project) =>
    q.includes(project)
  );

  const technologyProjectMatches =
    getProjectMatchesByTechnology(q);

  const wantsCurrentFocus =
    includesAny(q, [
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
   * Current focus / goals
   */
  if (wantsCurrentFocus) {
    knowledge.currentFocus = ajeetProfile.currentFocus;
    knowledge.goals = ajeetProfile.goals;
  }

  /*
   * Explicit project name:
   *
   * "Tell me about InnerVoice"
   *
   * Return only that project.
   */
  if (requestedProject) {
    const projects = Array.isArray(ajeetProfile.projects)
      ? ajeetProfile.projects
      : [];

    const matchedProject = projects.find((project) => {
      const name = String(project.name || "").toLowerCase();

      return (
        name.includes(requestedProject) ||
        requestedProject.includes(name) ||
        (requestedProject.includes("inner") &&
          name.includes("inner")) ||
        (requestedProject.includes("prompt") &&
          name.includes("prompt")) ||
        (requestedProject.includes("laundry") &&
          name.includes("laundry")) ||
        (requestedProject.includes("interior") &&
          name.includes("interior"))
      );
    });

    if (matchedProject) {
      knowledge.projects = [matchedProject];
    }
  }
  /*
   * Technology-based project question:
   *
   * "Which project uses Gemini AI?"
   *
   * Return only projects that actually use that technology.
   */
  else if (technologyProjectMatches.length > 0) {
    knowledge.projects = technologyProjectMatches;
  }
  /*
   * General project question:
   *
   * "What projects has Ajeet built?"
   *
   * Return all projects.
   */
  else if (wantsProjects) {
    knowledge.projects = ajeetProfile.projects;
  }

  /*
   * Contact data is only included when explicitly requested.
   */
  if (wantsContact) {
    knowledge.contact = ajeetProfile.contact;
  }

  /*
   * General about information.
   */
  if (
    !wantsEducation &&
    !wantsSkills &&
    !wantsCurrentFocus &&
    !requestedProject &&
    technologyProjectMatches.length === 0 &&
    !wantsProjects &&
    !wantsContact
  ) {
    knowledge.about = ajeetProfile.about;
  }

  return knowledge;
}

module.exports = {
  getKnowledge,
};
