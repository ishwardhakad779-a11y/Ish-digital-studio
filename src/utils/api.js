// Central place for all backend API calls.
// Point this at your FastAPI backend once Phase 2 (backend) is deployed.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

async function request(path, options = {}) {
  const res = await fetch('${API_BASE_URL}${path}' , {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || 'Request failed')
  }
  return res.json()
}

export function submitContactForm(data) {
  return request('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function submitConsultationRequest(data) {
  return request('/consultation', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function createPaymentOrder(data) {
  return request('/payment/create-order', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function verifyPayment(data) {
  return request('/payment/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}