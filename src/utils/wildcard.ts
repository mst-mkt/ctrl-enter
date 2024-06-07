import { SERVICE_URLS } from '~/constants/services'
import type { Services, Wildcards } from '~/types/serviceType'

export const wildcardToRegExp = (wildcard: Wildcards): RegExp => {
  const regex = wildcard.replace(/\*/g, '[a-zA-Z0-9-]*')
  return new RegExp(`^${regex}$`)
}

export const getServiceFromUrl = (url: string): Services | null => {
  const entries = Object.entries(SERVICE_URLS) as [Services, (typeof SERVICE_URLS)[Services]][]
  const service = entries.find(([_, wildcards]) =>
    wildcards.map(wildcardToRegExp).some((regex) => regex.test(url)),
  )?.[0]
  return service || null
}
