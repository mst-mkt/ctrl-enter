import { Storage } from '@plasmohq/storage'

const storage: Storage = new Storage()

export const supportSites = {
  discord: ['https://discord.com'],
  twitter: ['https://twitter.com', 'https://mobile.twitter.com', 'https://x.com'],
  instagram: ['https://www.instagram.com', 'https://instagram.com'],
  chatgpt: ['https://chat.openai.com', 'https://chatgpt.com'],
  bing: ['https://www.bing.com'],
  bard: ['https://bard.google.com'],
  meet: ['https://meet.google.com/*'],
  zoom: ['https://zoom.us/wc', 'https://pwa.zoom.us/wc'],
  facebook: ['https://www.facebook.com', 'https://facebook.com'],
  claude: ['https://claude.ai'],
} as const

const defaultConfig: Record<keyof typeof supportSites, boolean> = {
  discord: true,
  twitter: true,
  instagram: true,
  chatgpt: true,
  bing: true,
  bard: true,
  meet: true,
  zoom: true,
  facebook: true,
  claude: true,
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

const defaultSetting = {
  入力方法を表示する: true,
}

export const getSetting = async () => {
  const settingString = await storage.get('setting')

  if (settingString === undefined) return defaultSetting

  const setting = JSON.parse(settingString)
  return setting ?? defaultConfig
}

export const saveSetting = async (setting: Record<string, boolean>) => {
  await storage.set('setting', JSON.stringify(setting))
}
