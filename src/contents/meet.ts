import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://meet.google.com/*'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const sendButton = (elm: HTMLElement) =>
  elm.parentElement?.parentElement?.nextElementSibling?.getElementsByTagName('button')[0]

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      e.stopPropagation()
    } else if (key(e) === 'ctrlEnter') {
      const target = e.target as HTMLElement
      const button = sendButton(target)
      button?.click()
    }
  }
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.tagName === 'TEXTAREA'
}

const handleEvent = async () => {
  const config = await getConfig()
  const meetConfig = config.meet

  if (meetConfig) {
    document.addEventListener('keydown', handleKeyEvent, { capture: true })
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
}

chrome.storage.onChanged.addListener(() => {
  handleEvent()
})

handleEvent()
