import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, desc, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${center ? 'text-center mx-auto' : ''} max-w-2xl`}
    >
      {eyebrow && (
        <span className="inline-block text-xs tracking-[0.25em] uppercase text-[#00E5FF] font-medium mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">{title}</h2>
      {desc && <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">{desc}</p>}
    </motion.div>
  )
}
