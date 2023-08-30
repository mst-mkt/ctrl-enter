import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.bing.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  const isChatTextbox = [
    target.tagName === 'TEXTAREA',
    target.getAttribute('name') === 'searchbox'
  ].every(Boolean)
  return isChatTextbox
}

document.addEventListener(
  'keydown',
  (e) => {
    if (isTextArea(e)) {
      console.log('nya')
      if (key(e) === 'enter') {
        console.log('nya1')
        e.stopPropagation()
      }
    }
  },
  { capture: true }
)
