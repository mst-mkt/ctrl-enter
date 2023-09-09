import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
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
  message: (elm: HTMLElement) => {
    const isMessage = elm.getAttribute('data-testid') === 'dmComposerTextInput'

    if (isMessage) {
      const button = document.querySelector(
        '[role="button"][data-testid="dmComposerSendButton"]'
      ) as HTMLButtonElement | undefined

      return button
    }

    return undefined
  }
}

const addEvent = () => {
  document.addEventListener('keydown', ctrlEnter, { capture: true })
}

chrome.storage.onChanged.addListener(async () => {
  const config = await getConfig()
  const twitterConfig = config.twitter

  if (twitterConfig) {
    addEvent()
  } else {
    document.removeEventListener('keydown', ctrlEnter, { capture: true })
  }
})

const ctrlEnter = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'ctrlEnter') {
      const target = e.target as HTMLElement
      sendButton.message(target)?.click()
    } else if (key(e) === 'enter') {
      e.stopPropagation()
    }
  }
}

addEvent()
