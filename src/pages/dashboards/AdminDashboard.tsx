import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import RecentActivity from '../../components/dashboard/RecentActivity'

export default function AdminDashboard() {
  const stats = [
    { icon: '👥', label: 'Total Users', value: '2,458', trend: { value: '15%', isPositive: true } },
    { icon: '📦', label: 'Active Shipments', value: '156', trend: { value: '8%', isPositive: true } },
    { icon: '🚛', label: 'Active Trucks', value: '342', trend: { value: '12%', isPositive: true } },
    { icon: '💰', label: 'Platform Revenue', value: 'KES 12.5M', trend: { value: '28%', isPositive: true } },
  ]

  const activities = [
    {
      id: '1',
      type: 'shipment' as const,
      title: 'New User Registered',
      description: 'Business account: Acme Supplies Ltd.',
      time: '30 mins ago',
      status: 'success' as const,
    },
    {
      id: '2',
      type: 'delivery' as const,
      title: 'Shipment Completed',
      description: 'SH-2847 - Nairobi to Mombasa',
      time: '2 hours ago',
      status: 'success' as const,
    },
    {
      id: '3',
      type: 'shipment' as const,
      title: 'Dispute Opened',
      description: 'SH-2835 - Payment issue reported',
      time: '5 hours ago',
      status: 'pending' as const,
    },
    {
      id: '4',
      type: 'payment' as const,
      title: 'Payment Processed',
      description: 'KES 85,000 for shipment SH-2840',
      time: '1 day ago',
      status: 'success' as const,
    },
  ]

  return (
    <DashboardLayout userRole="admin">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            Admin Dashboard 🎯
          </h1>
          <p className="text-[#8A95A3] text-sm">Platform overview and system management.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Activity & System Stats */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity activities={activities} />
          </div>

          {/* System Overview */}
          <div className="space-y-6">
            <div className="bg-[#1C2128] border border-white/5 rounded-xl p-6">
              <h3 className="font-display text-xl font-bold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#8A95A3] text-sm">Server Status</span>
                  <span className="text-green-400 text-sm font-semibold">● Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8A95A3] text-sm">Database</span>
                  <span className="text-green-400 text-sm font-semibold">● Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8A95A3] text-sm">API Response</span>
                  <span className="text-green-400 text-sm font-semibold">45ms</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1C2128] border border-white/5 rounded-xl p-6">
              <h3 className="font-display text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm py-3 rounded-lg transition-all hover:-translate-y-0.5">
                  View All Users
                </button>
                <button className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all">
                  Manage Shipments
                </button>
                <button className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all">
                  System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
