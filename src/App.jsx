import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainSite from './MainSite'
import { AuthProvider } from './admin/context/AuthContext'
import ProtectedRoute from './admin/components/ProtectedRoute'
import AdminLayout from './admin/components/AdminLayout'

import Login from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import Clients from './admin/pages/Clients'
import Projects from './admin/pages/Projects'
import Messages from './admin/pages/Messages'
import Appointments from './admin/pages/Appointments'
import Invoices from './admin/pages/Invoices'
import Payments from './admin/pages/Payments'
import Analytics from './admin/pages/Analytics'
import Settings from './admin/pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainSite />} />

          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="projects" element={<Projects />} />
            <Route path="messages" element={<Messages />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="payments" element={<Payments />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
