import type { Keys } from 'src/types/type'

export const key = (e: KeyboardEvent): Keys | null => {
  if (e.code !== 'Enter') return null
  if ([e.ctrlKey, e.metaKey].some(Boolean)) return 'ctrlEnter'
  if (e.shiftKey) return 'shiftEnter'
  if (e.altKey) return 'altEnter'
  return 'enter'
}
