import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://zoom.us/wc/*', 'https://pwa.zoom.us/wc/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.contentEditable === 'true'
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
        const keyEvent = new KeyboardEvent('keydown', {
          code: 'Enter',
          key: 'Enter',
          keyCode: 13,
          shiftKey: true
        })
        e.target?.dispatchEvent(keyEvent)
        e.preventDefault()
      } else if (key(e) === 'ctrlEnter') {
        const target = e.target as HTMLElement
        const button = sendButton(target)
        button?.click()
      }
    }
  },
  { capture: true }
)
