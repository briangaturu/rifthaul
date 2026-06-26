import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import RecentActivity from '../../components/dashboard/RecentActivity'
import { useGetMyShipmentsQuery } from '../../features/api/shipmentApi'
import { useGetMyTrucksQuery } from '../../features/api/truckApi'

const getTruckStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'text-green-400'
    case 'on_job': return 'text-blue-400'
    case 'inactive': return 'text-gray-400'
    default: return 'text-gray-400'
  }
}

const formatTruckStatus = (status: string) => {
  switch (status) {
    case 'available': return '● Available'
    case 'on_job': return '● On Trip'
    case 'inactive': return '● Inactive'
    default: return status
  }
}

export default function TransporterDashboard() {
  const navigate = useNavigate()
  const { data: shipments, isLoading: loadingShipments } = useGetMyShipmentsQuery(undefined)
  const { data: trucks, isLoading: loadingTrucks } = useGetMyTrucksQuery(undefined)

  const activeJobs = shipments?.filter((s: any) =>
    ['accepted', 'in_transit'].includes(s.status)
  ).length ?? 0

  const completedJobs = shipments?.filter((s: any) =>
    s.status === 'delivered'
  ).length ?? 0

  const stats = [
    {
      icon: '🚛',
      label: 'Active Jobs',
      value: loadingShipments ? '...' : activeJobs,
      trend: { value: '25%', isPositive: true },
    },
    {
      icon: '✅',
      label: 'Completed Jobs',
      value: loadingShipments ? '...' : completedJobs,
      trend: { value: '18%', isPositive: true },
    },
    {
      icon: '🚚',
      label: 'My Trucks',
      value: loadingTrucks ? '...' : trucks?.length ?? 0,
      trend: { value: '0', isPositive: true },
    },
    {
      icon: '💰',
      label: 'Total Earnings',
      value: loadingShipments ? '...' : `KES ${(shipments ?? [])
        .filter((s: any) => s.status === 'delivered' && s.budget)
        .reduce((sum: number, s: any) => sum + Number(s.budget), 0)
        .toLocaleString()}`,
      trend: { value: '22%', isPositive: true },
    },
  ]

  const activities = (shipments ?? []).slice(0, 4).map((s: any) => ({
    id: String(s.shipmentId),
    type: s.status === 'delivered' ? 'delivery' as const : 'shipment' as const,
    title: s.status === 'delivered'
      ? `Job #${s.shipmentId} Completed`
      : `Job #${s.shipmentId} ${s.status.replace('_', ' ')}`,
    description: `${s.origin} → ${s.destination} · ${s.cargoType}`,
    time: new Date(s.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' }),
    status: s.status === 'delivered'
      ? 'success' as const
      : s.status === 'cancelled'
      ? 'failed' as const
      : 'pending' as const,
  }))

  return (
    <DashboardLayout userRole="transporter">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            Welcome back, Driver! 🚛
          </h1>
          <p className="text-[#8A95A3] text-sm">Here's your performance overview for today.</p>
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
                description: 'Accept your first job to get started',
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
                onClick={() => navigate('/marketplace')}
                className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm py-3 rounded-lg transition-all hover:-translate-y-0.5"
              >
                Browse Available Jobs
              </button>
              <button
                onClick={() => navigate('/dashboard/transporter/my-jobs')}
                className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
              >
                My Active Jobs
              </button>
              <button
                onClick={() => navigate('/dashboard/transporter/trucks')}
                className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
              >
                Manage Trucks
              </button>
            </div>

            {/* Truck Status */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-white text-sm font-semibold mb-3">My Trucks</h4>
              {loadingTrucks ? (
                <p className="text-[#8A95A3] text-xs">Loading...</p>
              ) : (trucks ?? []).length === 0 ? (
                <p className="text-[#8A95A3] text-xs">No trucks registered yet</p>
              ) : (
                <div className="space-y-2">
                  {(trucks ?? []).slice(0, 4).map((truck: any) => (
                    <div key={truck.truckId} className="flex items-center justify-between text-xs">
                      <span className="text-[#8A95A3]">{truck.plateNumber}</span>
                      <span className={getTruckStatusColor(truck.status)}>
                        {formatTruckStatus(truck.status)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}