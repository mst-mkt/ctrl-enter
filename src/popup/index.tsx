import { useState } from 'react'

import styles from './index.module.css'

const IndexPopup = () => {
  const [data, setData] = useState<string>()

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData([...data, e.target.value])
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16
      }}
      className={styles.container}>
      <h2>設定を反映しないサイト登録</h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <p>
        詳細設定は<a href="https://docs.plasmo.com">こちら</a>から
      </p>
    </div>
  )
}

export default IndexPopup
