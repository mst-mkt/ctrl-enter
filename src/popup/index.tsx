import { IconSettings } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import styles from './index.module.css'

export const IndexPopup = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState<boolean>()

  const check = (e: InputEvent) => {
    setIsChecked((e.target as HTMLInputElement).checked)
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

  const openSettings = () => {
    chrome.runtime.openOptionsPage()
  }

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
          <input type="checkbox" id="checkbox" checked={isChecked} />
        </div>
      </main>
    </div>
  )
}

export default IndexPopup
