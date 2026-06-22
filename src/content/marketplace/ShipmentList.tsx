import { useEffect, useRef } from 'react'
import { useGetAllShipmentsQuery } from '../../features/api/shipmentApi'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'cancelled':
      return 'bg-red-500/90'
    case 'open':
      return 'bg-green-500/90'
    case 'accepted':
      return 'bg-blue-500/90'
    case 'in_transit':
      return 'bg-yellow-500/90'
    case 'delivered':
      return 'bg-emerald-500/90'
    default:
      return 'bg-gray-500/90'
  }
}

const formatStatus = (status: string) =>
  status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())

const formatBudget = (budget: string | null) =>
  budget ? `KES ${Number(budget).toLocaleString()}` : 'Negotiable'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

export default function ShipmentList() {
  const { data: shipments, isLoading, isError } = useGetAllShipmentsQuery(undefined)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!shipments) return
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
  }, [shipments])

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
        <p className="font-display text-xl font-bold text-white mb-2">Failed to load shipments</p>
        <p className="text-[#8A95A3] text-sm">Make sure the backend is running on port 3000</p>
      </div>
    )
  }

  if (!shipments || shipments.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">📦</p>
        <p className="font-display text-xl font-bold text-white mb-2">No shipments yet</p>
        <p className="text-[#8A95A3] text-sm">Be the first to post a shipment</p>
      </div>
    )
  }

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shipments.map((shipment: any) => (
        <div
          key={shipment.shipmentId}
          className="reveal bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[#E8830A]/30 cursor-pointer group"
        >
          {/* Header banner */}
          <div className="relative h-16 bg-gradient-to-r from-[#1a2235] to-[#1C1810] flex items-center px-5 gap-3">
            <span className="text-3xl">📦</span>
            <div>
              <p className="text-white font-display font-bold text-lg leading-tight">{shipment.cargoType}</p>
              <p className="text-[#8A95A3] text-xs">#{shipment.shipmentId}</p>
            </div>
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(shipment.status)}`}>
                {formatStatus(shipment.status)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Route */}
            <div className="flex items-center gap-2 mb-4 p-3 bg-[#111418] rounded-lg">
              <span className="text-white font-semibold text-sm">{shipment.origin}</span>
              <svg className="flex-shrink-0" width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M0 5h18M14 1l4 4-4 4" stroke="#E8830A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white font-semibold text-sm">{shipment.destination}</span>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#8A95A3] text-xs">Weight</span>
                <span className="text-white font-semibold text-xs">{shipment.weightTonnes} tonnes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8A95A3] text-xs">Pickup date</span>
                <span className="text-white font-semibold text-xs">{formatDate(shipment.pickupDate)}</span>
              </div>
            </div>

            {/* Budget */}
            <div className="mb-4 pb-4 border-b border-white/[0.07]">
              <p className="text-[#8A95A3] text-xs mb-1">Budget</p>
              <p className="font-display text-2xl font-bold text-[#E8830A]">{formatBudget(shipment.budget)}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 border border-white/15 hover:border-white/40 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all">
                View Load
              </button>
              <button className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-xs px-4 py-2.5 rounded-lg transition-all hover:-translate-y-0.5">
                Apply
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}