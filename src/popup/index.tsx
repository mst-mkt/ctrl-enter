import {
  IconBan,
  IconBrandBing,
  IconBrandDiscord,
  IconBrandInstagram,
  IconBrandOpenai,
  IconBrandTwitter,
  IconMessage,
  IconSettings
} from '@tabler/icons-react'
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type MouseEvent
} from 'react'
import type { supportSitesList } from 'src/types/type'
import { supportSites } from 'src/utils/config'

import styles from './index.module.css'

export const IndexPopup = () => {
  const [url, setUrl] = useState<string | null>(null)
  const defaultAdaptedPages = ['https://www.threads.net/']

  const openSettings = () => {
    chrome.runtime.openOptionsPage()
  }

  useEffect(() => {
    const getUrl = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        setUrl(tabs[0].url ?? null)
      })
    }

    getUrl()
    chrome.tabs.onActivated.addListener((activeInfo) => {
      getUrl()
    })
  }, [])

  const siteName = useMemo<supportSitesList | 'unknown'>(() => {
    const siteName = Object.keys(supportSites).find((key) => {
      return supportSites[key as supportSitesList].some(
        (item) => url?.includes(item)
      )
    }) as supportSitesList | undefined

    return siteName ?? 'unknown'
  }, [url, supportSites])

  const status = useMemo(() => {
    const isSupported = Object.values(supportSites).some((value) => {
      return value.some((item) => url?.includes(item))
    })
    if (isSupported) return 'supported'

    const isAdapted = defaultAdaptedPages.some((item) => url?.includes(item))
    if (isAdapted) return 'adapted'

    return 'notSupported'
  }, [url])

  if (url === null) {
    return <div className={styles.container}>loading...</div>
  }

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    alert(e.target.checked)
  }

  const openLink = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const url = e.currentTarget.href
    chrome.tabs.create({ url })
  }

  const icons = {
    discord: <IconBrandDiscord />,
    instagram: <IconBrandInstagram />,
    twitter: <IconBrandTwitter />,
    chatgpt: <IconBrandOpenai />,
    bing: <IconBrandBing />,
    bard: <IconMessage />,

    unknown: <IconBan />
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ctrl + Enter</h1>
        <div className={styles.icon} onClick={openSettings}>
          <IconSettings />
        </div>
      </header>
      <main>
        {status === 'supported' && (
          <div className={styles.input}>
            <span>{icons[siteName]}</span>
            <label htmlFor={siteName}>{siteName}</label>
            <input type="checkbox" name={siteName} id={siteName} />
          </div>
        )}
        {status === 'adapted' && (
          <div>
            <p>このサイトはデフォルトでctrl+Enterが送信です</p>
          </div>
        )}
        {status === 'notSupported' && (
          <div>
            <p>このサイトはctrl+Enterに対応していません</p>
          </div>
        )}
      </main>
      <footer>
        <p>
          問題を報告する{' '}
          <a
            href="https://github.com/INIAD-developers/ctrl-enter/issues"
            className={styles.link}
            onClick={openLink}>
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}

export default IndexPopup
