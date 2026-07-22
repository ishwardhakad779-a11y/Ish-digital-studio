import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { process } from '../../data/siteData'

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="How It Works" title="Our process." desc="A clear path from first call to a live, working system." />

        <div className="grid md:grid-cols-4 gap-6">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative glass-card p-6"
            >
              <span className="font-display font-bold text-4xl text-gradient">{p.step}</span>
              <h3 className="font-heading font-semibold text-lg mt-4 mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              {i < process.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#00E5FF]/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
