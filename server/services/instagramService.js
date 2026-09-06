const ajeetProfile = require("../data/ajeetProfile");

const INSTAGRAM_USERNAME =
  process.env.INSTAGRAM_USERNAME || "_ajeetgupta_07";

const INSTAGRAM_PROFILE_URL =
  `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

const CACHE_TTL_MS = 15 * 60 * 1000;

let profileCache = {
  data: null,
  timestamp: 0,
};

function getCachedProfile() {
  const now = Date.now();

  if (
    profileCache.data &&
    now - profileCache.timestamp < CACHE_TTL_MS
  ) {
    return profileCache.data;
  }

  return null;
}

function saveCache(data) {
  profileCache = {
    data,
    timestamp: Date.now(),
  };

  return data;
}

function parseCount(str) {
  if (!str) return null;
  const clean = str.replace(/,/g, "").trim().toLowerCase();
  if (clean.endsWith("k")) {
    return Math.round(parseFloat(clean) * 1000);
  }
  if (clean.endsWith("m")) {
    return Math.round(parseFloat(clean) * 1000000);
  }
  const num = parseInt(clean, 10);
  return Number.isNaN(num) ? null : num;
}

async function fetchInstagramProfile() {
  const cached = getCachedProfile();

  if (cached) {
    return cached;
  }

  const defaultProfile = {
    username: INSTAGRAM_USERNAME,
    profileUrl: INSTAGRAM_PROFILE_URL,
    followerCount: ajeetProfile.instagram?.followers ?? 253,
    followingCount: ajeetProfile.instagram?.following ?? 152,
    postCount: ajeetProfile.instagram?.posts ?? 0,
    fullName: ajeetProfile.instagram?.fullName || "Ajeet Gupta",
    biography: null,
    isVerified: false,
    source: "Instagram public profile",
    retrievedAt: new Date().toISOString(),
  };

  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const response = await fetch(
      INSTAGRAM_PROFILE_URL,
      {
        headers: {
          "User-Agent":
            "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      return saveCache(defaultProfile);
    }

    const html = await response.text();

    const profile = { ...defaultProfile, retrievedAt: new Date().toISOString() };

    /*
     * 1. Extract from standard OpenGraph and meta description tags.
     * Instagram formats:
     * "253 Followers, 152 Following, 0 Posts - See Instagram photos and videos from Ajeet Gupta (@_ajeetgupta_07)"
     */
    const metaDescMatch =
      html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i) ||
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);

    if (metaDescMatch) {
      const descContent = metaDescMatch[1];
      const statsMatch = descContent.match(
        /([\d,.]+[kKmM]?)\s+Followers?,\s+([\d,.]+[kKmM]?)\s+Following,\s+([\d,.]+[kKmM]?)\s+Posts?/i
      );

      if (statsMatch) {
        profile.followerCount = parseCount(statsMatch[1]) ?? profile.followerCount;
        profile.followingCount = parseCount(statsMatch[2]) ?? profile.followingCount;
        profile.postCount = parseCount(statsMatch[3]) ?? profile.postCount;
      }
    }

    /*
     * 2. Extract full name from og:title if available.
     * e.g. "Ajeet Gupta (&#064;_ajeetgupta_07) • Instagram photos and videos"
     */
    const ogTitleMatch =
      html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i);

    if (ogTitleMatch) {
      const rawTitle = ogTitleMatch[1];
      const nameMatch = rawTitle.match(/^([^(•–-]+)/);
      if (nameMatch && nameMatch[1].trim()) {
        profile.fullName = nameMatch[1].replace(/&#064;/g, "@").trim();
      }
    }

    /*
     * 3. Fallback: Try JSON-LD structured data.
     */
    const jsonLdMatches = [
      ...html.matchAll(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      ),
    ];

    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);
        const data = Array.isArray(parsed) ? parsed[0] : parsed;

        if (data) {
          profile.fullName = data.name || profile.fullName;
          profile.biography = data.description || profile.biography;

          if (data.interactionStatistic) {
            const statistics = Array.isArray(data.interactionStatistic)
              ? data.interactionStatistic
              : [data.interactionStatistic];

            for (const statistic of statistics) {
              const interactionType = statistic.interactionType || "";
              const value = statistic.userInteractionCount;

              if (
                value !== undefined &&
                String(interactionType).toLowerCase().includes("follow")
              ) {
                profile.followerCount = Number(value);
              }
            }
          }
        }
      } catch {
        // Ignore malformed structured data.
      }
    }

    /*
     * 4. Fallback: Try regex patterns on embedded JSON state.
     */
    const followerPatterns = [
      /"edge_followed_by"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
      /"follower_count"\s*:\s*(\d+)/,
      /"followers_count"\s*:\s*(\d+)/,
    ];

    for (const pattern of followerPatterns) {
      const match = html.match(pattern);
      if (match) {
        profile.followerCount = Number(match[1]);
        break;
      }
    }

    return saveCache(profile);
  } catch (error) {
    console.error(
      "Instagram public profile lookup warning:",
      error.message
    );

    return saveCache(defaultProfile);
  }
}

module.exports = {
  fetchInstagramProfile,
};
