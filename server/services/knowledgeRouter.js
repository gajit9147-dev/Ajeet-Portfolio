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
    "repo",
    "repos",
    "commit",
    "commits",
    "star",
    "stars",
    "fork",
    "code",
    "coding",
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
    "leetcode rating",
    "dsa",
  ].some((word) => query.includes(word));
}

function needsSocials(query) {
  return [
    "linkedin",
    "instagram",
    "social",
    "social media",
    "profile link",
    "profiles",
    "contact",
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

  if (needsGitHub(query)) {
    try {
      const [profile, repositories] = await Promise.all([
        fetchGitHubProfile(),
        fetchGitHubRepositories(),
      ]);

      knowledge.github = {
        profile,
        repositories,
      };

      knowledge.sourcesUsed.push("github");
    } catch (error) {
      console.error("Knowledge Router GitHub error:", error.message);
    }
  }

  if (needsLeetCode(query)) {
    try {
      knowledge.leetcode = await fetchLeetCodeProfile();
      knowledge.sourcesUsed.push("leetcode");
    } catch (error) {
      console.error("Knowledge Router LeetCode error:", error.message);
    }
  }

  if (needsSocials(query)) {
    knowledge.socials = knowledge.portfolio ? knowledge.portfolio.profiles : null;
    knowledge.sourcesUsed.push("social profiles");
  }

  return knowledge;
}

module.exports = {
  getRoutedKnowledge,
};
