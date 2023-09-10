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

const sendButton = (elm: HTMLElement) => {
  const isMessage = elm.getAttribute('data-testid') === 'dmComposerTextInput'

  if (isMessage) {
    const button = document.querySelector(
      '[role="button"][data-testid="dmComposerSendButton"]'
    ) as HTMLButtonElement | undefined

    return button
  }

  return undefined
}

const handleKeyEventInDM = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.target?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        which: 13,
        keyCode: 13,
        bubbles: true,
        shiftKey: true,
        composed: true,
        view: window
      })
    )
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  } else if (key(e) === 'ctrlEnter') {
    const target = e.target as HTMLElement
    sendButton(target)?.click()
  }
}

const isInDMpPage = () => {
  const pageURL = location.href
  return pageURL.includes('message')
}

const messageElem = (): HTMLElement | null => {
  if (isInDMpPage()) {
    return document.querySelector('main')
  } else {
    return document.querySelector('[data-testid~="DMDrawer"]')
  }
}

const handleAddDMEvent = () => {
  const elem = messageElem()
  if (elem !== null && elem.onkeydown === null) {
    elem.onkeydown = handleKeyEventInDM
  }
}

const handleRemoveDMEvent = () => {
  const elem = messageElem()
  if (elem !== null) {
    elem.onkeydown = null
  }
}

window.addEventListener('keydown', async () => {
  handleRemoveDMEvent()
  const config = await getConfig()
  const twitterConfig = config.twitter
  if (twitterConfig) {
    handleAddDMEvent()
  }
})

chrome.storage.onChanged.addListener(async () => {
  const config = await getConfig()
  const twitterConfig = config.twitter
  if (twitterConfig) {
    handleAddDMEvent()
  } else {
    handleRemoveDMEvent()
  }
})
