import { Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { contactInfo } from '../../data/siteData'

export default function CallButton() {
  return (
    <motion.a
      href={`tel:${contactInfo.phone}`}
      data-cursor-hover
      className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full glass-card flex items-center justify-center text-[#00E5FF] hover:glow-primary"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      aria-label="Call us"
    >
      <Phone size={22} />
    </motion.a>
  )
}
