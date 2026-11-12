/** 0 = no contributions, 4 = the busiest days, as GitHub ranks them. */
export type ActivityLevel = 0 | 1 | 2 | 3 | 4

export interface ActivityDay {
  /** YYYY-MM-DD */
  date: string
  count: number
  level: ActivityLevel
}

/** Shape of public/data/github-activity.json. */
export interface GithubActivity {
  login: string
  /** ISO timestamp of the fetch. */
  generatedAt: string
  totalContributions: number
  /** Columns of the graph, each from Sunday to Saturday. The first and last can be partial. */
  weeks: ActivityDay[][]
}
