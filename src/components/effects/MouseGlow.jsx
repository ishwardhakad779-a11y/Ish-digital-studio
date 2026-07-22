import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0,229,255,0.06), transparent 40%)`
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div ref={glowRef} className="fixed inset-0 pointer-events-none z-0 transition-all duration-100" />
}
