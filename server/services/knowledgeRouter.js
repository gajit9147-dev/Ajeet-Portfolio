const { getKnowledge } = require("./portfolioKnowledgeService");
const {
  fetchGitHubProfile,
  fetchGitHubRepositories,
  fetchLeetCodeProfile,
} = require("./profileService");

function normalize(text = "") {
  return text.toLowerCase().trim();
}

function needsGitHub(query) {
  return [
    "github",
    "repository",
    "repositories",
    "my repo",
    "git repo",
    "open source",
    "commits",
    "github activity",
  ].some((word) => query.includes(word));
}

function needsLeetCode(query) {
  return [
    "leetcode",
    "leetcode profile",
    "problems solved",
    "coding problems",
    "contest",
    "leetcode rank",
    "dsa problems",
  ].some((word) => query.includes(word));
}

function needsSocials(query) {
  return [
    "linkedin",
    "instagram",
    "social",
    "profile link",
    "profiles",
    "find ajeet",
  ].some((word) => query.includes(word));
}

async function getRoutedKnowledge(question) {
  const query = normalize(question);

  const knowledge = {
    portfolio: getKnowledge(question),
    sourcesUsed: ["portfolio"],
    github: null,
    leetcode: null,
    socials: null,
  };

  const tasks = [];

  if (needsGitHub(query)) {
    tasks.push(
      Promise.all([fetchGitHubProfile(), fetchGitHubRepositories()]).then(
        ([profile, repositories]) => {
          knowledge.github = { profile, repositories };
          knowledge.sourcesUsed.push("github");
        }
      ).catch((err) => {
        console.error("Knowledge Router GitHub error:", err.message);
      })
    );
  }

  if (needsLeetCode(query)) {
    tasks.push(
      fetchLeetCodeProfile().then((data) => {
        knowledge.leetcode = data;
        knowledge.sourcesUsed.push("leetcode");
      }).catch((err) => {
        console.error("Knowledge Router LeetCode error:", err.message);
      })
    );
  }

  if (needsSocials(query)) {
    knowledge.socials = knowledge.portfolio ? knowledge.portfolio.profiles : null;
    knowledge.sourcesUsed.push("social profiles");
  }

  if (tasks.length > 0) {
    await Promise.all(tasks);
  }

  return knowledge;
}

module.exports = {
  getRoutedKnowledge,
};
