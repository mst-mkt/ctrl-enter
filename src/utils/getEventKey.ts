import type { Keys } from '~/types/keysType'

const getIsCtrlKey = (ctrlKey: boolean, metaKey: boolean): boolean =>
  (ctrlKey && !metaKey) || (!ctrlKey && metaKey)

export const getEventKey = (e: KeyboardEvent): Keys => {
  const { key, ctrlKey, shiftKey, altKey, metaKey } = e
  if (key !== 'Enter') return 'others'

  if (getIsCtrlKey(ctrlKey, metaKey)) return 'ctrl-enter'
  if (shiftKey) return 'shift-enter'
  if (altKey) return 'alt-enter'

  return 'enter'
}
