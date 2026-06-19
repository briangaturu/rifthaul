import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import RecentActivity from '../../components/dashboard/RecentActivity'

export default function TransporterDashboard() {
  const stats = [
    { icon: '🚛', label: 'Active Jobs', value: '3', trend: { value: '25%', isPositive: true } },
    { icon: '✅', label: 'Completed Jobs', value: '127', trend: { value: '18%', isPositive: true } },
    { icon: '⭐', label: 'Average Rating', value: '4.8', trend: { value: '0.2', isPositive: true } },
    { icon: '💰', label: 'This Month Earnings', value: 'KES 340K', trend: { value: '22%', isPositive: true } },
  ]

  const activities = [
    {
      id: '1',
      type: 'shipment' as const,
      title: 'Job Assigned',
      description: 'SH-2847 - Nairobi to Mombasa, 15 tonnes',
      time: '1 hour ago',
      status: 'success' as const,
    },
    {
      id: '2',
      type: 'delivery' as const,
      title: 'Delivery Completed',
      description: 'SH-2840 delivered successfully',
      time: '4 hours ago',
      status: 'success' as const,
    },
    {
      id: '3',
      type: 'payment' as const,
      title: 'Payment Received',
      description: 'KES 58,000 for job SH-2835',
      time: '1 day ago',
      status: 'success' as const,
    },
    {
      id: '4',
      type: 'quote' as const,
      title: 'Quote Accepted',
      description: 'Your quote for SH-2848 was accepted',
      time: '2 days ago',
      status: 'success' as const,
    },
  ]

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
            <RecentActivity activities={activities} />
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1C2128] border border-white/5 rounded-xl p-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm py-3 rounded-lg transition-all hover:-translate-y-0.5">
                Browse Available Jobs
              </button>
              <button className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all">
                My Active Jobs
              </button>
              <button className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all">
                Manage Trucks
              </button>
            </div>

            {/* Truck Status */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-white text-sm font-semibold mb-3">My Trucks</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8A95A3]">KCA 234B</span>
                  <span className="text-green-400">● Available</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8A95A3]">KDB 456A</span>
                  <span className="text-blue-400">● On Trip</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
