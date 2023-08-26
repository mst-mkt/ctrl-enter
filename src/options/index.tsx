import { useState } from 'react'

const OptionsIndex = () => {
  const [data, setData] = useState<string[]>([])

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData([...data, e.target.value])
  }
  return (
    <div>
      <h1>除外サイト登録</h1>
      <input onChange={(e) => addData(e)} value={data} />
    </div>
  )
}
export default OptionsIndex
