import { useEffect, useRef } from 'react'
import { useGetAllTrucksQuery } from '../../features/api/truckApi'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-500/90'
    case 'on_job':
      return 'bg-blue-500/90'
    case 'inactive':
      return 'bg-gray-500/90'
    default:
      return 'bg-gray-500/90'
  }
}

const formatStatus = (status: string) => {
  switch (status) {
    case 'available': return 'Available'
    case 'on_job': return 'On Trip'
    case 'inactive': return 'Inactive'
    default: return status
  }
}

export default function TruckList() {
  const { data: trucks, isLoading, isError } = useGetAllTrucksQuery(undefined)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trucks) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [trucks])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden animate-pulse">
            <div className="h-48 bg-white/5" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-white/5 rounded w-3/4" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
              <div className="h-3 bg-white/5 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="font-display text-xl font-bold text-white mb-2">Failed to load trucks</p>
        <p className="text-[#8A95A3] text-sm">Make sure the backend is running on port 3000</p>
      </div>
    )
  }

  if (!trucks || trucks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">🚛</p>
        <p className="font-display text-xl font-bold text-white mb-2">No trucks listed yet</p>
        <p className="text-[#8A95A3] text-sm">Transporters can register their trucks to appear here</p>
      </div>
    )
  }

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trucks.map((truck: any) => (
        <div
          key={truck.truckId}
          className="reveal bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[#E8830A]/30 cursor-pointer group"
        >
          {/* Header banner */}
          <div className="relative h-16 bg-gradient-to-r from-[#1a2235] to-[#1C1810] flex items-center px-5 gap-3">
            <span className="text-3xl">🚛</span>
            <div>
              <p className="text-white font-display font-bold text-lg leading-tight">{truck.plateNumber}</p>
              <p className="text-[#E8830A] font-semibold text-xs">{truck.truckType}</p>
            </div>
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(truck.status)}`}>
                {formatStatus(truck.status)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Essential Details */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[#8A95A3] text-xs">Maximum Load</span>
                <span className="text-white font-semibold text-sm">{truck.capacityTonnes} tonnes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A95A3] text-xs">Current Location</span>
                <span className="text-white font-semibold text-sm">{truck.location ?? '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A95A3] text-xs">Truck ID</span>
                <span className="text-[#8A95A3] text-xs">#{truck.truckId}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              className="w-full bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-40 disabled:cursor-not-allowed text-[#111418] font-bold text-sm px-5 py-3 rounded-lg transition-all hover:not-disabled:-translate-y-0.5"
              disabled={truck.status !== 'available'}
            >
              {truck.status === 'available' ? 'Request Truck' : formatStatus(truck.status)}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}