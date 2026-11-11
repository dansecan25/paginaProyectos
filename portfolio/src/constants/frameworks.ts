export interface BadgeColors {
  background: string
  text: string
}

const DEFAULT_BADGE: BadgeColors = { background: '#423f43', text: '#ffffff' }

/** Badge colors per framework, following the Figma mockup. */
const FRAMEWORK_BADGES: Record<string, BadgeColors> = {
  Flutter: { background: '#0175c2', text: '#ffffff' },
  Vue: { background: '#0f7c6c', text: '#ffffff' },
  'React Native': { background: '#00d1e0', text: '#002b30' },
  'React + Tauri': { background: '#e66b0a', text: '#ffffff' },
  egui: { background: '#8a00e6', text: '#ffffff' },
  'Arch Linux': { background: '#1fd655', text: '#002b0d' },
}

export const getFrameworkBadge = (framework: string): BadgeColors =>
  FRAMEWORK_BADGES[framework] ?? DEFAULT_BADGE
