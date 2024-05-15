import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://zoo.us/wc/*', 'https://*.zoom.us/wc/*'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const sendButton = (elm: HTMLElement) =>
  elm.parentElement?.parentElement?.nextElementSibling?.getElementsByTagName('button')[0]

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.contentEditable === 'true'
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      const keyEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
        key: 'Enter',
        keyCode: 13,
        shiftKey: true,
      })
      e.target?.dispatchEvent(keyEvent)
      e.preventDefault()
    } else if (key(e) === 'ctrlEnter') {
      const target = e.target as HTMLElement
      const button = sendButton(target)
      button?.click()
    }
  }
}

const handleEvent = async () => {
  const config = await getConfig()
  const instagramConfig = config.zoom

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
