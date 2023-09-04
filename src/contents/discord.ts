import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://discord.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

console.log('nya')

document.addEventListener(
  'keydown',
  (e) => {
    console.log('nya')
    if (isTextArea(e)) {
      if (key(e) === 'enter') {
        e.stopPropagation()
      }
    }
  },
  { capture: true }
)
