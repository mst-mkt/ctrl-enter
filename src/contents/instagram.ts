import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.instagram.com/*', 'https://instagram.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

const sendButton = {
  message: (elm: HTMLElement) =>
    elm.parentElement?.parentElement?.nextElementSibling as
      | HTMLElement
      | undefined
}

document.addEventListener(
  'keydown',
  (e) => {
    if (isTextArea(e)) {
      if (key(e) === 'enter') {
        e.stopPropagation()
      } else if (key(e) === 'ctrlEnter') {
        const target = e.target as HTMLElement
        const isMessage = target.getAttribute('aria-label') === 'メッセージ'
        if (isMessage) {
          sendButton.message(target)?.click()
        }
      }
    }
  },
  { capture: true }
)
