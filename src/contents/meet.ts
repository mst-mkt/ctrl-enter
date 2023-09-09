import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://meet.google.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.tagName === 'TEXTAREA'
}

const sendButton = (elm: HTMLElement) =>
  elm.parentElement?.parentElement?.nextElementSibling?.getElementsByTagName(
    'button'
  )[0]

document.addEventListener(
  'keydown',
  (e) => {
    if (isTextArea(e)) {
      if (key(e) === 'enter') {
        e.stopPropagation()
      } else if (key(e) === 'ctrlEnter') {
        const target = e.target as HTMLElement
        const button = sendButton(target)
        button?.click()
      }
    }
  },
  { capture: true }
)
