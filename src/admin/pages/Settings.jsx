import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/PageHeader'

export default function Settings() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader title="Settings" subtitle="Your admin account." />

      <div className="glass-card p-6 max-w-lg space-y-4">
        <div>
          <p className="text-xs text-white/50 mb-1">Full Name</p>
          <p className="text-white text-sm">{user?.full_name}</p>
        </div>
        <div>
          <p className="text-xs text-white/50 mb-1">Email</p>
          <p className="text-white text-sm">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs text-white/50 mb-1">Role</p>
          <p className="text-white text-sm capitalize">{user?.role}</p>
        </div>
        <p className="text-white/40 text-xs pt-3 border-t border-white/10">
          Password changes and team member management can be added here once needed —
          ask your developer to extend <code className="text-[#00E5FF]">/api/auth</code> with a change-password endpoint.
        </p>
      </div>
    </div>
  )
}
