export type ProjectStatus = 'In development' | 'In use' | 'Released'

export type ProjectMediaType = 'image' | 'video'

/**
 * A screenshot or video stored in `public/images/projects/<slug>/`.
 * `file` and `poster` are file names inside that folder.
 */
export interface ProjectMedia {
  type: ProjectMediaType
  file: string
  alt: string
  caption?: string
  poster?: string
}

export interface ProjectSection {
  title: string
  points: string[]
}

export interface Project {
  slug: string
  title: string
  framework: string
  language: string
  status: ProjectStatus
  summary: string
  highlights: string[]
  stack: string[]
  sections: ProjectSection[]
  media: ProjectMedia[]
  repoUrl?: string
}
