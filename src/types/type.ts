import type { supportSites } from './../utils/config'

export type keys = 'enter' | 'handleKeyEvent' | 'shiftEnter' | 'altEnter'

export type keyActions = 'send' | 'newLine' | 'none'

export type supportSitesList = keyof typeof supportSites
