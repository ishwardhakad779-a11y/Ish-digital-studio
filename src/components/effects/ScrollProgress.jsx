import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight)
      setProgress(scrolled * 100)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[90] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
