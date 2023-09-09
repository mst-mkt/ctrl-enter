import type {
  PlasmoCSConfig,
  PlasmoCSUIAnchor,
  PlasmoGetInlineAnchor
} from 'plasmo'
import type { CSSProperties } from 'react'
import React from 'react'

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/*']
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    'div:has(> div > #prompt-textarea)'
  ) as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-chatgpt'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: 0,
  fontWeight: 'bold',
  color: '#aaa9',
  fontSize: '0.7rem',
  width: '100%'
}

const PlasmoInline = () => {
  return (
    <div style={{ width: '100%' }}>
      <p style={styles}>Ctrl + Enter で送信</p>
      <div />
    </div>
  )
}

export default PlasmoInline
