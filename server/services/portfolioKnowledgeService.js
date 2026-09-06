const ajeetProfile = require("../data/ajeetProfile");

function normalizeQuestion(question = "") {
  return String(question).trim().toLowerCase();
}

function getKnowledge(question = "") {
  const q = normalizeQuestion(question);

  const wantsContact =
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("mail") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("reach");

  const wantsEducation =
    q.includes("study") ||
    q.includes("studying") ||
    q.includes("university") ||
    q.includes("college") ||
    q.includes("education") ||
    q.includes("semester") ||
    q.includes("course") ||
    q.includes("degree") ||
    q.includes("branch") ||
    q.includes("specialization");

  const wantsSkills =
    q.includes("skill") ||
    q.includes("skills") ||
    q.includes("tech stack") ||
    q.includes("technologies") ||
    q.includes("technology") ||
    q.includes("what does ajeet use") ||
    q.includes("programming language");

  const wantsProjects =
    q.includes("project") ||
    q.includes("projects") ||
    q.includes("built") ||
    q.includes("developed") ||
    q.includes("created");

  const projectKeywords = [
    "innervoice",
    "inner voice",
    "promptwar",
    "prompt war",
    "laundry service",
    "laundry",
    "interior design",
    "interior"
  ];

  const requestedProject = projectKeywords.find((project) =>
    q.includes(project)
  );

  const wantsCurrentFocus =
    q.includes("learning") ||
    q.includes("learn") ||
    q.includes("currently") ||
    q.includes("working on") ||
    q.includes("focus") ||
    q.includes("goal") ||
    q.includes("future");

  const knowledge = {
    identity: {
      name: ajeetProfile.identity?.name,
      role: ajeetProfile.identity?.role
    }
  };

  if (wantsEducation) {
    knowledge.education = ajeetProfile.education;
  }

  if (wantsSkills) {
    knowledge.skills = ajeetProfile.skills;
  }

  if (wantsCurrentFocus) {
    knowledge.currentFocus = ajeetProfile.currentFocus;
    knowledge.goals = ajeetProfile.goals;
  }

  if (requestedProject) {
    const projects = Array.isArray(ajeetProfile.projects)
      ? ajeetProfile.projects
      : [];

    const matchedProject = projects.find((project) => {
      const name = String(project.name || "").toLowerCase();

      return (
        name.includes(requestedProject) ||
        requestedProject.includes(name) ||
        (requestedProject.includes("inner") && name.includes("inner")) ||
        (requestedProject.includes("prompt") && name.includes("prompt")) ||
        (requestedProject.includes("laundry") && name.includes("laundry")) ||
        (requestedProject.includes("interior") && name.includes("interior"))
      );
    });

    if (matchedProject) {
      knowledge.projects = [matchedProject];
    }
  } else if (wantsProjects) {
    knowledge.projects = ajeetProfile.projects;
  }

  if (wantsContact) {
    knowledge.contact = ajeetProfile.contact;
  }

  if (
    !wantsEducation &&
    !wantsSkills &&
    !wantsCurrentFocus &&
    !requestedProject &&
    !wantsProjects &&
    !wantsContact
  ) {
    knowledge.about = ajeetProfile.about;
  }

  return knowledge;
}

module.exports = {
  getKnowledge
};
