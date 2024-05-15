import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { getConfig, getSetting } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: ['https://twitter.com/*', 'https://mobile.twitter.com/*', 'https://x.com/*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    "aside > [role='progressbar'] + div:has([data-testid='dmComposerTextInput'])",
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
  width: 'calc(100% - 24px)',
}

const PlasmoInline = () => {
  const [config, setConfig] = useState<boolean>()
  const [setting, setSetting] = useState(false)

  const fetchConfig = async () => {
    const config = await getConfig()
    setConfig(config.twitter)
  }

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  const fetchSetting = async () => {
    const setting = await getSetting()
    setSetting(setting.入力方法を表示する)
  }

  useEffect(() => {
    fetchSetting()
  }, [fetchSetting])

  chrome.storage.onChanged.addListener(() => {
    fetchConfig()
    fetchSetting()
  })
  return (
    <div style={{ width: '100%' }}>
      {config !== undefined && <p style={styles}>{`${config ? 'Ctrl + ' : ''}Enter で送信`}</p>}
      <div />
    </div>
  )
}

export default PlasmoInline
