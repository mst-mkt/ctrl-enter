import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://discord.com/*'],
  // biome-ignore lint/style/useNamingConvention: it's a key specified in plasmo-config
  all_frames: true,
}

const handleKeyEvent = (e: KeyboardEvent) => {
  if (isTextArea(e)) {
    if (key(e) === 'enter') {
      e.stopPropagation()
    }
  }
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.role === 'textbox'
}

const handleEvent = async () => {
  const config = await getConfig()
  const discordConfig = config.discord

  if (discordConfig) {
    document.addEventListener('keydown', handleKeyEvent, { capture: true })
  } else {
    document.removeEventListener('keydown', handleKeyEvent, { capture: true })
  }
}

chrome.storage.onChanged.addListener(async () => {
  handleEvent()
})

handleEvent()
