interface Activity {
  id: string
  type: 'shipment' | 'quote' | 'delivery' | 'payment'
  title: string
  description: string
  time: string
  status?: 'success' | 'pending' | 'failed'
}

interface RecentActivityProps {
  activities: Activity[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'shipment': return '📦'
      case 'quote': return '💰'
      case 'delivery': return '🚚'
      case 'payment': return '💳'
      default: return '📋'
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'failed': return 'text-red-400'
      default: return 'text-[#8A95A3]'
    }
  }

  return (
    <div className="bg-[#1C2128] border border-white/5 rounded-xl p-6">
      <h3 className="font-display text-xl font-bold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
            <div className="w-10 h-10 rounded-lg bg-[#E8830A]/10 flex items-center justify-center text-lg flex-shrink-0">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-white text-sm font-semibold">{activity.title}</p>
                <span className="text-[#8A95A3] text-xs whitespace-nowrap">{activity.time}</span>
              </div>
              <p className="text-[#8A95A3] text-xs mb-1">{activity.description}</p>
              {activity.status && (
                <span className={`text-xs font-semibold ${getStatusColor(activity.status)} capitalize`}>
                  {activity.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}