import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="glass-card p-10 md:p-14 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center font-display font-bold text-3xl text-[#020617] mb-6">
              ID
            </div>
            <h3 className="font-heading font-semibold text-2xl">Ishwar Dhakad</h3>
            <p className="text-[#00E5FF] text-sm mt-1">Founder, ISH Digital Studio</p>
            <p className="text-white/50 text-sm mt-4">Indore, Madhya Pradesh</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#00E5FF] font-medium mb-4">
            <Sparkles size={14} /> About Us
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-6">
            One founder. One mission.
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-4">
            ISH Digital Studio was built with a single mission: helping Indian businesses grow
            using premium websites and AI solutions that actually move the needle.
          </p>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            Every project is led directly by founder Ishwar Dhakad, combining full-stack
            engineering with a design-first mindset — so what you get isn't just a website,
            it's a system built to help your business grow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
