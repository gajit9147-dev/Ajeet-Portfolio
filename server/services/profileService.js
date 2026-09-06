let getLCAccount;
try {
  ({ getLCAccount } = require("leetcode-public-api"));
} catch (_) {
  // fallback if not present
}

let LeetCode;
try {
  ({ LeetCode } = require("leetcode-query"));
} catch (_) {
  // fallback if not present
}

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "COaYLmMANY";

async function getLeetCodeProfile() {
  try {
    if (typeof getLCAccount === "function") {
      const response = await getLCAccount(LEETCODE_USERNAME);

      if (response?.data) {
        return response.data;
      }
    }

    // Fallback using leetcode-query if leetcode-public-api is blocked or returns null
    if (LeetCode) {
      const lc = new LeetCode();
      const user = await lc.user(LEETCODE_USERNAME);

      if (user?.matchedUser) {
        return {
          username: user.matchedUser.username,
          profile: user.matchedUser.profile,
          submitStats: user.matchedUser.submitStats,
          badges: user.matchedUser.badges,
        };
      }
    }

    return null;
  } catch (error) {
    console.error("LeetCode lookup failed:", error.message);
    return null;
  }
}

async function getPublicProfiles() {
  return {
    github: {
      username: "gajit9147-dev",
      url: "https://github.com/gajit9147-dev",
    },

    linkedin: {
      url: "https://www.linkedin.com/in/ajeet-gupta-970478273/",
    },

    instagram: {
      username: "_ajeetgupta_07",
      url: "https://www.instagram.com/_ajeetgupta_07/",
    },

    leetcode: {
      username: LEETCODE_USERNAME,
      url: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      data: await getLeetCodeProfile(),
    },
  };
}

module.exports = {
  getLeetCodeProfile,
  getPublicProfiles,
};
