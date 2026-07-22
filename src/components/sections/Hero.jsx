import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import AIOrb from '../effects/AIOrb'
import { contactInfo } from '../../data/siteData'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs tracking-wider text-[#00E5FF] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse-glow" />
            AI OPERATING SYSTEM FOR YOUR BUSINESS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight"
          >
            BUILD.<br />
            <span className="text-gradient">AUTOMATE.</span><br />
            GROW.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-white/60 text-base md:text-lg max-w-lg leading-relaxed"
          >
            Premium Websites, AI Solutions and Business Automation for Modern Indian Businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#portfolio"
              data-cursor-hover
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] font-semibold text-sm hover:glow-primary transition-all"
            >
              View Portfolio <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              data-cursor-hover
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card font-medium text-sm hover:border-[#00E5FF]/50 transition-all"
            >
              <Calendar size={16} /> Book Free Consultation
            </a>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#25D366]/40 text-[#25D366] font-medium text-sm hover:bg-[#25D366]/10 transition-all"
            >
              <FaWhatsapp size={16} /> Chat On WhatsApp
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex justify-center lg:justify-end animate-float"
        >
          <AIOrb />
        </motion.div>
      </div>
    </section>
  )
}
