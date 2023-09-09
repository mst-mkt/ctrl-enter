import { Storage } from '@plasmohq/storage'

const storage: Storage = new Storage()

export const supportSites = {
  discord: ['https://discord.com'],
  twitter: [
    'https://twitter.com',
    'https://mobile.twitter.com',
    'https://x.com'
  ],
  instagram: ['https://www.instagram.com', 'https://instagram.com'],
  chatgpt: ['https://chat.openai.com'],
  bing: ['https://www.bing.com'],
  bard: ['https://bard.google.com'],
  meet: ['https://meet.google.com/*'],
  zoom: ['https://zoom.us/wc', 'https://pwa.zoom.us/wc']
} as const

const defaultConfig: Record<keyof typeof supportSites, boolean> = {
  discord: true,
  twitter: true,
  instagram: true,
  chatgpt: true,
  bing: true,
  bard: true,
  meet: true,
  zoom: true
} as const

export const getConfig = async (): Promise<Record<string, boolean>> => {
  const configString = await storage.get('config')

  if (configString === undefined) return defaultConfig

  const config = JSON.parse(configString)
  return config ?? defaultConfig
}

export const saveConfig = async (config: Record<string, boolean>) => {
  await storage.set('config', JSON.stringify(config))
}
