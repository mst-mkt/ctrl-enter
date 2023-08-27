import { IconSettings } from '@tabler/icons-react'
import { useEffect, useState, type ChangeEvent } from 'react'
import { addExcludes, getExcludes, removeExcludes } from 'src/utils/excludes'

import styles from './index.module.css'

export const IndexPopup = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState<boolean>()

  const check = async (e: ChangeEvent<HTMLInputElement>) => {
    if (url === null) {
      return
    }
    const isChecked = (e.target as HTMLInputElement).checked
    setIsChecked(isChecked)
    isChecked ? await addExcludes(url) : await removeExcludes(url)
  }

  const openSettings = () => {
    chrome.runtime.openOptionsPage()
  }

  useEffect(() => {
    if (url === null) {
      setIsChecked(false)
      return
    }

    const updateExcludes = async () => {
      const excludes = await getExcludes()
      const isChecked = excludes.includes(url)
      setIsChecked(isChecked)
    }

    updateExcludes()
  }, [url])

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
        <div className={styles.check}>
          <label htmlFor="checkbox" className={styles.checkLabel}>
            現在のurl(<span className={styles.url}>{url}</span>)を除外
          </label>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            className={styles.checkInput}
            onChange={(e) => check(e)}
          />
        </div>
      </main>
    </div>
  )
}

export default IndexPopup
