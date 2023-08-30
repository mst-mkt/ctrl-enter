import type { PlasmoCSConfig } from 'plasmo'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: [
    'https://twitter.com/*',
    'https://mobile.twitter.com/*',
    'https://x.com/*'
  ],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

const sendButton = {
  message: () =>
    document.querySelector(
      '[role="button"][data-testid="dmComposerSendButton"]'
    ) as HTMLButtonElement | undefined
}

document.addEventListener(
  'keydown',
  (e) => {
    if (isTextArea(e)) {
      if (key(e) === 'ctrlEnter') {
        const target = e.target as HTMLElement
        const isMessage =
          target.getAttribute('data-testid') === 'dmComposerTextInput'
        if (isMessage) {
          sendButton.message()?.click()
        }
      } else if (key(e) === 'enter') {
        e.stopPropagation()
      }
    }
  },
  { capture: true }
)
