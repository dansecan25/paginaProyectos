/**
 * Writes the last year of GitHub contributions to public/data/github-activity.json,
 * for the activity graph on the Links page.
 *
 *   ACTIVITY_LOGIN=<github-user> ACTIVITY_GITHUB_TOKEN=<token> node scripts/fetch-github-activity.mjs
 *
 * Without a token it only prints a warning, and the page hides the graph. If the request
 * fails it exits with an error, so a deploy keeps the version that is already online.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/github-activity.json')

const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { date contributionCount contributionLevel }
          }
        }
      }
    }
  }
`

const login = process.env.ACTIVITY_LOGIN
const token = process.env.ACTIVITY_GITHUB_TOKEN

if (!login || !token) {
  console.warn('::warning::ACTIVITY_LOGIN or ACTIVITY_GITHUB_TOKEN is not set, skipping the GitHub activity graph.')
  process.exit(0)
}

const response = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-activity-graph',
  },
  body: JSON.stringify({ query: QUERY, variables: { login } }),
})

const body = await response.json().catch(() => null)
const calendar = body?.data?.user?.contributionsCollection?.contributionCalendar
if (!response.ok || !calendar) {
  const reason = body?.errors?.map((error) => error.message).join('; ') || body?.message || response.statusText
  console.error(`::error::GitHub activity request failed (${response.status}): ${reason}`)
  process.exit(1)
}

const activity = {
  login,
  generatedAt: new Date().toISOString(),
  totalContributions: calendar.totalContributions,
  weeks: calendar.weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVELS[day.contributionLevel] ?? 0,
    })),
  ),
}

await mkdir(dirname(OUTPUT), { recursive: true })
await writeFile(OUTPUT, `${JSON.stringify(activity)}\n`)
console.log(`Wrote ${activity.totalContributions} contributions over ${activity.weeks.length} weeks.`)
