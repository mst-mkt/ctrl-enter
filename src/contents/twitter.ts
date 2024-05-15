import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://twitter.com/*', 'https://mobile.twitter.com/*', 'https://x.com/*'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const sendButton = (elm: HTMLElement) => {
  const isMessage = elm.getAttribute('data-testid') === 'dmComposerTextInput'

  if (isMessage) {
    const button = document.querySelector('[role="button"][data-testid="dmComposerSendButton"]') as
      | HTMLButtonElement
      | undefined

    return button
  }

  return undefined
}

const handleKeyEventInDm = (e: KeyboardEvent) => {
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
        view: window,
      }),
    )
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  } else if (key(e) === 'ctrlEnter') {
    const target = e.target as HTMLElement
    sendButton(target)?.click()
  }
}

const isInDirectMessagePage = () => {
  const pageUrl = location.href
  return pageUrl.includes('message')
}

const messageElem = (): HTMLElement | null => {
  if (isInDirectMessagePage()) {
    return document.querySelector('main')
  }
  return document.querySelector('[data-testid~="DMDrawer"]')
}

const handleAddDmEvent = () => {
  const elem = messageElem()
  if (elem !== null && elem.onkeydown === null) {
    elem.onkeydown = handleKeyEventInDm
  }
}

const handleRemoveDmEvent = () => {
  const elem = messageElem()
  if (elem !== null) {
    elem.onkeydown = null
  }
}

window.addEventListener('keydown', async () => {
  handleRemoveDmEvent()
  const config = await getConfig()
  const twitterConfig = config.twitter
  if (twitterConfig) {
    handleAddDmEvent()
  }
})

chrome.storage.onChanged.addListener(async () => {
  const config = await getConfig()
  const twitterConfig = config.twitter
  if (twitterConfig) {
    handleAddDmEvent()
  } else {
    handleRemoveDmEvent()
  }
})
