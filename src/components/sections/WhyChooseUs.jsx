import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { whyChooseUs } from '../../data/siteData'

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Why Us" title="Why businesses choose ISH." />

        <div className="grid sm:grid-cols-2 gap-5">
          {whyChooseUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 flex gap-4"
            >
              <CheckCircle2 className="text-[#00E5FF] shrink-0 mt-1" size={22} />
              <div>
                <h3 className="font-heading font-semibold text-lg mb-1.5">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
