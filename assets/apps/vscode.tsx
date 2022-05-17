import { useState } from 'react'

export const VSCode = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount((c) => c + 1)
  }

  return (
    <button className='w-full h-full' onClick={handleClick}>
      Count: <span className='tabular-nums'>{count}</span>
    </button>
  )
}
