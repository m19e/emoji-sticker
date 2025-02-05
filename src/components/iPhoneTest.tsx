'use client'
import { useWindowSize } from 'react-use'

// TODO 不要になったので削除
export const Test = () => {
  const { width: winWidth, height: winHeight } = useWindowSize({
    initialWidth: 0,
    initialHeight: 0,
  })

  return (
    <div className="grid min-h-screen w-full bg-slate-600">
      <pre className="place-self-center rounded-md bg-white p-4">
        {JSON.stringify({ winWidth, winHeight }, null, 2)}
      </pre>
    </div>
  )
}
