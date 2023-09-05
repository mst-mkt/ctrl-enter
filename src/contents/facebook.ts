import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.facebook.com/*', 'https://m.facebook.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

document.addEventListener(
  'keydown',
  (e) => {
    if (isTextArea(e)) {
      if (key(e) === 'ctrlEnter') {
        const target = e.target as HTMLElement
        const isMessage = target.getAttribute('aria-label') === 'メッセージ'
        if (isMessage) {
          const sendButton = document.querySelector(
            '[aria-label="Enterを押して送信"][role="button"]'
          ) as HTMLButtonElement | undefined
          sendButton?.click()
        }
      } else if (key(e) === 'enter') {
        e.stopPropagation()
      }
    }
  },
  { capture: true }
)
