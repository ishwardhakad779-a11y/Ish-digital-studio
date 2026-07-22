import { useState } from 'react'
import apiClient from '../api/client'
import { useFetch } from '../api/useFetch'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import FormField from '../components/FormField'
import StatusBadge from '../components/StatusBadge'

const initialForm = { name: '', email: '', phone: '', scheduled_at: '', purpose: '' }

export default function Appointments() {
  const { data, loading, error, refetch } = useFetch('/admin/appointments')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await apiClient.post('/admin/appointments', {
        ...form,
        scheduled_at: new Date(form.scheduled_at).toISOString(),
      })
      setForm(initialForm)
      setOpen(false)
      refetch()
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create appointment')
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'scheduled_at', header: 'Scheduled', render: (row) => new Date(row.scheduled_at).toLocaleString('en-IN') },
    { key: 'purpose', header: 'Purpose' },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ]

  return (
    <div>
      <PageHeader title="Appointments" subtitle="Bookings and consultations." actionLabel="Add Appointment" onAction={() => setOpen(true)} />
      {error && <div className="glass-card p-5 text-red-400 text-sm mb-6">{error}</div>}
      {loading ? (
        <div className="glass-card p-10 text-center text-white/40 text-sm">Loading...</div>
      ) : (
        <DataTable columns={columns} rows={data} emptyMessage="No appointments yet." />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Appointment">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <FormField label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <FormField label="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <FormField label="Scheduled At" type="datetime-local" required value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} />
          <FormField label="Purpose" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} />
          <button type="submit" disabled={saving} className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] font-medium text-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Appointment'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
