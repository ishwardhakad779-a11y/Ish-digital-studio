import { useState } from 'react'
import apiClient from '../api/client'
import { useFetch } from '../api/useFetch'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import Modal from '../components/Modal'
import FormField from '../components/FormField'
import StatusBadge from '../components/StatusBadge'

const initialForm = { invoice_id: '', amount: '', method: 'upi', status: 'success' }

export default function Payments() {
  const { data, loading, error, refetch } = useFetch('/admin/payments')
  const { data: invoices } = useFetch('/admin/invoices')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await apiClient.post('/admin/payments', { ...form, amount: parseFloat(form.amount) })
      setForm(initialForm)
      setOpen(false)
      refetch()
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to record payment')
    } finally {
      setSaving(false)
    }
  }

  const invoiceNumber = (id) => invoices?.find((i) => i.id === id)?.invoice_number || '—'

  const columns = [
    { key: 'invoice', header: 'Invoice', render: (row) => invoiceNumber(row.invoice_id) },
    { key: 'amount', header: 'Amount', render: (row) => `₹${Number(row.amount).toLocaleString('en-IN')}` },
    { key: 'method', header: 'Method' },
    { key: 'status', header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ]

  return (
    <div>
      <PageHeader title="Payments" subtitle="Record and track payments." actionLabel="Record Payment" onAction={() => setOpen(true)} />
      {error && <div className="glass-card p-5 text-red-400 text-sm mb-6">{error}</div>}
      {loading ? (
        <div className="glass-card p-10 text-center text-white/40 text-sm">Loading...</div>
      ) : (
        <DataTable columns={columns} rows={data} emptyMessage="No payments recorded yet." />
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Record Payment">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Invoice</label>
            <select
              required
              value={form.invoice_id}
              onChange={(e) => setForm({ ...form, invoice_id: e.target.value })}
              className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm text-white outline-none"
            >
              <option value="" className="bg-[#0F172A]">Select an invoice</option>
              {invoices?.map((i) => (
                <option key={i.id} value={i.id} className="bg-[#0F172A]">{i.invoice_number}</option>
              ))}
            </select>
          </div>
          <FormField label="Amount (INR)" type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Method</label>
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="w-full bg-white/5 border border-white/10 focus:border-[#00E5FF] rounded-lg px-4 py-2.5 text-sm text-white outline-none"
            >
              {['upi', 'card', 'bank_transfer', 'cash'].map((m) => (
                <option key={m} value={m} className="bg-[#0F172A]">{m}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={saving} className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] font-medium text-sm disabled:opacity-60">
            {saving ? 'Saving...' : 'Record Payment'}
          </button>
        </form>
      </Modal>
    </div>
  )
}
