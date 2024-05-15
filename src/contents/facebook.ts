import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.facebook.com/*', 'https://facebook.com/*'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const sendButton = {
  message: (elm: HTMLElement) =>
    elm.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
      ?.nextElementSibling?.firstChild as HTMLElement | undefined,
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      e.stopPropagation()
    } else if (key(e) === 'ctrlEnter') {
      e.stopPropagation()
      const target = e.target as HTMLElement
      sendButton.message(target)?.click()
    }
  }
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

const handleEvent = async () => {
  const config = await getConfig()
  const facebookConfig = config.facebook

  if (facebookConfig) {
    document.addEventListener('keydown', handleKeyEvent, { capture: true })
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
}

chrome.storage.onChanged.addListener(() => {
  handleEvent()
})

handleEvent()
