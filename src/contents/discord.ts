import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://discord.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

const addEvent = () => {
  document.addEventListener(
    'keydown',
    (e) => {
      if (isTextArea(e)) {
        if (key(e) === 'enter') {
          e.stopPropagation()
        }
      }
    },
    { capture: true }
  )
}

chrome.storage.onChanged.addListener(async () => {
  const config = await getConfig()
  const discordConfig = config.discord

  if (discordConfig) {
    addEvent()
  } else {
    document.removeEventListener(
      'keydown',
      (e) => {
        if (isTextArea(e)) {
          if (key(e) === 'enter') {
            e.stopPropagation()
          }
        }
      },
      { capture: true }
    )
  }
})

addEvent()
