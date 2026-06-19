import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import RecentActivity from '../../components/dashboard/RecentActivity'

export default function BusinessDashboard() {
  const stats = [
    { icon: '📦', label: 'Active Shipments', value: '8', trend: { value: '12%', isPositive: true } },
    { icon: '✅', label: 'Completed', value: '47', trend: { value: '8%', isPositive: true } },
    { icon: '💰', label: 'Pending Quotes', value: '5', trend: { value: '3%', isPositive: false } },
    { icon: '💳', label: 'Total Spent', value: 'KES 2.4M', trend: { value: '15%', isPositive: true } },
  ]

  const activities = [
    {
      id: '1',
      type: 'quote' as const,
      title: 'New Quote Received',
      description: 'For shipment SH-2847 from Nairobi to Mombasa',
      time: '2 hours ago',
      status: 'pending' as const,
    },
    {
      id: '2',
      type: 'delivery' as const,
      title: 'Shipment Delivered',
      description: 'SH-2839 successfully delivered to Kisumu',
      time: '5 hours ago',
      status: 'success' as const,
    },
    {
      id: '3',
      type: 'shipment' as const,
      title: 'Shipment Posted',
      description: 'SH-2850 - Construction materials to Nakuru',
      time: '1 day ago',
      status: 'success' as const,
    },
    {
      id: '4',
      type: 'payment' as const,
      title: 'Payment Processed',
      description: 'KES 45,000 for shipment SH-2838',
      time: '2 days ago',
      status: 'success' as const,
    },
  ]

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
            <RecentActivity activities={activities} />
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1C2128] border border-white/5 rounded-xl p-6">
            <h3 className="font-display text-xl font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm py-3 rounded-lg transition-all hover:-translate-y-0.5">
                Post New Shipment
              </button>
              <button className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all">
                View All Quotes
              </button>
              <button className="w-full border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all">
                Track Shipments
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
