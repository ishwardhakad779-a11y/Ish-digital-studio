import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, label, value, accent = 'primary' }) {
  const colors = {
    primary: 'from-[#00E5FF]/15 to-[#00E5FF]/5 text-[#00E5FF]',
    accent: 'from-[#8B5CF6]/15 to-[#8B5CF6]/5 text-[#8B5CF6]',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 flex items-center gap-4"
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors[accent]} flex items-center justify-center shrink-0`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-display font-bold text-white truncate">{value}</p>
        <p className="text-xs text-white/50 mt-0.5">{label}</p>
      </div>
    </motion.div>
  )
}
