const styles = {
  new: 'bg-[#00E5FF]/15 text-[#00E5FF]',
  read: 'bg-white/10 text-white/60',
  replied: 'bg-emerald-500/15 text-emerald-400',
  archived: 'bg-white/5 text-white/30',
  scheduled: 'bg-[#8B5CF6]/15 text-[#8B5CF6]',
  confirmed: 'bg-[#00E5FF]/15 text-[#00E5FF]',
  completed: 'bg-emerald-500/15 text-emerald-400',
  cancelled: 'bg-red-500/15 text-red-400',
  no_show: 'bg-red-500/15 text-red-400',
  draft: 'bg-white/10 text-white/60',
  sent: 'bg-[#00E5FF]/15 text-[#00E5FF]',
  paid: 'bg-emerald-500/15 text-emerald-400',
  overdue: 'bg-red-500/15 text-red-400',
  pending: 'bg-yellow-500/15 text-yellow-400',
  success: 'bg-emerald-500/15 text-emerald-400',
  failed: 'bg-red-500/15 text-red-400',
  refunded: 'bg-white/10 text-white/60',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-white/10 text-white/60'}`}>
      {status?.replace('_', ' ')}
    </span>
  )
}
