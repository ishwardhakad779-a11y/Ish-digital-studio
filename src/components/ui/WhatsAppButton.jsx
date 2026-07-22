import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { contactInfo } from '../../data/siteData'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${contactInfo.whatsapp}?text=Hi%20ISH%20Digital%20Studio%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.5)]"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={26} color="#fff" />
    </motion.a>
  )
}
