import type {
  PlasmoCSConfig,
  PlasmoCSUIAnchor,
  PlasmoGetInlineAnchor
} from 'plasmo'
import type { CSSProperties } from 'react'
import React from 'react'

export const config: PlasmoCSConfig = {
  matches: ['https://www.instagram.com/*', 'https://instagram.com/*']
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    'div:has(> div > [role="button"] + div > div > [role="textbox"])'
  ) as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-instagram'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '-16px 38px 4px',
  fontWeight: 'bold',
  color: '#9999',
  fontSize: '0.7rem',
  width: 'calc(100% - 76px)'
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
