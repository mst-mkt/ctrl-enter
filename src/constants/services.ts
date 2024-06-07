import type { Services, Wildcards } from '~/types/serviceType'

export const SERVICES = [
  'discord',
  'twitter',
  'instagram',
  'facebook',
  'zoom',
  'meet',
  'chatgpt',
  'bing',
  'gemini',
  'claude',
] as const

export const SERVICE_LABELS = {
  discord: 'Discord',
  twitter: 'Twitter (X)',
  instagram: 'Instagram',
  facebook: 'Facebook',
  zoom: 'Zoom',
  meet: 'Google Meet',
  chatgpt: 'ChatGPT',
  bing: 'Bing Chat',
  gemini: 'Gemini',
  claude: 'Claude',
} as const satisfies Record<Services, string>

export const SERVICE_URLS = {
  discord: ['https://discord.com/*'],
  twitter: ['https://twitter.com/*', 'https://*.twitter.com/*', 'https://x.com/*'],
  instagram: ['https://instagram.com/*', 'https://*.instagram.com/*'],
  chatgpt: ['https://chat.openai.com/*', 'https://chatgpt.com/*'],
  bing: ['https://www.bing.com/*'],
  gemini: ['https://bard.google.com/*', 'https://gemini.google.com/*'],
  meet: ['https://meet.google.com/*'],
  zoom: ['https://zoom.us/wc/*', 'https://*.zoom.us/wc/*'],
  facebook: ['https://facebook.com/*', 'https://*.facebook.com/*'],
  claude: ['https://claude.ai'],
} as const satisfies Record<Services, string[]>

export const WILDCARDS: Wildcards[] = Object.values(SERVICE_URLS).flat()
