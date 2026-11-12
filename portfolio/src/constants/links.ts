/** Public profiles, shared by the navbar, footer and Links page. */

export const GITHUB_LOGIN = 'dansecan25'

export type SocialNetwork = 'github' | 'linkedin' | 'instagram'

export interface SocialLink {
  network: SocialNetwork
  label: string
  handle: string
  url: string
  description: string
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    network: 'github',
    label: 'GitHub',
    handle: GITHUB_LOGIN,
    url: `https://github.com/${GITHUB_LOGIN}`,
    description: 'Source code for my projects, with releases you can download and install.',
  },
  {
    network: 'linkedin',
    label: 'LinkedIn',
    handle: 'dansecan',
    url: 'https://www.linkedin.com/in/dansecan',
    description: 'Work experience, education and what I’m currently learning.',
  },
  {
    network: 'instagram',
    label: 'Instagram',
    handle: 'dansecan25',
    url: 'https://www.instagram.com/dansecan25',
    description: 'The more personal side.',
  },
]

export const GITHUB_PROFILE_URL = SOCIAL_LINKS[0]!.url

/** Written by scripts/fetch-github-activity.mjs during the deploy, served from `public/`. */
export const GITHUB_ACTIVITY_FILE = 'data/github-activity.json'
