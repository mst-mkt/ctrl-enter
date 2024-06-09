import type { PlasmoCSConfig } from 'plasmo'
import { WILDCARDS } from './constants/services'
import { send } from './features/send'
import { getEventKey } from './utils/getEventKey'
import { getTriggeredElement } from './utils/triggeredElements'
import { getServiceFromUrl } from './utils/wildcard'

export const config: PlasmoCSConfig = {
  matches: WILDCARDS,
  // biome-ignore lint/style/useNamingConvention: `all_frames` is provided by the external library (Plasmo)
  all_frames: true,
}
;(() => {
  const service = getServiceFromUrl(location.href)
  const textAreas = getTriggeredElement(service)

  for (const textArea of textAreas) {
    textArea.onkeydown = (e) => {
      const key = getEventKey(e)
      if (key === 'enter') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }

      if (key === 'ctrl-enter') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()

        send[service](e)
      }
    }
  }
})()
