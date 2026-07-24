import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { calculatorFeatures, contactInfo } from '../../data/siteData'

export default function PricingCalculator() {
  const baseFeature = calculatorFeatures.find((f) => f.base)
  const optionalFeatures = calculatorFeatures.filter((f) => !f.base)

  const [selected, setSelected] = useState([])
  const [extraPages, setExtraPages] = useState(0)

  const toggleFeature = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const total = useMemo(() => {
    let sum = baseFeature.price
    selected.forEach((id) => {
      const feature = optionalFeatures.find((f) => f.id === id)
      if (feature && feature.id !== 'extraPage') sum += feature.price
    })
    const extraPageFeature = optionalFeatures.find((f) => f.id === 'extraPage')
    sum += extraPages * (extraPageFeature?.price || 0)
    return sum
  }, [selected, extraPages])

  const handleGetQuote = () => {
    const selectedNames = selected
      .filter((id) => id !== 'extraPage')
      .map((id) => optionalFeatures.find((f) => f.id === id)?.name)
      .filter(Boolean)

    let message = `Hi, I'd like a quote for:\n- ${baseFeature.name}`
    if (extraPages > 0) message += `\n- ${extraPages} Extra Page(s)`
    selectedNames.forEach((name) => (message += `\n- ${name}`))
    message += `\n\nEstimated Total: ₹${total.toLocaleString('en-IN')}`

    const url = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <section id="calculator" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Build Your Package"
          title="Get an instant estimate."
          desc="Select what you need. See your price update live. No surprises."
        />

        <div className="glass-card p-6 md:p-10 rounded-2xl">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 mb-4">
            <div>
              <p className="font-medium text-sm">{baseFeature.name}</p>
              <p className="text-white/40 text-xs">Included in every package</p>
            </div>
            <Check size={18} className="text-[#00E5FF]" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 mb-4">
            <div>
              <p className="font-medium text-sm">Extra Pages</p>
              <p className="text-white/40 text-xs">
                ₹{optionalFeatures.find((f) => f.id === 'extraPage')?.price} per page
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setExtraPages((p) => Math.max(0, p - 1))}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{extraPages}</span>
              <button
                onClick={() => setExtraPages((p) => p + 1)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {optionalFeatures
              .filter((f) => f.id !== 'extraPage')
              .map((f) => {
                const isSelected = selected.includes(f.id)
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    data-cursor-hover
                    className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#00E5FF]/10 to-[#8B5CF6]/10 border border-[#00E5FF]/40'
                        : 'bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-sm">{f.name}</p>
                      <p className="text-white/40 text-xs">+₹{f.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        isSelected ? 'bg-[#00E5FF] border-[#00E5FF]' : 'border-white/20'
                      }`}
                    >
                      {isSelected && <Check size={14} className="text-[#020617]" />}
                    </div>
                  </button>
                )
              })}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider">Estimated Total</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={total}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="font-display font-bold text-3xl md:text-4xl"
                >
                  ₹{total.toLocaleString('en-IN')}
                </motion.p>
              </AnimatePresence>
            </div>
            <button
              onClick={handleGetQuote}
              data-cursor-hover
              className="px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] hover:glow-primary transition-all"
            >
              Get This Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}