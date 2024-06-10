import type { PlasmoCSConfig } from 'plasmo'
import { WILDCARDS } from './constants/services'
import { getTriggeredTextBoxes } from './features/getTextBoxes'
import { sendController } from './features/sendControl'
import { getServiceFromUrl } from './utils/wildcard'

export const config: PlasmoCSConfig = {
  matches: WILDCARDS,
  // biome-ignore lint/style/useNamingConvention: `all_frames` is provided by the external library (Plasmo)
  all_frames: true,
}
;(() => {
  let textAreas: HTMLElement[] = []
  const serviceName = getServiceFromUrl(location.href)

  const handleKeydown = (e: KeyboardEvent) => sendController[serviceName](e)
  const updateTextAreas = () => {
    for (const textArea of textAreas) {
      textArea.removeEventListener('keydown', handleKeydown)
    }
    textAreas = getTriggeredTextBoxes(serviceName)
    for (const textArea of textAreas) {
      textArea.addEventListener('keydown', handleKeydown, { capture: true })
    }
  }

  new MutationObserver(updateTextAreas).observe(document.body, { childList: true, subtree: true })
  updateTextAreas()
})()
