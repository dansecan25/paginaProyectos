<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { GITHUB_ACTIVITY_FILE } from '@/constants/links'
import type { GithubActivity } from '@/types/githubActivity'
import { publicAssetUrl } from '@/utils/assets'
import { isGithubActivity, monthLabels, streaks } from '@/utils/githubActivity'

const CELL = 13
const DOT_RADIUS = 4.6
const LEFT = 30
const TOP = 18
const WEEKDAY_LABELS = [
  { row: 1, label: 'Mon' },
  { row: 3, label: 'Wed' },
  { row: 5, label: 'Fri' },
]
const LEGEND_LEVELS = [0, 1, 2, 3, 4] as const

const activity = ref<GithubActivity | null>(null)

onMounted(async () => {
  try {
    const response = await fetch(publicAssetUrl(GITHUB_ACTIVITY_FILE))
    if (!response.ok) return
    const data: unknown = await response.json()
    if (isGithubActivity(data)) activity.value = data
  } catch {
    // No data yet (for example in local development): the graph stays hidden.
  }
})

const width = computed(() => LEFT + (activity.value?.weeks.length ?? 0) * CELL)
const height = TOP + 7 * CELL
const months = computed(() => (activity.value ? monthLabels(activity.value.weeks) : []))
const streak = computed(() => (activity.value ? streaks(activity.value.weeks) : null))

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })
const formatDay = (date: string) => dateFormat.format(new Date(`${date}T00:00:00Z`))
const updated = computed(() =>
  activity.value ? dateFormat.format(new Date(activity.value.generatedAt)) : '',
)

const dayTitle = (count: number, date: string) =>
  `${count === 0 ? 'No' : count} contribution${count === 1 ? '' : 's'} on ${formatDay(date)}`

const summary = computed(() => {
  const data = activity.value
  if (!data || !streak.value) return ''
  return `GitHub activity for ${data.login}: ${data.totalContributions} contributions in the last year, longest streak ${streak.value.longest} days.`
})
</script>

<template>
  <figure v-if="activity && streak" class="activity">
    <dl class="activity__stats">
      <div>
        <dt>Contributions in the last year</dt>
        <dd>{{ activity.totalContributions.toLocaleString('en') }}</dd>
      </div>
      <div>
        <dt>Longest streak</dt>
        <dd>{{ streak.longest }} days</dd>
      </div>
      <div>
        <dt>Current streak</dt>
        <dd>{{ streak.current }} days</dd>
      </div>
    </dl>

    <div class="activity__scroll">
      <svg
        class="activity__graph"
        :viewBox="`0 0 ${width} ${height}`"
        role="img"
        :aria-label="summary"
      >
        <text
          v-for="month in months"
          :key="month.week"
          class="activity__label"
          :x="LEFT + month.week * CELL"
          :y="TOP - 7"
        >
          {{ month.label }}
        </text>
        <text
          v-for="weekday in WEEKDAY_LABELS"
          :key="weekday.label"
          class="activity__label"
          :x="0"
          :y="TOP + weekday.row * CELL + CELL / 2 + 3"
        >
          {{ weekday.label }}
        </text>
        <g v-for="(week, column) in activity.weeks" :key="column">
          <circle
            v-for="day in week"
            :key="day.date"
            :class="`activity__dot activity__dot--${day.level}`"
            :cx="LEFT + column * CELL + CELL / 2"
            :cy="TOP + new Date(`${day.date}T00:00:00Z`).getUTCDay() * CELL + CELL / 2"
            :r="DOT_RADIUS"
          >
            <title>{{ dayTitle(day.count, day.date) }}</title>
          </circle>
        </g>
      </svg>
    </div>

    <figcaption class="activity__footer">
      <span>Updated {{ updated }}</span>
      <span class="activity__legend" aria-hidden="true">
        Less
        <svg v-for="level in LEGEND_LEVELS" :key="level" width="12" height="12" viewBox="0 0 12 12">
          <circle :class="`activity__dot activity__dot--${level}`" cx="6" cy="6" r="4.6" />
        </svg>
        More
      </span>
    </figcaption>
  </figure>
</template>

<style scoped>
.activity {
  margin: 0;
}

.activity__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.activity__stats div {
  padding: 12px 14px;
  border: 1px solid var(--color-accent-soft);
  border-radius: var(--radius-md);
  background: var(--color-surface-accent);
}

.activity__stats dt {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.activity__stats dd {
  margin-top: 4px;
  font-family: var(--font-mono);
  font-size: 1.4rem;
  color: var(--color-accent);
  text-shadow: 0 0 12px var(--color-accent-soft);
}

/* The graph keeps a readable size on phones and scrolls inside its box instead of the page. */
.activity__scroll {
  overflow-x: auto;
  padding-bottom: 4px;
}

.activity__graph {
  display: block;
  width: 100%;
  min-width: 640px;
  height: auto;
}

.activity__label {
  font-family: var(--font-mono);
  font-size: 9px;
  fill: var(--color-text-subtle);
}

.activity__dot--0 {
  fill: var(--color-activity-0);
}
.activity__dot--1 {
  fill: var(--color-activity-1);
}
.activity__dot--2 {
  fill: var(--color-activity-2);
}
.activity__dot--3 {
  fill: var(--color-activity-3);
}
.activity__dot--4 {
  fill: var(--color-activity-4);
  filter: drop-shadow(0 0 2px var(--color-accent));
}

.activity__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  font-size: 0.8rem;
  color: var(--color-text-subtle);
}

.activity__legend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
