import type { PlasmoCSConfig } from 'plasmo'
import { WILDCARDS } from './constants/services'
import { getEventKey } from './utils/getEventKey'
import { getServiceFromUrl } from './utils/wildcard'

export const config: PlasmoCSConfig = {
  matches: WILDCARDS,
  // biome-ignore lint/style/useNamingConvention: `all_frames` is provided by the external library (Plasmo)
  all_frames: true,
}
;(() => {
  const service = getServiceFromUrl(location.href)
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    const key = getEventKey(e)

    // console.log('service:', service ?? 'null', 'key:', key, new Date().toISOString())
  }
  document.addEventListener('keydown', handleKeyDown)
})()
