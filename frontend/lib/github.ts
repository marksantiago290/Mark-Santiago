import { GithubRepo } from "./types"

const GitHubAccessToken = process.env.GITH_ACCESS_TOKEN

const tempData = {
  "login": "marksantiago2909",
  "id": 133281370,
  "node_id": "U_kgDOB_G2Wg",
  "avatar_url": "https://avatars.githubusercontent.com/u/133281370?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/marksantiago2909",
  "html_url": "https://github.com/marksantiago2909",
  "followers_url": "https://api.github.com/users/marksantiago2909/followers",
  "following_url": "https://api.github.com/users/marksantiago2909/following{/other_user}",
  "gists_url": "https://api.github.com/users/marksantiago2909/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/marksantiago2909/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/marksantiago2909/subscriptions",
  "organizations_url": "https://api.github.com/users/marksantiago2909/orgs",
  "repos_url": "https://api.github.com/users/marksantiago2909/repos",
  "events_url": "https://api.github.com/users/marksantiago2909/events{/privacy}",
  "received_events_url": "https://api.github.com/users/marksantiago2909/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "MARK",
  "company": "Freelance",
  "blog": "",
  "location": "Angeles, Philippines",
  "email": null,
  "hireable": true,
  "bio": "A critical and forward thinking fullstack developer && blockchain engineer",
  "twitter_username": "marksantiago2909",
  "public_repos": 97,
  "public_gists": 0,
  "followers": 656,
  "following": 7,
  "created_at": "2023-05-11T21:47:48Z",
  "updated_at": "2024-11-30T14:05:56Z"
}

// its for /api/stats/github
export async function fetchGithub() {
  const fake = false
  if (fake) return tempData

  return fetch(
    "https://api.github.com/users/marksantiago2909",
    {
      headers: {
        Authorization: `Bearer ${GitHubAccessToken}`,
      },
    }
  ).then((res) => res.json())
}

// its for getting temporary old data
export function getOldStats() {
  return tempData
}

/* Retrieves the number of stars and forks for the user's repositories on GitHub. */
export async function getGithubStarsAndForks() {
  // Fetch user's repositories from the GitHub API
  const res = await fetch(
    "https://api.github.com/users/marksantiago2909/repos?per_page=100",
    // {
    //   headers: {
    //     Authorization: `Bearer ${GitHubAccessToken}`,
    //   },
    // }
  )
  const userRepos = await res.json()

  /* Default Static Data: If use exceeded the rate limit of api */
  if (
    (userRepos.documentation_url ===
      "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting")
  ) {
    return {
      githubStars: 7,
      forks: 4,
    }
  }
  // filter those repos that are forked
  // const mineRepos: GithubRepo[] = userRepos?.filter(
  //   (repo: GithubRepo) => !repo.fork
  // )

  // Calculate the total number of stars for the user's repositories
  const githubStars = userRepos.reduce(
    (accumulator: number, repository: GithubRepo) => {
      return accumulator + repository["stargazers_count"]
    },
    0
  )

  // Calculate the total number of forks for the user's repositories
  const forks = userRepos.reduce(
    (accumulator: number, repository: GithubRepo) => {
      return accumulator + repository["forks_count"]
    },
    0
  )

  return { githubStars, forks }
}
