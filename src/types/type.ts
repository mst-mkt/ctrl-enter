import type { supportSites } from './../utils/config'

export type keys = 'enter' | 'ctrlEnter' | 'shiftEnter' | 'altEnter'

export type keyActions = 'send' | 'newLine' | 'none'

export type supportSitesList = keyof typeof supportSites
