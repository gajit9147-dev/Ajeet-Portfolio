const { LeetCode } = require("leetcode-query");
const ajeetProfile = require("../data/ajeetProfile");

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "gajit9147-dev";
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "COaYLmMANY";

const leetcode = new LeetCode();

function getGitHubHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "Ajeet-Portfolio-Server",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGitHubProfile() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    {
      headers: getGitHubHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub profile request failed: ${response.status}`);
  }

  const data = await response.json();

  return {
    username: data.login,
    name: data.name,
    bio: data.bio,
    location: data.location,
    publicRepositories: data.public_repos,
    followers: data.followers,
    following: data.following,
    profileUrl: data.html_url,
  };
}

async function fetchGitHubRepositories() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: getGitHubHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub repositories request failed: ${response.status}`
    );
  }

  const repositories = await response.json();

  return repositories.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics || [],
    url: repo.html_url,
    homepage: repo.homepage,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
  }));
}

async function fetchLeetCodeProfile() {
  try {
    const user = await leetcode.user(LEETCODE_USERNAME);

    if (!user) {
      return null;
    }

    return {
      username: LEETCODE_USERNAME,
      profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      profile: user.matchedUser || user,
      recentSubmissions: user.recentSubmissions || [],
    };
  } catch (error) {
    console.error("LeetCode lookup failed:", error.message);
    return null;
  }
}

async function getPublicProfileKnowledge() {
  const result = {
    personal: ajeetProfile,

    github: null,

    repositories: [],

    leetcode: {
      username: LEETCODE_USERNAME,
      url: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      data: null,
    },

    linkedin: {
      url: "https://www.linkedin.com/in/ajeet-gupta-970478273/",
      source: "Public profile URL provided for Ajeet's portfolio",
    },

    instagram: {
      username: "_ajeetgupta_07",
      url: "https://www.instagram.com/_ajeetgupta_07/",
      source: "Public profile URL provided for Ajeet's portfolio",
    },
  };

  try {
    result.github = await fetchGitHubProfile();
    result.repositories = await fetchGitHubRepositories();
  } catch (error) {
    console.error("GitHub lookup failed:", error.message);
  }

  result.leetcode.data = await fetchLeetCodeProfile();

  return result;
}

module.exports = {
  fetchGitHubProfile,
  fetchGitHubRepositories,
  fetchLeetCodeProfile,
  getPublicProfileKnowledge,
};
