import { Plus } from 'lucide-react'

export default function PageHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-white">{title}</h1>
        {subtitle && <p className="text-white/40 text-sm mt-1">{subtitle}</p>}
      </div>
      {actionLabel && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] text-sm font-medium hover:glow-primary transition-all shrink-0"
        >
          <Plus size={16} /> {actionLabel}
        </button>
      )}
    </div>
  )
}
