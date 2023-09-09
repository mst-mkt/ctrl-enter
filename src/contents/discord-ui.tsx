import type {
  PlasmoCSConfig,
  PlasmoCSUIAnchor,
  PlasmoGetInlineAnchor
} from 'plasmo'
import type { CSSProperties } from 'react'
import React from 'react'

export const config: PlasmoCSConfig = {
  matches: ['https://discord.com/*']
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    '[class^="channelTextArea"] > div[class^="scrollableContainer"]'
  ) as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-discord'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '4px 0 0',
  fontWeight: 'bold',
  color: '#ccc9',
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
