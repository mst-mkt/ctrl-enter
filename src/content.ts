import type { PlasmoCSConfig } from 'plasmo'
import { WILDCARDS } from './constants/services'
import { sendController } from './features/sendControl'
import type { Services } from './types/serviceType'
import { getTriggeredElement } from './utils/triggeredElements'
import { getServiceFromUrl } from './utils/wildcard'

export const config: PlasmoCSConfig = {
  matches: WILDCARDS,
  // biome-ignore lint/style/useNamingConvention: `all_frames` is provided by the external library (Plasmo)
  all_frames: true,
}

let textAreas: HTMLElement[] = []
const handleKeydown = (e: KeyboardEvent, service: Services) => sendController[service](e)
;(() => {
  const service = getServiceFromUrl(location.href)
  const updateTextAreas = () => {
    for (const textArea of textAreas) {
      textArea.removeEventListener('keydown', (e) => handleKeydown(e, service))
    }
    textAreas = getTriggeredElement(service)
    for (const textArea of textAreas) {
      textArea.addEventListener('keydown', (e) => handleKeydown(e, service), { capture: true })
    }
  }

  new MutationObserver(updateTextAreas).observe(document.body, { childList: true, subtree: true })
  updateTextAreas()
})()
