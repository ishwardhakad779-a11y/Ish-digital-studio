import { useState } from 'react'
import apiClient from '../api/client'
import { useFetch } from '../api/useFetch'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import FormField from '../components/FormField'

const initialForm = { business_name: '', contact_name: '', email: '', phone: '', industry: '' }

export default function Clients() {
  const { data, loading, error, refetch } = useFetch('/admin/clients')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await apiClient.post('/admin/clients', form)
      setForm(initialForm)
      setOpen(false)
      refetch()
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create client')
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { key: 'business_name', header: 'Business' },
    { key: 'contact_name', header: 'Contact' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'industry', header: 'Industry' },
  ]

  return (
    <div>
      <PageHeader title="Clients" subtitle="Businesses you work with." actionLabel="Add Client" onAction={() => setOpen(true)} />

      {error && <div className="glass-card p-5 text-red-400 text-sm mb-6">{error}</div>}
      {loading ? (
        <div className="glass-card p-10 text-center text-white/40 text-sm">Loading...</div>
      ) : (
        <DataTable columns={columns} rows={data} emptyMessage="No clients yet. Add your first one." />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Client">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Business Name" required value={form.business_name} onChange={(e) => setForm({ ...form, business_name: e.target.value })} />
          <FormField label="Contact Name" required value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
          <FormField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <FormField label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <FormField label="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
          <button type="submit" disabled={saving} className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] font-medium text-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Client'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
