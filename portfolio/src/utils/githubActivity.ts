import type { ActivityDay, GithubActivity } from '@/types/githubActivity'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Month labels need about three columns of room so they don't overlap. */
const MIN_LABEL_GAP = 3

export interface MonthLabel {
  week: number
  label: string
}

export interface Streaks {
  current: number
  longest: number
}

/** Month of a YYYY-MM-DD date, without time zone conversions. */
const monthOf = (date: string): number => Number(date.slice(5, 7)) - 1

/** A label above the first column of each month. */
export function monthLabels(weeks: ActivityDay[][]): MonthLabel[] {
  const labels: MonthLabel[] = []
  let previousMonth = -1
  weeks.forEach((week, index) => {
    const first = week[0]
    if (!first) return
    const month = monthOf(first.date)
    if (month === previousMonth) return
    previousMonth = month
    const last = labels[labels.length - 1]
    if (last && index - last.week < MIN_LABEL_GAP) labels.pop()
    labels.push({ week: index, label: MONTHS[month]! })
  })
  // A month that starts in the last columns has no room for its label.
  const last = labels[labels.length - 1]
  if (last && weeks.length - last.week < MIN_LABEL_GAP && labels.length > 1) labels.pop()
  return labels
}

/**
 * Consecutive days with contributions. Today may not have any yet, so the
 * current streak can also end yesterday.
 */
export function streaks(weeks: ActivityDay[][]): Streaks {
  const days = weeks.flat()
  let longest = 0
  let run = 0
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0
    longest = Math.max(longest, run)
  }
  let end = days.length - 1
  if (end >= 0 && days[end]!.count === 0) end -= 1
  let current = 0
  while (end >= 0 && days[end]!.count > 0) {
    current += 1
    end -= 1
  }
  return { current, longest }
}

/** Checks the downloaded JSON, so a broken file hides the graph instead of breaking the page. */
export function isGithubActivity(value: unknown): value is GithubActivity {
  if (typeof value !== 'object' || value === null) return false
  const data = value as Partial<GithubActivity>
  return (
    typeof data.login === 'string' &&
    typeof data.generatedAt === 'string' &&
    typeof data.totalContributions === 'number' &&
    Array.isArray(data.weeks) &&
    data.weeks.every(
      (week) =>
        Array.isArray(week) &&
        week.every(
          (day) =>
            typeof day?.date === 'string' &&
            typeof day.count === 'number' &&
            [0, 1, 2, 3, 4].includes(day.level),
        ),
    )
  )
}
