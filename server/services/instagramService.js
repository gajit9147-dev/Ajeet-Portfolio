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

async function fetchInstagramProfile() {
  const cached = getCachedProfile();

  if (cached) {
    return cached;
  }

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
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(
        `Instagram profile request failed: ${response.status}`
      );
    }

    const html = await response.text();

    /*
     * Instagram may expose profile metadata inside
     * publicly served HTML / structured metadata.
     *
     * We only extract information that is already
     * publicly delivered by Instagram.
     */

    const profile = {
      username: INSTAGRAM_USERNAME,
      profileUrl: INSTAGRAM_PROFILE_URL,
      followerCount: null,
      followingCount: null,
      postCount: null,
      fullName: null,
      biography: null,
      isVerified: null,
      source: "Instagram public profile",
      retrievedAt: new Date().toISOString(),
    };

    /*
     * Try JSON-LD structured data first.
     */
    const jsonLdMatches = [
      ...html.matchAll(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      ),
    ];

    for (const match of jsonLdMatches) {
      try {
        const parsed = JSON.parse(match[1]);

        const data = Array.isArray(parsed)
          ? parsed[0]
          : parsed;

        if (data) {
          profile.fullName =
            data.name || profile.fullName;

          profile.biography =
            data.description ||
            profile.biography;

          if (data.interactionStatistic) {
            const statistics = Array.isArray(
              data.interactionStatistic
            )
              ? data.interactionStatistic
              : [data.interactionStatistic];

            for (const statistic of statistics) {
              const interactionType =
                statistic.interactionType || "";

              const value =
                statistic.userInteractionCount;

              if (
                value !== undefined &&
                String(interactionType)
                  .toLowerCase()
                  .includes("follow")
              ) {
                profile.followerCount =
                  Number(value);
              }
            }
          }
        }
      } catch {
        // Ignore malformed structured data.
      }
    }

    /*
     * Try common public metadata patterns.
     *
     * These patterns are intentionally defensive.
     * If Instagram does not expose the information,
     * the value remains null.
     */

    const followerPatterns = [
      /"edge_followed_by"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
      /"follower_count"\s*:\s*(\d+)/,
      /"followers_count"\s*:\s*(\d+)/,
    ];

    const followingPatterns = [
      /"edge_follow"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
      /"following_count"\s*:\s*(\d+)/,
    ];

    const postPatterns = [
      /"edge_owner_to_timeline_media"\s*:\s*\{\s*"count"\s*:\s*(\d+)/,
      /"media_count"\s*:\s*(\d+)/,
      /"post_count"\s*:\s*(\d+)/,
    ];

    for (const pattern of followerPatterns) {
      const match = html.match(pattern);

      if (match) {
        profile.followerCount =
          Number(match[1]);
        break;
      }
    }

    for (const pattern of followingPatterns) {
      const match = html.match(pattern);

      if (match) {
        profile.followingCount =
          Number(match[1]);
        break;
      }
    }

    for (const pattern of postPatterns) {
      const match = html.match(pattern);

      if (match) {
        profile.postCount =
          Number(match[1]);
        break;
      }
    }

    /*
     * Only return a successful profile if Instagram
     * actually gave us usable public information.
     */
    return saveCache(profile);
  } catch (error) {
    console.error(
      "Instagram public profile lookup failed:",
      error.message
    );

    /*
     * Never fabricate Instagram statistics.
     *
     * Returning the approved public profile URL is
     * safe even when live metadata is unavailable.
     */
    return {
      username: INSTAGRAM_USERNAME,
      profileUrl: INSTAGRAM_PROFILE_URL,
      followerCount: null,
      followingCount: null,
      postCount: null,
      fullName: null,
      biography: null,
      isVerified: null,
      source: "Approved public Instagram profile",
      retrievedAt: new Date().toISOString(),
      unavailable: true,
    };
  }
}

module.exports = {
  fetchInstagramProfile,
};
