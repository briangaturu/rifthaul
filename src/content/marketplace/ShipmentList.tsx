import { useEffect, useRef, useState } from 'react'
import { useGetAllShipmentsQuery, useUpdateShipmentStatusMutation } from '../../features/api/shipmentApi'
import { useGetMyTrucksQuery } from '../../features/api/truckApi'
import { useAppSelector } from '../../features/hooks'
import { useNavigate } from 'react-router-dom'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'cancelled': return 'bg-red-500/90'
    case 'open': return 'bg-green-500/90'
    case 'accepted': return 'bg-blue-500/90'
    case 'in_transit': return 'bg-yellow-500/90'
    case 'delivered': return 'bg-emerald-500/90'
    default: return 'bg-gray-500/90'
  }
}

const formatStatus = (status: string) =>
  status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())

const formatBudget = (budget: string | null) =>
  budget ? `KES ${Number(budget).toLocaleString()}` : 'Negotiable'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

export default function ShipmentList() {
  const navigate = useNavigate()
  const { data: shipments, isLoading, isError } = useGetAllShipmentsQuery(undefined)
  const { data: trucks } = useGetMyTrucksQuery(undefined)
  const [updateShipmentStatus] = useUpdateShipmentStatusMutation()
  const { token, userId, userType } = useAppSelector((state) => state.auth)

  const ref = useRef<HTMLDivElement>(null)
  const [viewShipment, setViewShipment] = useState<any | null>(null)
  const [applyingId, setApplyingId] = useState<number | null>(null)

  const availableTruck = trucks?.find((t: any) => t.status === 'available')

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

  const handleApply = async (shipment: any) => {
    if (!token) {
      navigate('/register?role=transporter')
      return
    }
    if (userType !== 'transporter') {
      alert('Only transporters can apply for jobs.')
      return
    }
    if (!availableTruck) {
      alert('You need at least one available truck to apply. Go to My Trucks and set a truck as available.')
      return
    }
    if (!confirm(`Accept this job: ${shipment.cargoType} from ${shipment.origin} to ${shipment.destination}?`)) return

    setApplyingId(shipment.shipmentId)
    try {
      await updateShipmentStatus({
        shipmentId: shipment.shipmentId,
        status: 'accepted',
        transporterId: userId!,
        truckId: availableTruck.truckId,
      }).unwrap()
      setViewShipment(null)
      navigate('/dashboard/transporter/my-jobs')
    } catch (err) {
      console.error('Failed to accept job', err)
      alert('Failed to accept job. Please try again.')
    } finally {
      setApplyingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden animate-pulse">
            <div className="h-16 bg-white/5" />
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
    <>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shipments.map((shipment: any) => (
          <div
            key={shipment.shipmentId}
            className="reveal bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[#E8830A]/30 cursor-pointer group"
          >
            {/* Header */}
            <div className="relative h-16 bg-gradient-to-r from-[#1a2235] to-[#1C1810] flex items-center px-5 gap-3">
              <span className="text-3xl">📦</span>
              <div>
                <p className="text-white font-display font-bold text-lg leading-tight">{shipment.cargoType}</p>
                <p className="text-[#8A95A3] text-xs">#{shipment.shipmentId}</p>
              </div>
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

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewShipment(shipment)}
                  className="flex-1 border border-white/15 hover:border-white/40 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all"
                >
                  View Load
                </button>
                {shipment.status === 'open' && (
                  <button
                    onClick={() => handleApply(shipment)}
                    disabled={applyingId === shipment.shipmentId}
                    className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-50 disabled:cursor-not-allowed text-[#111418] font-bold text-xs px-4 py-2.5 rounded-lg transition-all hover:-translate-y-0.5"
                  >
                    {applyingId === shipment.shipmentId ? 'Applying...' : 'Apply'}
                  </button>
                )}
                {shipment.status !== 'open' && (
                  <span className="flex-1 text-center text-[#8A95A3] text-xs px-4 py-2.5 rounded-lg border border-white/5">
                    {formatStatus(shipment.status)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── View Load Modal ── */}
      {viewShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg bg-[#1C2128] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

            {/* Modal header */}
            <div className="bg-gradient-to-r from-[#1a2235] to-[#1C1810] px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📦</span>
                <div>
                  <p className="text-white font-display font-bold text-xl">{viewShipment.cargoType}</p>
                  <p className="text-[#8A95A3] text-xs">Shipment #{viewShipment.shipmentId}</p>
                </div>
              </div>
              <button
                onClick={() => setViewShipment(null)}
                className="text-[#8A95A3] hover:text-white text-2xl leading-none transition-colors"
              >
                ×
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5">

              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-[#8A95A3] text-sm">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getStatusColor(viewShipment.status)}`}>
                  {formatStatus(viewShipment.status)}
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-3 p-4 bg-[#111418] rounded-xl">
                <div className="text-center flex-1">
                  <p className="text-[#8A95A3] text-xs mb-1">From</p>
                  <p className="text-white font-bold">{viewShipment.origin}</p>
                </div>
                <svg width="32" height="14" viewBox="0 0 32 14" fill="none" className="flex-shrink-0">
                  <path d="M0 7h30M23 1l7 6-7 6" stroke="#E8830A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-center flex-1">
                  <p className="text-[#8A95A3] text-xs mb-1">To</p>
                  <p className="text-white font-bold">{viewShipment.destination}</p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Cargo Type', value: viewShipment.cargoType },
                  { label: 'Weight', value: `${viewShipment.weightTonnes} tonnes` },
                  { label: 'Pickup Date', value: formatDate(viewShipment.pickupDate) },
                  { label: 'Budget', value: formatBudget(viewShipment.budget) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#111418] rounded-lg p-3">
                    <p className="text-[#8A95A3] text-xs mb-1">{label}</p>
                    <p className={`font-semibold text-sm ${label === 'Budget' ? 'text-[#E8830A]' : 'text-white'}`}>{value}</p>
                  </div>
                ))}
              </div>

              {/* No available truck warning */}
              {token && userType === 'transporter' && !availableTruck && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs rounded-lg px-4 py-3">
                  ⚠️ You have no available trucks. Update a truck to "Available" before applying.
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setViewShipment(null)}
                  className="flex-1 border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
                >
                  Close
                </button>
                {viewShipment.status === 'open' && (
                  <button
                    onClick={() => handleApply(viewShipment)}
                    disabled={applyingId === viewShipment.shipmentId || (userType === 'transporter' && !availableTruck)}
                    className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-50 disabled:cursor-not-allowed text-[#111418] font-bold text-sm py-3 rounded-lg transition-all"
                  >
                    {applyingId === viewShipment.shipmentId ? 'Applying...' : 'Accept Job'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}