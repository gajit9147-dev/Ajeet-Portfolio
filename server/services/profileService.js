const { LeetCode } = require("leetcode-query");
const ajeetProfile = require("../data/ajeetProfile");

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "gajit9147-dev";
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "COaYLmMANY";

const leetcode = new LeetCode();

// In-memory cache with 15-minute TTL to ensure fast responses
const CACHE_TTL_MS = 15 * 60 * 1000;
let profileCache = {
  githubProfile: null,
  githubProfileTime: 0,
  githubRepos: null,
  githubReposTime: 0,
  leetcodeProfile: null,
  leetcodeProfileTime: 0,
};

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
  const now = Date.now();
  if (
    profileCache.githubProfile &&
    now - profileCache.githubProfileTime < CACHE_TTL_MS
  ) {
    return profileCache.githubProfile;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: getGitHubHeaders(),
        signal: controller.signal,
      }
    );
    clearTimeout(timer);

    if (!response.ok) {
      if (profileCache.githubProfile) return profileCache.githubProfile;
      throw new Error(`GitHub profile request failed: ${response.status}`);
    }

    const data = await response.json();

    const profile = {
      username: data.login,
      name: data.name,
      bio: data.bio,
      location: data.location,
      publicRepositories: data.public_repos,
      followers: data.followers,
      following: data.following,
      profileUrl: data.html_url,
    };

    profileCache.githubProfile = profile;
    profileCache.githubProfileTime = now;
    return profile;
  } catch (error) {
    if (profileCache.githubProfile) return profileCache.githubProfile;
    console.error("GitHub profile lookup failed:", error.message);
    return null;
  }
}

async function fetchGitHubRepositories() {
  const now = Date.now();
  if (
    profileCache.githubRepos &&
    now - profileCache.githubReposTime < CACHE_TTL_MS
  ) {
    return profileCache.githubRepos;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=30&sort=updated`,
      {
        headers: getGitHubHeaders(),
        signal: controller.signal,
      }
    );
    clearTimeout(timer);

    if (!response.ok) {
      if (profileCache.githubRepos) return profileCache.githubRepos;
      throw new Error(`GitHub repositories request failed: ${response.status}`);
    }

    const repositories = await response.json();

    const mapped = (Array.isArray(repositories) ? repositories : [])
      .filter((repo) => !repo.fork || repo.stargazers_count > 0)
      .slice(0, 10)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics || [],
        url: repo.html_url,
        homepage: repo.homepage,
      }));

    profileCache.githubRepos = mapped;
    profileCache.githubReposTime = now;
    return mapped;
  } catch (error) {
    if (profileCache.githubRepos) return profileCache.githubRepos;
    console.error("GitHub repositories lookup failed:", error.message);
    return [];
  }
}

async function fetchLeetCodeProfile() {
  const now = Date.now();

  if (
    profileCache.leetcodeProfile &&
    now - profileCache.leetcodeProfileTime < CACHE_TTL_MS
  ) {
    return profileCache.leetcodeProfile;
  }

  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("LeetCode query timeout")), 3500);
    });

    const userPromise = Promise.resolve()
      .then(() => leetcode.user(LEETCODE_USERNAME))
      .catch((error) => {
        throw new Error(`LeetCode network request failed: ${error.message}`);
      });

    const user = await Promise.race([userPromise, timeoutPromise]);

    if (!user) {
      if (profileCache.leetcodeProfile) {
        return profileCache.leetcodeProfile;
      }
      return null;
    }

    const profileData = {
      username: LEETCODE_USERNAME,
      profileUrl: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      solvedStats: user.matchedUser?.submitStats?.acSubmissionNum || [],
      ranking: user.matchedUser?.profile?.ranking || null,
      reputation: user.matchedUser?.profile?.reputation || 0,
    };

    profileCache.leetcodeProfile = profileData;
    profileCache.leetcodeProfileTime = now;

    return profileData;
  } catch (error) {
    if (profileCache.leetcodeProfile) {
      return profileCache.leetcodeProfile;
    }
    console.warn("LeetCode public data unavailable:", error.message);
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
    const [ghProfile, ghRepos, lcData] = await Promise.all([
      fetchGitHubProfile(),
      fetchGitHubRepositories(),
      fetchLeetCodeProfile(),
    ]);

    result.github = ghProfile;
    result.repositories = ghRepos || [];
    result.leetcode.data = lcData;
  } catch (error) {
    console.error("Public profile knowledge lookup error:", error.message);
  }

  return result;
}

module.exports = {
  fetchGitHubProfile,
  fetchGitHubRepositories,
  fetchLeetCodeProfile,
  getPublicProfileKnowledge,
};