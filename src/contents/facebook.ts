import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.facebook.com/*', 'https://facebook.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

const sendButton = {
  message: (elm: HTMLElement) =>
    elm.parentElement?.parentElement?.parentElement?.parentElement
      ?.parentElement?.nextElementSibling?.firstChild as HTMLElement | undefined
}

const addEvent = () => {
  document.addEventListener('keydown', ctrlEnter, { capture: true })
}

chrome.storage.onChanged.addListener(async () => {
  const config = await getConfig()
  const facebookConfig = config.facebook

  if (facebookConfig) {
    addEvent()
  } else {
    document.removeEventListener('keydown', ctrlEnter, { capture: true })
  }
})

const ctrlEnter = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      e.stopPropagation()
    } else if (key(e) === 'ctrlEnter') {
      const target = e.target as HTMLElement
      sendButton.message(target)?.click()
    }
  }
}

addEvent()
