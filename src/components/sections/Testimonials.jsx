import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/siteData'

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Testimonials" title="Trusted by growing businesses." />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-7"
            >
              <Quote className="text-[#00E5FF]/40 mb-4" size={28} />
              <p className="text-white/70 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="font-heading font-semibold text-sm">{t.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
