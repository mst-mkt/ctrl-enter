import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { getConfig, getSetting } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: ['https://bard.google.com/*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>(
    '.input-area:has(> .send-button-container)',
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
  width: '100%',
}

const PlasmoInline = async () => {
  const [config, setConfig] = useState<boolean>()
  const [setting, setSetting] = useState(false)

  const fetchConfig = async () => {
    const config = await getConfig()
    setConfig(config.chatgpt)
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
      {config !== undefined && setting && (
        <p style={styles}>{`${config ? 'Ctrl + ' : ''}Enter で送信`}</p>
      )}
      <div />
    </div>
  )
}

export default PlasmoInline
