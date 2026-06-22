import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import RecentActivity from '../../components/dashboard/RecentActivity'
import { useGetAllTrucksQuery } from '../../features/api/truckApi'
import { useGetAllShipmentsQuery } from '../../features/api/shipmentApi'
import { useGetAllTransportersQuery, useGetAllBusinessesQuery } from '../../features/api/userApi'

export default function AdminDashboard() {
  const { data: shipments } = useGetAllShipmentsQuery(undefined)
  const { data: trucks } = useGetAllTrucksQuery(undefined)
  const { data: transporters } = useGetAllTransportersQuery(undefined)
  const { data: businesses } = useGetAllBusinessesQuery(undefined)

  const totalUsers = (transporters?.length ?? 0) + (businesses?.length ?? 0)
  const activeShipments = shipments?.filter((s: any) => ['open', 'accepted', 'in_transit'].includes(s.status)).length ?? 0
  const availableTrucks = trucks?.filter((t: any) => t.status === 'available').length ?? 0

  const stats = [
    {
      icon: '👥',
      label: 'Total Users',
      value: totalUsers,
      trend: { value: '15%', isPositive: true },
    },
    {
      icon: '📦',
      label: 'Active Shipments',
      value: activeShipments,
      trend: { value: '8%', isPositive: true },
    },
    {
      icon: '🚛',
      label: 'Available Trucks',
      value: availableTrucks,
      trend: { value: '12%', isPositive: true },
    },
    {
      icon: '💰',
      label: 'Platform Revenue',
      value: 'KES 12.5M',
      trend: { value: '28%', isPositive: true },
    },
  ]

  // Build recent activity from latest shipments
  const activities = (shipments ?? []).slice(0, 4).map((s: any) => ({
    id: String(s.shipmentId),
    type: 'shipment' as const,
    title: `Shipment #${s.shipmentId}`,
    description: `${s.origin} → ${s.destination} · ${s.cargoType}`,
    time: new Date(s.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }),
    status: s.status === 'delivered'
      ? 'success' as const
      : s.status === 'cancelled'
      ? 'failed' as const
      : 'pending' as const,
  }))

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
            <RecentActivity activities={activities.length > 0 ? activities : [
              {
                id: '1',
                type: 'shipment',
                title: 'No recent activity',
                description: 'Shipments will appear here once posted',
                time: '',
                status: 'pending',
              }
            ]} />
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
                  <span className="text-[#8A95A3] text-sm">Total Businesses</span>
                  <span className="text-white text-sm font-semibold">{businesses?.length ?? 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8A95A3] text-sm">Total Transporters</span>
                  <span className="text-white text-sm font-semibold">{transporters?.length ?? 0}</span>
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