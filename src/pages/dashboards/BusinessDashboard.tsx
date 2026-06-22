import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import RecentActivity from '../../components/dashboard/RecentActivity'
import { useGetMyShipmentsQuery } from '../../features/api/shipmentApi'
import { useAppSelector } from '../../features/hooks'

export default function BusinessDashboard() {
  const navigate = useNavigate()
  const { data: shipments, isLoading } = useGetMyShipmentsQuery(undefined)

  const activeShipments = shipments?.filter((s: any) =>
    ['open', 'accepted', 'in_transit'].includes(s.status)
  ).length ?? 0

  const completedShipments = shipments?.filter((s: any) =>
    s.status === 'delivered'
  ).length ?? 0

  const stats = [
    {
      icon: '📦',
      label: 'Active Shipments',
      value: isLoading ? '...' : activeShipments,
      trend: { value: '12%', isPositive: true },
    },
    {
      icon: '✅',
      label: 'Completed',
      value: isLoading ? '...' : completedShipments,
      trend: { value: '8%', isPositive: true },
    },
    {
      icon: '💰',
      label: 'Total Shipments',
      value: isLoading ? '...' : shipments?.length ?? 0,
      trend: { value: '3%', isPositive: true },
    },
    {
      icon: '💳',
      label: 'Total Spent',
      value: isLoading ? '...' : `KES ${(shipments ?? [])
        .filter((s: any) => s.budget)
        .reduce((sum: number, s: any) => sum + Number(s.budget), 0)
        .toLocaleString()}`,
      trend: { value: '15%', isPositive: true },
    },
  ]

  const activities = (shipments ?? []).slice(0, 4).map((s: any) => ({
    id: String(s.shipmentId),
    type: s.status === 'delivered' ? 'delivery' as const : 'shipment' as const,
    title: s.status === 'delivered'
      ? `Shipment #${s.shipmentId} Delivered`
      : `Shipment #${s.shipmentId} ${s.status.replace('_', ' ')}`,
    description: `${s.origin} → ${s.destination} · ${s.cargoType}`,
    time: new Date(s.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }),
    status: s.status === 'delivered'
      ? 'success' as const
      : s.status === 'cancelled'
      ? 'failed' as const
      : 'pending' as const,
  }))

  return (
    <DashboardLayout userRole="business">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-[#8A95A3] text-sm">Here's what's happening with your shipments today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivity activities={activities.length > 0 ? activities : [
              {
                id: '1',
                type: 'shipment' as const,
                title: 'No activity yet',
                description: 'Post your first shipment to get started',
                time: '',
                status: 'pending' as const,
              }
            ]} />
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1C2128] border border-white/5 rounded-xl p-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard/business/new-shipment')}
                className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm py-3 rounded-lg transition-all hover:-translate-y-0.5"
              >
                Post New Shipment
              </button>
              <button
                onClick={() => navigate('/dashboard/business/shipments')}
                className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
              >
                View All Shipments
              </button>
              <button
                onClick={() => navigate('/marketplace')}
                className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
              >
                Browse Trucks
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}