import type {
  PlasmoCSConfig,
  PlasmoCSUIAnchor,
  PlasmoGetInlineAnchor
} from 'plasmo'
import type { CSSProperties } from 'react'
import React from 'react'

export const config: PlasmoCSConfig = {
  matches: ['https://www.bing.com/*']
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document
    .getElementsByTagName('cib-serp')[0]
    ?.shadowRoot?.querySelector('cib-action-bar')
    ?.shadowRoot?.querySelector('.root:has(> cib-typing-indicator)') as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-bing'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '4px 0 0',
  fontWeight: 'bold',
  color: '#999',
  fontSize: '0.7rem',
  width: '100%'
}

const PlasmoInline = () => {
  return (
    <div style={{ width: '100%' }}>
      <p style={styles}>Ctrl + Enter で検索</p>
      <div />
    </div>
  )
}

export default PlasmoInline
