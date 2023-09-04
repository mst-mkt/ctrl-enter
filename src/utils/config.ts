import { Storage } from '@plasmohq/storage'

const storage: Storage = new Storage()

const defaultConfig: Record<string, boolean> = {
  discord: true,
  twitter: true,
  instagram: true,
  chatgpt: true,
  bing: true,
  bard: true
} as const

export const supportSites: Array<keyof typeof defaultConfig> =
  Object.keys(defaultConfig)

export const getConfig = async (): Promise<Record<string, boolean>> => {
  const configString = await storage.get('config')

  if (configString === undefined) return defaultConfig

  const config = JSON.parse(configString)
  return config ?? defaultConfig
}

export const saveConfig = async (config: Record<string, boolean>) => {
  await storage.set('config', JSON.stringify(config))
}
