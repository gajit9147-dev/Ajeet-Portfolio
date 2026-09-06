const { Octokit } = require("octokit");

const octokit = new Octokit(
  process.env.GITHUB_TOKEN ? { auth: process.env.GITHUB_TOKEN } : {}
);

const USERNAME = process.env.GITHUB_USERNAME || "gajit9147-dev";

async function getRepositories() {
  const response = await octokit.request(
    "GET /users/{username}/repos",
    {
      username: USERNAME,
      per_page: 100,
      sort: "updated",
    }
  );

  return response.data.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
    updatedAt: repo.updated_at,
    topics: repo.topics || [],
  }));
}

async function getRepository(name) {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}",
    {
      owner: USERNAME,
      repo: name,
    }
  );

  const repo = response.data;

  return {
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
    homepage: repo.homepage,
    topics: repo.topics || [],
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
  };
}

async function findRepositories(query) {
  const repositories = await getRepositories();

  const normalizedQuery = query.toLowerCase();

  return repositories
    .filter((repo) => {
      const searchable = [
        repo.name,
        repo.description,
        repo.language,
        ...repo.topics,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return normalizedQuery
        .split(/\s+/)
        .some(
          (word) =>
            word.length > 2 && searchable.includes(word)
        );
    })
    .slice(0, 5);
}

module.exports = {
  getRepositories,
  getRepository,
  findRepositories,
};
