import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { getConfig, getSetting } from 'src/utils/config'

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/*', 'https://chatgpt.com/*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const textbox = document.querySelector<HTMLElement>('textarea') as Element
  const parents = textbox.closest("[class^='flex w-full items-center']")
  return parents as Element
}

export const getShadowHostId = () => 'ctrl-enter-chatgpt'

const styles: CSSProperties = {
  textAlign: 'right',
  margin: 0,
  fontWeight: 'bold',
  color: '#aaa9',
  fontSize: '0.7rem',
  width: '100%',
}

const PlasmoInline = () => {
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
      {config !== undefined && config && setting && <p style={styles}>{'Ctrl + Enter で送信'}</p>}
      <div />
    </div>
  )
}

export default PlasmoInline
