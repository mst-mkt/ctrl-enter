import type { keyActions, keys } from 'src/types/type'

export const keyConfig: Record<keys, keyActions> = {
  enter: 'newLine',
  ctrlEnter: 'send',
  shiftEnter: 'none',
  altEnter: 'none'
}
