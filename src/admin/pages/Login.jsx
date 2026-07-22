import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center font-display font-bold text-[#020617] text-xl mb-4">
            IS
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Admin Console</h1>
          <p className="text-white/40 text-sm mt-1">ISH Digital Studio</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg pl-10 pr-4 py-3 text-sm text-white outline-none transition-colors"
                placeholder="admin@ishdigitalstudio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/50 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg pl-10 pr-4 py-3 text-sm text-white outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="flex items-center gap-2 text-sm text-red-400"><AlertCircle size={15} /> {error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] font-semibold text-sm hover:glow-primary transition-all disabled:opacity-60"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
