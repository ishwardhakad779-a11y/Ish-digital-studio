import { Users, FolderKanban, MessageSquare, Calendar, IndianRupee, FileWarning } from 'lucide-react'
import { useFetch } from '../api/useFetch'
import StatCard from '../components/StatCard'

export default function Dashboard() {
  const { data, loading, error } = useFetch('/admin/analytics/summary')

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Live overview of your business.</p>
      </div>

      {error && (
        <div className="glass-card p-5 text-red-400 text-sm mb-6">
          Couldn't load analytics: {error}. Make sure the backend is running and connected to Supabase.
        </div>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-5 h-20 animate-pulse" />
          ))}
        </div>
      ) : data ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <StatCard icon={Users} label="Total Clients" value={data.total_clients} />
          <StatCard icon={FolderKanban} label="Total Projects" value={data.total_projects} accent="accent" />
          <StatCard icon={MessageSquare} label="Contact Messages" value={data.total_messages} />
          <StatCard icon={Calendar} label="Consultation Requests" value={data.total_consultations} accent="accent" />
          <StatCard icon={IndianRupee} label="Total Revenue" value={`₹${data.total_revenue.toLocaleString('en-IN')}`} />
          <StatCard icon={FileWarning} label="Pending Invoices" value={data.pending_invoices} accent="accent" />
        </div>
      ) : null}
    </div>
  )
}
