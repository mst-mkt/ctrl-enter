import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://www.instagram.com/*', 'https://instagram.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

const sendButton = {
  message: (elm: HTMLElement) =>
    elm.parentElement?.parentElement?.nextElementSibling as
      | HTMLElement
      | undefined
}

document.addEventListener(
  'keydown',
  async (e) => {
    const config = await getConfig()
    const instagramConfig = config.instagram

    if (instagramConfig) {
      if (isTextArea(e)) {
        if (key(e) === 'enter') {
          e.stopPropagation()
        } else if (key(e) === 'ctrlEnter') {
          const target = e.target as HTMLElement
          sendButton.message(target)?.click()
        }
      }
    }
  },
  { capture: true }
)
