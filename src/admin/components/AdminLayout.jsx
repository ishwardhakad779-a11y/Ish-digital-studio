import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, FolderKanban, MessageSquare, Calendar,
  Receipt, CreditCard, BarChart3, Settings, LogOut, Menu,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/clients', label: 'Clients', icon: Users },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/appointments', label: 'Appointments', icon: Calendar },
  { to: '/admin/invoices', label: 'Invoices', icon: Receipt },
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 px-5 py-6">
        <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] flex items-center justify-center font-display font-bold text-[#020617] text-sm">
          IS
        </span>
        <div>
          <p className="font-display font-bold text-sm text-white leading-tight">ISH DIGITAL</p>
          <p className="text-[10px] text-white/40 tracking-widest">ADMIN CONSOLE</p>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#00E5FF]/15 to-[#8B5CF6]/15 text-[#00E5FF] border border-[#00E5FF]/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-white/10">
        <div className="px-3.5 py-2 mb-2">
          <p className="text-sm text-white/80 truncate">{user?.full_name}</p>
          <p className="text-xs text-white/40 truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={17} /> Log Out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-[#0F172A]/40">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 bg-[#0F172A] border-r border-white/10">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between px-5 h-16 border-b border-white/10">
          <span className="font-display font-bold text-sm">ISH ADMIN</span>
          <button onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
        </header>
        <main className="p-5 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
