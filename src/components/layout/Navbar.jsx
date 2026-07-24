import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Share2 } from 'lucide-react'
import { contactInfo } from '../../data/siteData'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleShare = async () => {
    const shareData = {
      title: 'ISH Digital Studio',
      text: 'Check out ISH Digital Studio — premium websites, AI solutions and business automation.',
      url: window.location.href,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // user cancelled, do nothing
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-[#00E5FF]/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#home" data-cursor-hover className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center font-display font-bold text-[#020617] text-sm">
            IS
          </span>
          <span className="font-display font-bold tracking-wide text-sm md:text-base">
            ISH <span className="text-gradient">DIGITAL</span> STUDIO
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor-hover
              className="text-sm text-white/70 hover:text-[#00E5FF] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleShare}
            data-cursor-hover
            aria-label="Share"
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-[#00E5FF] transition-colors"
          >
            <Share2 size={16} />
          </button>
          <a
            href={`tel:${contactInfo.phone}`}
            data-cursor-hover
            className="flex items-center gap-2 text-sm text-white/80 hover:text-[#00E5FF]"
          >
            <Phone size={14} /> {contactInfo.phone}
          </a>
          <a
            href="#contact"
            data-cursor-hover
            className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] hover:glow-primary transition-all"
          >
            Book Consultation
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#020617]/95 backdrop-blur-xl border-b border-[#00E5FF]/10"
          >
            <div className="flex flex-col px-5 py-4 gap-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80 text-sm">
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617]"
              >
                Book Consultation
              </a>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 text-white/70 text-sm"
              >
                <Share2 size={16} /> Share this site
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}