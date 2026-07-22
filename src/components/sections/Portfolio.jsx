import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import { portfolio } from '../../data/siteData'

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Projects that perform."
          desc="A look at real businesses we've helped transform with premium digital experiences."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {portfolio.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              data-cursor-hover
              className="glass-card overflow-hidden group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.stack.map((t) => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={p.live} className="inline-flex items-center gap-1.5 text-sm text-[#00E5FF] hover:underline">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
                    <FaGithub size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
