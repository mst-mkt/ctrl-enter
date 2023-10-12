import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/*'],
  all_frames: true
}

const sendButton = {
  send: (elm: HTMLElement) => {
    const parentElement = elm.parentElement
    if (parentElement) {
      const sendButton = parentElement.querySelector(
        '[data-testid="send-button"]'
      ) as HTMLButtonElement | null
      return sendButton
    }
    return undefined
  },
  edit: (elm: HTMLElement) =>
    elm.nextElementSibling?.getElementsByTagName('button')[0]
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    e.stopPropagation()
    if (key(e) === 'ctrlEnter') {
      const target = e.target as HTMLElement
      const action = target.id === 'prompt-textarea' ? 'send' : 'edit'
      const button = sendButton[action](e.target as HTMLElement)
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
