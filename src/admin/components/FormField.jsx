export default function FormField({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors"
      />
    </div>
  )
}
