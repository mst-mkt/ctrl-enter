import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.bing.com/*'],
  all_frames: true
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      e.stopPropagation()
    }
  }
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.tagName === 'CIB-SERP'
}

const addEvent = () => {
  document.addEventListener('keydown', handleKeyEvent, { capture: true })
}

chrome.storage.onChanged.addListener(async () => {
  const config = await getConfig()
  const bingConfig = config.bing
  if (bingConfig) {
    addEvent()
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
})

addEvent()
