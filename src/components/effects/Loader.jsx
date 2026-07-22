import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#020617] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-[#00E5FF]/20 border-t-[#00E5FF]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.p
            className="mt-6 font-display tracking-[0.3em] text-sm text-[#00E5FF]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            INITIALIZING SYSTEM
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
