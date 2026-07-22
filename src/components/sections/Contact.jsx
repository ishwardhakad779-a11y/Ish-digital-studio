import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { FaGithub, FaWhatsapp } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import { contactInfo } from '../../data/siteData'
import { submitContactForm } from '../../utils/api'

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.message.trim()) e.message = 'Tell us a bit about your project'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      await submitContactForm(form)
      setStatus('success')
      setForm(initialForm)
    } catch (_err) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's build something premium."
          desc="Tell us about your business and we'll get back within 24 hours."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass-card p-6 flex items-start gap-4">
              <Mail className="text-[#00E5FF] mt-0.5" size={20} />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${contactInfo.email}`} className="text-sm hover:text-[#00E5FF]">{contactInfo.email}</a>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start gap-4">
              <Phone className="text-[#00E5FF] mt-0.5" size={20} />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                <a href={`tel:${contactInfo.phone}`} className="text-sm hover:text-[#00E5FF]">{contactInfo.phone}</a>
              </div>
            </div>
            <div className="glass-card p-6 flex items-start gap-4">
              <MapPin className="text-[#00E5FF] mt-0.5" size={20} />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm">{contactInfo.location}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:text-[#00E5FF]">
                <FaGithub size={18} />
              </a>
              <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:text-[#25D366]">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 glass-card p-7 space-y-5"
          >
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  placeholder="you@business.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  placeholder="+91 00000 00000"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5">Tell us about your project</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none"
                placeholder="What are you looking to build?"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              data-cursor-hover
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] font-semibold text-sm hover:glow-primary transition-all disabled:opacity-60"
            >
              {status === 'loading' ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>

            {status === 'success' && (
              <p className="flex items-center gap-2 text-sm text-emerald-400"><CheckCircle2 size={16} /> Message sent! We'll get back to you within 24 hours.</p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm text-red-400"><AlertCircle size={16} /> Something went wrong. Please try WhatsApp instead.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
