import { Storage } from '@plasmohq/storage'

const storage = new Storage()

const isUrl = (link: string): boolean => {
  try {
    new URL(link)
    return true
  } catch (error) {
    return false
  }
}

export const addExcludes = async (link: string): Promise<string[] | null> => {
  if (!isUrl(link)) return null

  const excludes = await storage.get<string[]>('excludedUrls')
  const newExcludes = [...excludes, link]
  await storage.set('excludedUrls', newExcludes)

  return newExcludes
}

export const removeExcludes = async (
  link: string
): Promise<string[] | null> => {
  const excludes = await storage.get<string[]>('excludedUrls')
  const newExcludes = excludes.filter((url) => url !== link)
  await storage.set('excludedUrls', newExcludes)

  return newExcludes
}

export const getExcludes = async (): Promise<string[]> => {
  const excludes = await storage.get<string[]>('excludedUrls')
  return excludes ?? []
}
