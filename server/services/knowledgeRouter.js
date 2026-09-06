const { getKnowledge } = require("./portfolioKnowledgeService");
const {
  fetchGitHubProfile,
  fetchGitHubRepositories,
  fetchLeetCodeProfile,
} = require("./profileService");

function normalize(text = "") {
  return text.toLowerCase().trim();
}

function includesAny(query, words) {
  return words.some((word) => query.includes(word));
}

function needsGitHub(query) {
  return includesAny(query, [
    "github",
    "github profile",
    "github repository",
    "github repositories",
    "repository",
    "repositories",
    "repo",
    "repos",
    "open source",
    "github activity",
    "github stats",
    "github projects",
    "github code",
    "commits",
    "commit",
    "stars",
    "forks",
  ]);
}

function needsLeetCode(query) {
  return includesAny(query, [
    "leetcode",
    "leetcode profile",
    "leetcode problems",
    "problems solved",
    "solved problems",
    "coding problems",
    "dsa",
    "dsa problems",
    "contest",
    "leetcode contest",
    "leetcode rank",
    "leetcode ranking",
    "leetcode stats",
  ]);
}

function needsSocialProfiles(query) {
  return includesAny(query, [
    "linkedin",
    "instagram",
    "social",
    "social media",
    "social profile",
    "profile link",
    "profile links",
    "public profile",
    "public profiles",
  ]);
}

async function getRoutedKnowledge(question = "") {
  const query = normalize(question);

  const knowledge = {
    portfolio: getKnowledge(question),
    sourcesUsed: ["portfolio"],
    github: null,
    leetcode: null,
    socials: null,
  };

  const tasks = [];

  /*
   * GitHub
   *
   * Only fetch public GitHub information when the question
   * actually requires GitHub knowledge.
   */
  if (needsGitHub(query)) {
    tasks.push(
      Promise.all([
        fetchGitHubProfile(),
        fetchGitHubRepositories(),
      ])
        .then(([profile, repositories]) => {
          knowledge.github = {
            profile,
            repositories,
          };

          knowledge.sourcesUsed.push("github");
        })
        .catch((error) => {
          console.error(
            "Knowledge Router GitHub error:",
            error.message
          );
        })
    );
  }

  /*
   * LeetCode
   *
   * Only fetch public LeetCode information when required.
   */
  if (needsLeetCode(query)) {
    tasks.push(
      fetchLeetCodeProfile()
        .then((data) => {
          knowledge.leetcode = data;
          knowledge.sourcesUsed.push("leetcode");
        })
        .catch((error) => {
          console.error(
            "Knowledge Router LeetCode error:",
            error.message
          );
        })
    );
  }

  /*
   * LinkedIn / Instagram / public profiles
   *
   * At this stage we only provide the explicitly approved public
   * profile information stored in ajeetProfile.
   *
   * We do NOT access:
   * - private accounts
   * - private messages
   * - browser sessions
   * - cookies
   * - personal accounts
   */
  if (needsSocialProfiles(query)) {
    knowledge.socials = knowledge.portfolio?.profiles || null;

    knowledge.sourcesUsed.push("approved public profiles");
  }

  /*
   * Execute dynamic public-data requests in parallel.
   */
  if (tasks.length > 0) {
    await Promise.all(tasks);
  }

  return knowledge;
}

module.exports = {
  getRoutedKnowledge,
};
