import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { getConfig, getSetting } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: ['https://claude.ai/chat/*', 'https://claude.ai/chats'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const currentUrl = window.location.href
  if (currentUrl.includes('/chat/')) {
    const textbox = document.querySelector<HTMLElement>(
      'fieldset > [class^="flex flex-col flex-1"] > [class^="flex items-center -ml-1.5 sm:-mt-1.5"]',
    ) as Element
    return textbox
  }
  const textbox = document.querySelector<HTMLElement>('fieldset') as Element
  return textbox
}

export const getShadowHostId = () => 'ctrl-enter-claude'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: '4px 12px 4px',
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
    setConfig(config.claude)
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
