import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/*', 'https://chatgpt.com/*'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const sendButton = {
  send: (elm: HTMLElement) =>
    elm.parentElement?.querySelector('[data-testid="send-button"]') as
      | HTMLButtonElement
      | undefined,
  edit: (elm: HTMLElement) => elm.nextElementSibling?.getElementsByTagName('button')[0],
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (!isTextArea(e)) return
  e.stopPropagation()
  if (key(e) === 'ctrlEnter') {
    const target = e.target as HTMLElement
    const action = target.id === 'prompt-textarea' ? 'send' : 'edit'
    const button = sendButton[action](e.target as HTMLElement)
    button?.click()
  }
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.tagName === 'TEXTAREA'
}

const handleEvent = async () => {
  const config = await getConfig()
  const chatgptConfig = config.chatgpt

  if (chatgptConfig) {
    document.addEventListener('keydown', handleKeyEvent, { capture: true })
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
}

chrome.storage.onChanged.addListener(() => {
  handleEvent()
})

handleEvent()
