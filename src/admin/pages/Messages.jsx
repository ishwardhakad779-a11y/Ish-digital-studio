import apiClient from '../api/client'
import { useFetch } from '../api/useFetch'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'

export default function Messages() {
  const { data, loading, error, refetch } = useFetch('/admin/messages')

  const updateStatus = async (id, status) => {
    try {
      await apiClient.patch(`/admin/messages/${id}/status`, null, { params: { status } })
      refetch()
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to update status')
    }
  }

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'message', header: 'Message', render: (row) => <span className="line-clamp-1 max-w-xs block">{row.message}</span> },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => updateStatus(row.id, e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
        >
          {['new', 'read', 'replied', 'archived'].map((s) => (
            <option key={s} value={s} className="bg-[#0F172A]">{s}</option>
          ))}
        </select>
      ),
    },
  ]

  return (
    <div>
      <PageHeader title="Messages" subtitle="Contact form submissions from the website." />
      {error && <div className="glass-card p-5 text-red-400 text-sm mb-6">{error}</div>}
      {loading ? (
        <div className="glass-card p-10 text-center text-white/40 text-sm">Loading...</div>
      ) : (
        <DataTable columns={columns} rows={data} emptyMessage="No messages yet." />
      )}
    </div>
  )
}
