import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://claude.ai/chat/*', 'https://claude.ai/chats'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const sendButton = {
  send: (elm: HTMLElement) => {
    const parent = elm.closest('.flex.items-start.gap-4')
    const buttonAriaLabel = 'Send Message'
    const button = parent?.querySelector(`button[aria-label="${buttonAriaLabel}"]`) as
      | HTMLButtonElement
      | undefined
    return button
  },
  startChat: (elm: HTMLElement) => {
    const parent = elm.closest('.grid')
    const button = parent?.querySelector('button.w-full') as HTMLButtonElement | undefined
    return button
  },
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (!isTextArea(e)) return
  e.stopPropagation()
  if (key(e) === 'ctrlEnter') {
    const target = e.target as HTMLElement

    const currentUrl = window.location.href
    const action = currentUrl.includes('/chat/') ? 'send' : 'startChat'

    const button = sendButton[action](target)
    button?.click()
  }
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.className === 'ProseMirror break-words max-w-[60ch] ProseMirror-focused'
}

const handleEvent = async () => {
  const config = await getConfig()
  const claudeConfig = config.claude

  if (claudeConfig) {
    document.addEventListener('keydown', handleKeyEvent, { capture: true })
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
}

chrome.storage.onChanged.addListener(() => {
  handleEvent()
})

handleEvent()
