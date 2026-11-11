const PROJECT_MEDIA_DIR = 'images/projects'

/** Resolves a file in `public/` against the site's base path (GitHub Pages sub-path). */
export const publicAssetUrl = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

/** URL of a screenshot or video stored in `public/images/projects/<slug>/`. */
export const projectMediaUrl = (slug: string, file: string): string =>
  publicAssetUrl(`${PROJECT_MEDIA_DIR}/${slug}/${file}`)
