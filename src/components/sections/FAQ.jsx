import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { faqs } from '../../data/siteData'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions." />

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                data-cursor-hover
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-heading font-medium text-sm md:text-base">{f.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#00E5FF] transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
