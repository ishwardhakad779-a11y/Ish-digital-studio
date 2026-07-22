import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '../../data/siteData'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const startTime = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setDisplay(value * progress)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display font-bold text-4xl md:text-5xl text-gradient">
      {value % 1 === 0 ? Math.floor(display) : display.toFixed(1)}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative py-16 border-y border-[#00E5FF]/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-white/50 text-xs md:text-sm tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
