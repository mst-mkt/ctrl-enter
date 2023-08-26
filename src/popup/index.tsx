import { useState } from 'react'

import styles from './index.module.css'

export const IndexPopup = () => {
  const [data, setData] = useState<string[]>([])

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData([...data, e.target.value])
  }

  return (
    <div className={styles.container}>
      <h2>除外サイト登録</h2>
      <input onChange={(e) => addData(e)} value={data} />
      <p>
        詳細設定は<a href="https://docs.plasmo.com">こちら</a>から
      </p>
    </div>
  )
}

export default IndexPopup
