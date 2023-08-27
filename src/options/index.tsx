import { useEffect, useState } from 'react'
import { getExcludes } from 'src/utils/excludes'

const OptionsIndex = () => {
  const [excludes, setExcludes] = useState<string[]>([])
  const [data, setData] = useState<string[]>([])

  const addData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData([...data, e.target.value])
  }

  useEffect(() => {
    const fetchExcludes = async () => {
      const excludes = await getExcludes()
      setExcludes(excludes)
      console.log(excludes)
    }

    fetchExcludes()

    const fetchExcludesInterval = setInterval(fetchExcludes, 1000)

    return () => {
      clearInterval(fetchExcludesInterval)
    }
  }, [])

  return (
    <div>
      <h1>除外サイト登録</h1>
      <input onChange={(e) => addData(e)} value={data} />
      {excludes.map((exclude, i) => (
        <div key={i}>{exclude}</div>
      ))}
    </div>
  )
}
export default OptionsIndex
