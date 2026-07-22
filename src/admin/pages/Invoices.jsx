import { useState } from 'react'
import apiClient from '../api/client'
import { useFetch } from '../api/useFetch'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import FormField from '../components/FormField'
import StatusBadge from '../components/StatusBadge'

const initialForm = { client_id: '', invoice_number: '', amount: '', status: 'draft' }

export default function Invoices() {
  const { data, loading, error, refetch } = useFetch('/admin/invoices')
  const { data: clients } = useFetch('/admin/clients')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await apiClient.post('/admin/invoices', { ...form, amount: parseFloat(form.amount) })
      setForm(initialForm)
      setOpen(false)
      refetch()
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to create invoice')
    } finally {
      setSaving(false)
    }
  }

  const clientName = (id) => clients?.find((c) => c.id === id)?.business_name || '—'

  const columns = [
    { key: 'invoice_number', header: 'Invoice #' },
    { key: 'client', header: 'Client', render: (row) => clientName(row.client_id) },
    { key: 'amount', header: 'Amount', render: (row) => `₹${Number(row.amount).toLocaleString('en-IN')}` },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ]

  return (
    <div>
      <PageHeader title="Invoices" subtitle="Client billing." actionLabel="Create Invoice" onAction={() => setOpen(true)} />
      {error && <div className="glass-card p-5 text-red-400 text-sm mb-6">{error}</div>}
      {loading ? (
        <div className="glass-card p-10 text-center text-white/40 text-sm">Loading...</div>
      ) : (
        <DataTable columns={columns} rows={data} emptyMessage="No invoices yet." />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Create Invoice">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Client</label>
            <select
              required
              value={form.client_id}
              onChange={(e) => setForm({ ...form, client_id: e.target.value })}
              className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm text-white outline-none"
            >
              <option value="" className="bg-[#0F172A]">Select a client</option>
              {clients?.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0F172A]">{c.business_name}</option>
              ))}
            </select>
          </div>
          <FormField label="Invoice Number" required value={form.invoice_number} onChange={(e) => setForm({ ...form, invoice_number: e.target.value })} />
          <FormField label="Amount (INR)" type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <button type="submit" disabled={saving} className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] font-medium text-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Create Invoice'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
