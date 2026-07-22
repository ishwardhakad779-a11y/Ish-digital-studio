import { motion } from 'framer-motion'

export default function AIOrb() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
      {/* outer rotating rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-[#00E5FF]/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ borderStyle: 'dashed' }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-[#8B5CF6]/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-12 rounded-full border border-[#00E5FF]/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* core orb */}
      <motion.div
        className="relative w-36 h-36 md:w-48 md:h-48 rounded-full animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #00E5FF 0%, #8B5CF6 55%, #020617 100%)',
          boxShadow: '0 0 80px rgba(0,229,255,0.5), 0 0 140px rgba(139,92,246,0.3)',
        }}
      >
        <div className="absolute inset-3 rounded-full bg-[#020617]/40 backdrop-blur-sm" />
      </motion.div>

      {/* orbiting dot */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-[#00E5FF] glow-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '0 150px', top: '50%', left: '50%' }}
      />
    </div>
  )
}
