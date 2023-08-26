import type { PlasmoCSConfig } from 'plasmo'
import IndexPopup from 'src/popup'

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/*']
}

const isTextArea = (e: KeyboardEvent) => {
  return (
    e.target instanceof HTMLElement &&
    [e.target.tagName === 'TEXTAREA', e.target.role === 'textbox'].some(Boolean)
  )
}

const isEnterOnly = (e: KeyboardEvent) => {
  return [isTextArea(e), e.code === 'Enter', !(e.ctrlKey || e.metaKey)].every(
    Boolean
  )
}

document.addEventListener(
  'keydown',
  (e) => {
    if (isEnterOnly(e)) e.stopPropagation()
  },
  { capture: true }
)
