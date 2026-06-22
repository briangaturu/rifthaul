interface StatCardProps {
  icon: string
  label: string
  value: string | number
  trend?: {
    value: string
    isPositive: boolean
  }
}

export default function StatCard({ icon, label, value, trend }: StatCardProps) {
  return (
    <div className="bg-[#1C2128] border border-white/5 rounded-xl p-6 hover:border-[#E8830A]/30 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-2xl">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <p className="text-[#8A95A3] text-sm mb-1">{label}</p>
      <p className="font-display text-3xl font-bold text-white">{value}</p>
    </div>
  )
}