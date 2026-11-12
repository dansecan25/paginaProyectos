import { describe, expect, it } from 'vitest'
import type { ActivityDay, ActivityLevel } from '@/types/githubActivity'
import { isGithubActivity, monthLabels, streaks } from '../githubActivity'

/** Builds weeks of 7 days starting on `start`, with the given counts in order. */
function weeksFrom(start: string, counts: number[]): ActivityDay[][] {
  const date = new Date(`${start}T00:00:00Z`)
  const days = counts.map((count) => {
    const day = {
      date: date.toISOString().slice(0, 10),
      count,
      level: Math.min(count, 4) as ActivityLevel,
    }
    date.setUTCDate(date.getUTCDate() + 1)
    return day
  })
  const weeks: ActivityDay[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

describe('monthLabels', () => {
  it('labels the first week of each month', () => {
    const weeks = weeksFrom('2026-01-04', new Array(7 * 12).fill(0))
    expect(monthLabels(weeks)).toEqual([
      { week: 0, label: 'Jan' },
      { week: 4, label: 'Feb' },
      { week: 8, label: 'Mar' },
    ])
  })

  it('drops a label that would overlap the next one', () => {
    // Dec 28 starts the first column, so "Jan" follows one column later.
    const weeks = weeksFrom('2025-12-28', new Array(7 * 9).fill(0))
    expect(monthLabels(weeks).map((label) => label.label)).toEqual(['Jan', 'Feb'])
  })
})

describe('streaks', () => {
  it('finds the longest and current streaks', () => {
    const weeks = weeksFrom('2026-01-04', [1, 1, 1, 0, 2, 2, 0, 1, 1, 1, 1, 0, 3, 3])
    expect(streaks(weeks)).toEqual({ current: 2, longest: 4 })
  })

  it('keeps the current streak when today has no contributions yet', () => {
    const weeks = weeksFrom('2026-01-04', [0, 1, 1, 1, 0])
    expect(streaks(weeks).current).toBe(3)
  })

  it('is zero without contributions', () => {
    expect(streaks(weeksFrom('2026-01-04', [0, 0, 0]))).toEqual({ current: 0, longest: 0 })
  })
})

describe('isGithubActivity', () => {
  const valid = {
    login: 'someone',
    generatedAt: '2026-11-12T06:00:00Z',
    totalContributions: 3,
    weeks: weeksFrom('2026-01-04', [1, 2, 0]),
  }

  it('accepts the generated file', () => {
    expect(isGithubActivity(valid)).toBe(true)
  })

  it('rejects broken files', () => {
    expect(isGithubActivity(null)).toBe(false)
    expect(isGithubActivity({ ...valid, weeks: 'nope' })).toBe(false)
    expect(isGithubActivity({ ...valid, weeks: [[{ date: '2026-01-04', count: 1, level: 7 }]] })).toBe(
      false,
    )
  })
})
