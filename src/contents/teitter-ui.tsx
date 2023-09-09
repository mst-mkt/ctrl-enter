import type {
  PlasmoCSConfig,
  PlasmoCSUIAnchor,
  PlasmoGetInlineAnchor
} from 'plasmo'
import type { CSSProperties } from 'react'
import React from 'react'

export const config: PlasmoCSConfig = {
  matches: [
    'https://twitter.com/*',
    'https://mobile.twitter.com/*',
    'https://x.com/*'
  ]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    "aside > [role='progressbar'] + div:has([data-testid='dmComposerTextInput'])"
  ) as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-twitter'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '-4px 12px 4px',
  fontWeight: 'bold',
  color: '#9999',
  fontSize: '0.7rem',
  width: 'calc(100% - 24px)'
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
