import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.instagram.com/*', 'https://instagram.com/*'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const sendButton = {
  message: (elm: HTMLElement) =>
    elm.parentElement?.parentElement?.nextElementSibling as HTMLElement | undefined,
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      e.stopPropagation()
    } else if (key(e) === 'ctrlEnter') {
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
  const instagramConfig = config.instagram

  if (instagramConfig) {
    document.addEventListener('keydown', handleKeyEvent, { capture: true })
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
}

chrome.storage.onChanged.addListener(() => {
  handleEvent()
})

handleEvent()
