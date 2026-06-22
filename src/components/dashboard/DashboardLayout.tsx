import { Link, useLocation, useNavigate } from 'react-router-dom'
import { type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { logout } from '../../features/auth/authSlice'

interface DashboardLayoutProps {
  children: ReactNode
  userRole: 'business' | 'transporter' | 'admin'
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email } = useAppSelector((state) => state.auth)

  const getNavItems = () => {
    switch (userRole) {
      case 'business':
        return [
          { path: '/dashboard/business', label: 'Overview', icon: '📊' },
          { path: '/dashboard/business/shipments', label: 'My Shipments', icon: '📦' },
          { path: '/dashboard/business/new-shipment', label: 'Post Shipment', icon: '➕' },
          { path: '/dashboard/business/quotes', label: 'Quotes', icon: '💰' },
        ]
      case 'transporter':
        return [
          { path: '/dashboard/transporter', label: 'Overview', icon: '📊' },
          { path: '/dashboard/transporter/jobs', label: 'Available Jobs', icon: '🚛' },
          { path: '/dashboard/transporter/my-jobs', label: 'My Jobs', icon: '📋' },
          { path: '/dashboard/transporter/trucks', label: 'My Trucks', icon: '🚚' },
        ]
      case 'admin':
        return [
          { path: '/dashboard/admin', label: 'Overview', icon: '📊' },
          { path: '/dashboard/admin/users', label: 'Users', icon: '👥' },
          { path: '/dashboard/admin/shipments', label: 'Shipments', icon: '📦' },
          { path: '/dashboard/admin/trucks', label: 'Trucks', icon: '🚛' },
        ]
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const navItems = getNavItems()

  return (
    <div className="min-h-screen bg-[#111418] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1C2128] border-r border-white/5">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link to="/" className="font-display text-xl font-extrabold tracking-wide text-white">
            RIFT<span className="text-[#E8830A]">HAUL</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#E8830A] text-[#111418] font-semibold'
                  : 'text-[#8A95A3] hover:bg-[#2D3748] hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-[#E8830A]/20 flex items-center justify-center text-[#E8830A] font-bold text-sm">
              {userRole === 'admin' ? 'A' : userRole === 'business' ? 'B' : 'T'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{email ?? 'User'}</p>
              <p className="text-[#8A95A3] text-xs capitalize">{userRole}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-[#8A95A3] hover:text-white text-sm py-2 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar - Mobile */}
        <header className="md:hidden bg-[#1C2128] border-b border-white/5 px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg font-extrabold tracking-wide text-white">
            RIFT<span className="text-[#E8830A]">HAUL</span>
          </Link>
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}