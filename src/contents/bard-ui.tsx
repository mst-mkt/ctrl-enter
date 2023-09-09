import type {
  PlasmoCSConfig,
  PlasmoCSUIAnchor,
  PlasmoGetInlineAnchor
} from 'plasmo'
import type { CSSProperties } from 'react'
import React from 'react'

export const config: PlasmoCSConfig = {
  matches: ['https://bard.google.com/*']
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    '.input-area:has(> .send-button-container)'
  ) as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-bard'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '4px 0 0',
  padding: '0 100px',
  boxSizing: 'border-box',
  fontWeight: 'bold',
  color: '#9999',
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
