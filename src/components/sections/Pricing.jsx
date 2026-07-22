import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { pricing } from '../../data/siteData'

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="Pricing" title="Plans built to scale with you." desc="Transparent pricing. No hidden costs. Custom quotes for larger builds." />

        <div className="grid lg:grid-cols-3 gap-6">
          {pricing.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[#0F172A] to-[#0F172A] border-2 border-[#00E5FF] glow-primary'
                  : 'glass-card'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="font-heading font-semibold text-xl">{plan.name}</h3>
              <p className="text-white/50 text-sm mt-2 mb-6">{plan.desc}</p>
              <div className="font-display font-bold text-4xl mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                    <Check size={16} className="text-[#00E5FF] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-cursor-hover
                className={`block text-center py-3 rounded-full text-sm font-medium transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617]'
                    : 'glass-card hover:border-[#00E5FF]/50'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
