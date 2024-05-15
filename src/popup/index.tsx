/* eslint-disable max-lines */
import {
  IconBan,
  IconBrandBing,
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandOpenai,
  IconBrandTwitter,
  IconBrandZoom,
  IconCamera,
  IconMessage,
  IconSettings,
} from '@tabler/icons-react'
import { type ChangeEvent, type MouseEvent, useEffect, useMemo, useState } from 'react'
import type { SupportSitesList } from 'src/types/type'
import { getConfig, getSetting, saveConfig, saveSetting, supportSites } from 'src/utils/config'

import styles from './index.module.css'

export const IndexPopup = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const defaultAdaptedPages = ['https://www.threads.net/']

  const [setting, setSetting] = useState<Record<string, boolean>>()

  const fetchSetting = async () => {
    const setting = await getSetting()
    setSetting(setting)
  }

  useEffect(() => {
    fetchSetting()
  }, [fetchSetting])

  chrome.storage.onChanged.addListener(() => {
    fetchSetting()
  })

  const openSettings = () => {
    chrome.runtime.openOptionsPage()
  }

  const siteName = useMemo<SupportSitesList | 'unknown'>(() => {
    const siteName = Object.keys(supportSites).find((key) => {
      return supportSites[key as SupportSitesList].some((item) => url?.includes(item))
    }) as SupportSitesList | undefined

    return siteName ?? 'unknown'
  }, [url])

  const status = useMemo(() => {
    const isSupported = Object.values(supportSites).some((value) => {
      return value.some((item) => url?.includes(item))
    })
    if (isSupported) return 'supported'

    const isAdapted = defaultAdaptedPages.some((item) => url?.includes(item))
    if (isAdapted) return 'adapted'

    return 'notSupported'
  }, [url])

  const check = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    const nowConfig = await getConfig()
    const newConfig = {
      ...nowConfig,
      [siteName]: e.target.checked,
    }

    await saveConfig(newConfig)
  }

  const openLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const url = e.currentTarget.href
    chrome.tabs.create({ url })
  }

  useEffect(() => {
    const getUrl = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setUrl(tabs[0].url ?? null)
      })
    }
    getUrl()

    chrome.tabs.onActivated.addListener(() => {
      getUrl()
    })
  }, [])

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig()
      setIsChecked(config[siteName])
    }
    fetchConfig()
  }, [siteName])

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
    unknown: <IconBan />,
  }

  const changeSetting = async (key: string, e: ChangeEvent<HTMLInputElement>) => {
    if (setting === undefined) return
    const newSetting = { ...setting, [key]: e.target.checked }
    setSetting(newSetting)
    await saveSetting(newSetting)
  }

  if (url === null) {
    return <div className={styles.container}>loading...</div>
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ctrl + Enter</h1>
        <div className={styles.icon} onClick={openSettings} onKeyDown={openSettings}>
          <IconSettings />
        </div>
      </header>
      <main>
        {status === 'supported' && (
          <div>
            <div className={styles.input}>
              <span>{icons[siteName]}</span>
              <label htmlFor={siteName}>{siteName}</label>
              <input
                type="checkbox"
                name={siteName}
                id={siteName}
                checked={isChecked}
                onChange={check}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor={`${siteName}setting`}>入力方法を表示する</label>
              <input
                type="checkbox"
                name={`${siteName}setting`}
                id={`${siteName}setting`}
                checked={setting?.入力方法を表示する}
                onChange={(e) => changeSetting('入力方法を表示する', e)}
              />
            </div>
          </div>
        )}
        {status === 'adapted' && (
          <div>
            <p>このサイトはデフォルトでctrl+Enterが送信です</p>
          </div>
        )}
        {status === 'notSupported' && (
          <div>
            <p>{`このサイトは拡張機能 'ctrl+Enter' に対応していません`}</p>
          </div>
        )}
      </main>
      <footer>
        <p>
          問題を報告する{' '}
          <a
            href="https://github.com/INIAD-developers/ctrl-enter/issues"
            className={styles.link}
            onClick={openLink}
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default IndexPopup
