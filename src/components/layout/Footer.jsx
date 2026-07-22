import { FaGithub, FaWhatsapp } from 'react-icons/fa'
import { Mail, MapPin } from 'lucide-react'
import { contactInfo } from '../../data/siteData'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#00E5FF]/10 bg-[#020617] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center font-display font-bold text-[#020617] text-sm">IS</span>
            <span className="font-display font-bold text-sm">ISH DIGITAL STUDIO</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            Premium websites, AI solutions and business automation for modern Indian businesses.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-3 text-sm text-white/90">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="#services" className="hover:text-[#00E5FF]">Services</a></li>
            <li><a href="#portfolio" className="hover:text-[#00E5FF]">Portfolio</a></li>
            <li><a href="#pricing" className="hover:text-[#00E5FF]">Pricing</a></li>
            <li><a href="#faq" className="hover:text-[#00E5FF]">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-3 text-sm text-white/90">Contact</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li className="flex items-center gap-2"><Mail size={14} /> {contactInfo.email}</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> {contactInfo.location}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-3 text-sm text-white/90">Connect</h4>
          <div className="flex gap-3">
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" data-cursor-hover className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-[#00E5FF]">
              <FaGithub size={16} />
            </a>
            <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" data-cursor-hover className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-[#25D366]">
              <FaWhatsapp size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
        <p>© {new Date().getFullYear()} ISH Digital Studio. All rights reserved.</p>
        <p>Founded by Ishwar Dhakad · Indore, India</p>
      </div>
    </footer>
  )
}
