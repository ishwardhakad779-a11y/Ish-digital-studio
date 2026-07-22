import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { services } from '../../data/siteData'

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Systems built for growth."
          desc="From premium websites to full AI automation — everything your business needs to compete in a digital-first market."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              data-cursor-hover
              className="glass-card p-6 group transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00E5FF]/15 to-[#8B5CF6]/15 flex items-center justify-center mb-5 group-hover:from-[#00E5FF]/25 group-hover:to-[#8B5CF6]/25 transition-all">
                <s.icon size={20} className="text-[#00E5FF]" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
