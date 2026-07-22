import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      const target = e.target
      setHovering(!!target.closest('a, button, [data-cursor-hover]'))
    }

    let raf
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="hidden md:block">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00E5FF] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 border transition-all duration-200 ${
          hovering ? 'w-12 h-12 border-[#00E5FF] bg-[#00E5FF]/10' : 'w-8 h-8 border-[#00E5FF]/50'
        }`}
      />
    </div>
  )
}
