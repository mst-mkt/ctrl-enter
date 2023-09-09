import {
  IconBrandBing,
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandOpenai,
  IconBrandTwitter,
  IconBrandZoom,
  IconCamera,
  IconMessage
} from '@tabler/icons-react'
import { useEffect, useState, type ChangeEvent } from 'react'
import { getConfig, saveConfig } from 'src/utils/config'

import styles from './index.module.css'

const OptionsIndex = () => {
  const [config, setConfig] = useState<Record<string, boolean>>()

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig()
      setConfig(config)
    }
    fetchConfig()

    const fetchIntervalId = setInterval(fetchConfig, 1000)

    return () => {
      clearInterval(fetchIntervalId)
    }
  }, [])

  const changeConfig = async (
    key: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (config === undefined) return
    const newConfig = { ...config, [key]: e.target.checked }
    setConfig(newConfig)
    await saveConfig(newConfig)
  }

  if (config === undefined) {
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
    zoom: <IconBrandZoom />
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
        </div>
      </div>
    </div>
  )
}
export default OptionsIndex
