import type { Component } from 'vue'
import GithubIcon from '@/assets/icons/github-142-svgrepo.svg?component'
import InstagramIcon from '@/assets/icons/instagram-svgrepo.svg?component'
import LinkedinIcon from '@/assets/icons/linkedin-svgrepo.svg?component'
import type { SocialNetwork } from './links'

export const SOCIAL_ICONS: Record<SocialNetwork, Component> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
}
