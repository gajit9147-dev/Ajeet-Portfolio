const { getKnowledge } = require("./portfolioKnowledgeService");

const {
  fetchGitHubProfile,
  fetchGitHubRepositories,
  fetchLeetCodeProfile,
} = require("./profileService");

const {
  fetchInstagramProfile,
} = require("./instagramService");

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

function needsInstagram(query) {
  return includesAny(query, [
    "instagram",
    "insta",
    "instagram profile",
    "instagram followers",
    "instagram follower",
    "instagram following",
    "instagram posts",
    "instagram bio",
    "instagram stats",
    "how many followers",
    "how many instagram followers",
    "followers on instagram",
    "following on instagram",
  ]);
}

function needsSocialProfiles(query) {
  return includesAny(query, [
    "linkedin",
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
    instagram: null,
    socials: null,
  };

  const tasks = [];

  /*
   * GitHub
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
   * Instagram
   *
   * Only public Instagram profile information is requested.
   *
   * No login.
   * No cookies.
   * No private messages.
   * No private account access.
   */
  if (needsInstagram(query)) {
    tasks.push(
      fetchInstagramProfile()
        .then((data) => {
          knowledge.instagram = data;

          knowledge.sourcesUsed.push(
            "instagram public profile"
          );
        })
        .catch((error) => {
          console.error(
            "Knowledge Router Instagram error:",
            error.message
          );
        })
    );
  }

  /*
   * Other approved public social profiles
   */
  if (needsSocialProfiles(query)) {
    knowledge.socials =
      knowledge.portfolio?.profiles || null;

    knowledge.sourcesUsed.push(
      "approved public profiles"
    );
  }

  /*
   * Run all required public-data lookups in parallel.
   */
  if (tasks.length > 0) {
    await Promise.all(tasks);
  }

  return knowledge;
}

module.exports = {
  getRoutedKnowledge,
};
