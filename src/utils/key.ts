import type { keys } from 'src/types/type'

export const key = (e: KeyboardEvent): keys | null => {
  if (e.code === 'Enter') {
    if ([e.ctrlKey, e.metaKey].some(Boolean)) return 'ctrlEnter'
    if (e.shiftKey) return 'shiftEnter'
    if (e.altKey) return 'altEnter'
    return 'enter'
  }
  return null
}
