import {
  IconBrandBing,
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandOpenai,
  IconBrandTwitter,
  IconBrandZoom,
  IconCamera,
  IconMessage,
} from '@tabler/icons-react'
import { type ChangeEvent, useEffect, useState } from 'react'
import { getConfig, getSetting, saveConfig, saveSetting } from 'src/utils/config'

import styles from './index.module.css'

const OptionsIndex = () => {
  const [config, setConfig] = useState<Record<string, boolean>>()
  const [setting, setSetting] = useState<Record<string, boolean>>()

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig()
      setConfig(config)
    }

    const fetchSetting = async () => {
      const setting = await getSetting()
      setSetting(setting)
    }
    fetchConfig()
    fetchSetting()

    const fetchIntervalId = setInterval(async () => {
      fetchConfig()
      fetchSetting()
    }, 1000)

    return () => {
      clearInterval(fetchIntervalId)
    }
  }, [])

  const changeConfig = async (key: string, e: ChangeEvent<HTMLInputElement>) => {
    if (config === undefined) return
    const newConfig = { ...config, [key]: e.target.checked }
    setConfig(newConfig)
    await saveConfig(newConfig)
  }

  const changeSetting = async (key: string, e: ChangeEvent<HTMLInputElement>) => {
    if (setting === undefined) return
    const newSetting = { ...setting, [key]: e.target.checked }
    setSetting(newSetting)
    await saveSetting(newSetting)
  }

  if (config === undefined || setting === undefined) {
    return <div>loading...</div>
  }

  const icons = {
    discord: <IconBrandDiscord />,
    instagram: <IconBrandInstagram />,
    twitter: <IconBrandTwitter />,
    chatgpt: <IconBrandOpenai />,
    bing: <IconBrandBing />,
    bard: <IconMessage />,
    meet: <IconCamera />,
    zoom: <IconBrandZoom />,
    facebook: <IconBrandFacebook />,
    claude: <IconMessage />,
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Ctrl-Enter</h1>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>適応サイト</h2>
          <div>
            {Object.entries(config).map(([key, value]) => (
              <div key={key} className={styles.input}>
                {icons[key as keyof typeof icons]}
                <label htmlFor={key}>{key}</label>
                <input
                  name={key}
                  id={key}
                  type="checkbox"
                  checked={value}
                  onChange={(e) => changeConfig(key, e)}
                />
              </div>
            ))}
          </div>
          <h2 className={styles.sectionTitle}>詳細設定</h2>
          <div>
            {Object.entries(setting).map(([key, value]) => (
              <div key={key} className={styles.input}>
                <label htmlFor={key}>{key}</label>
                <input
                  name={key}
                  id={key}
                  type="checkbox"
                  checked={value}
                  onChange={(e) => changeSetting(key, e)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default OptionsIndex
