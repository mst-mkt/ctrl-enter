import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { getConfig, getSetting } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: ['https://www.facebook.com/*', 'https://m.facebook.com/*', 'https://facebook.com/*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    'div:has(> span:first-child > [role="button"]):has(> div [role="textbox"]):has(> span:last-child > [role="button"])',
  ) as Element

  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-facebook'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '-8px 0 4px',
  fontWeight: 'bold',
  color: '#9999',
  fontSize: '0.7rem',
  padding: '0 44px',
  boxSizing: 'border-box',
  width: '100%',
}

const PlasmoInline = () => {
  const [config, setConfig] = useState<boolean>()
  const [setting, setSetting] = useState(false)

  const fetchConfig = async () => {
    const config = await getConfig()
    setConfig(config.facebook)
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
