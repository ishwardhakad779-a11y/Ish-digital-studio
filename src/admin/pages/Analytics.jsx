import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useFetch } from '../api/useFetch'
import PageHeader from '../components/PageHeader'

export default function Analytics() {
  const { data, loading, error } = useFetch('/admin/analytics/summary')

  const chartData = data
    ? [
        { name: 'Clients', value: data.total_clients },
        { name: 'Projects', value: data.total_projects },
        { name: 'Messages', value: data.total_messages },
        { name: 'Consultations', value: data.total_consultations },
        { name: 'Appointments', value: data.upcoming_appointments },
      ]
    : []

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Business performance at a glance." />

      {error && <div className="glass-card p-5 text-red-400 text-sm mb-6">{error}</div>}

      {loading ? (
        <div className="glass-card p-10 text-center text-white/40 text-sm">Loading...</div>
      ) : data ? (
        <>
          <div className="glass-card p-6 mb-6">
            <h3 className="font-heading font-semibold text-sm text-white/80 mb-6">Activity Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: '#0F172A', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#00E5FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="glass-card p-6">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Total Revenue</p>
              <p className="font-display font-bold text-3xl text-gradient">₹{data.total_revenue.toLocaleString('en-IN')}</p>
            </div>
            <div className="glass-card p-6">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Pending Invoices</p>
              <p className="font-display font-bold text-3xl text-white">{data.pending_invoices}</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
