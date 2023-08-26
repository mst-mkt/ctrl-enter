import { IconSettings } from '@tabler/icons-react'
import { useEffect, useState, type ChangeEvent } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import styles from './index.module.css'

export const IndexPopup = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [excludedUrls, setExcludedUrls] = useStorage<string[]>(
    'excludedUrls',
    []
  )
  const [isChecked, setIsChecked] = useState<boolean>()

  const check = (e: ChangeEvent<HTMLInputElement>) => {
    if (url === null) {
      return
    }
    setIsChecked((e.target as HTMLInputElement).checked)
    setExcludedUrls((prev) => {
      if (isChecked ?? false) {
        return prev?.filter((u) => u !== url) ?? []
      }
      return [...(prev ?? []), url]
    })
  }

  const openSettings = () => {
    chrome.runtime.openOptionsPage()
  }

  useEffect(() => {
    if (url === null) {
      setIsChecked(false)
      return
    }
    setIsChecked(excludedUrls.includes(url))
  }, [url, excludedUrls])

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

  if (url === null) {
    return <div className={styles.container}>loading...</div>
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
        <div>
          <label htmlFor="checkbox">現在のurl({url})を除外</label>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={(e) => check(e)}
          />
        </div>
      </main>
    </div>
  )
}

export default IndexPopup
