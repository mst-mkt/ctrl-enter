import type { supportSites } from './../utils/config'

export type Keys = 'enter' | 'ctrlEnter' | 'shiftEnter' | 'altEnter'

export type KeyActions = 'send' | 'newLine' | 'none'

export type SupportSitesList = keyof typeof supportSites
