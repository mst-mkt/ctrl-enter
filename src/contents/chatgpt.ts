import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.tagName === 'TEXTAREA'
}

const sendButton = {
  send: (elm: HTMLElement) =>
    elm.nextElementSibling as HTMLButtonElement | undefined,
  edit: (elm: HTMLElement) =>
    elm.nextElementSibling?.getElementsByTagName('button')[0]
}

document.addEventListener(
  'keydown',
  (e) => {
    if (isTextArea(e)) {
      e.stopPropagation()
      if (key(e) === 'ctrlEnter') {
        const target = e.target as HTMLElement
        const action = target.id === 'prompt-textarea' ? 'send' : 'edit'
        const button = sendButton[action](e.target as HTMLElement)
        button?.click()
      }
    }
  },
  { capture: true }
)