import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useGetOpenShipmentsQuery, useUpdateShipmentStatusMutation } from '../../features/api/shipmentApi'
import { useGetMyTrucksQuery } from '../../features/api/truckApi'
import { useAppSelector } from '../../features/hooks'
import { useState } from 'react'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

const formatBudget = (budget: string | null) =>
  budget ? `KES ${Number(budget).toLocaleString()}` : 'Negotiable'

export default function AvailableJobs() {
  const { userId } = useAppSelector((state) => state.auth)
  const { data: shipments, isLoading, isError } = useGetOpenShipmentsQuery(undefined)
  const { data: trucks } = useGetMyTrucksQuery(undefined)
  const [updateShipmentStatus] = useUpdateShipmentStatusMutation()
  const [applyingId, setApplyingId] = useState<number | null>(null)

  const availableTruck = trucks?.find((t: any) => t.status === 'available')

  const handleApply = async (shipmentId: number) => {
    if (!availableTruck) {
      alert('You need at least one available truck to apply for a job.')
      return
    }
    if (!confirm('Accept this shipment job?')) return
    setApplyingId(shipmentId)
    try {
      await updateShipmentStatus({
        shipmentId,
        status: 'accepted',
        transporterId: userId!,
        truckId: availableTruck.truckId,
      }).unwrap()
    } catch (err) {
      console.error('Failed to accept job', err)
    } finally {
      setApplyingId(null)
    }
  }

  return (
    <DashboardLayout userRole="transporter">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            Available Jobs 🚛
          </h1>
          <p className="text-[#8A95A3] text-sm">Browse open shipments and accept jobs that match your route.</p>
        </div>

        {/* No available truck warning */}
        {!isLoading && trucks && !availableTruck && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm rounded-lg px-4 py-3 mb-6">
            ⚠️ You have no available trucks. Update a truck status to "Available" before accepting jobs.
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#1C2128] border border-white/5 rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-3/4 mb-4" />
                <div className="h-3 bg-white/5 rounded w-1/2 mb-2" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="font-display text-xl font-bold text-white mb-2">Failed to load jobs</p>
            <p className="text-[#8A95A3] text-sm">Make sure the backend is running</p>
          </div>
        )}

        {!isLoading && !isError && (shipments ?? []).length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📦</p>
            <p className="font-display text-xl font-bold text-white mb-2">No open jobs right now</p>
            <p className="text-[#8A95A3] text-sm">Check back soon — businesses are posting shipments daily</p>
          </div>
        )}

        {!isLoading && !isError && (shipments ?? []).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(shipments ?? []).map((shipment: any) => (
              <div
                key={shipment.shipmentId}
                className="bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden hover:border-[#E8830A]/30 transition-all"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#1a2235] to-[#1C1810] px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-display font-bold">{shipment.cargoType}</p>
                    <p className="text-[#8A95A3] text-xs">#{shipment.shipmentId}</p>
                  </div>
                  <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold px-3 py-1 rounded-full">
                    Open
                  </span>
                </div>

                <div className="p-5">
                  {/* Route */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-[#0D1117] rounded-lg">
                    <span className="text-white font-semibold text-sm">{shipment.origin}</span>
                    <svg className="flex-shrink-0" width="20" height="10" viewBox="0 0 20 10" fill="none">
                      <path d="M0 5h18M14 1l4 4-4 4" stroke="#E8830A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-white font-semibold text-sm">{shipment.destination}</span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8A95A3]">Weight</span>
                      <span className="text-white font-semibold">{shipment.weightTonnes} tonnes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8A95A3]">Pickup</span>
                      <span className="text-white font-semibold">{formatDate(shipment.pickupDate)}</span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="mb-4 pb-4 border-b border-white/[0.07]">
                    <p className="text-[#8A95A3] text-xs mb-1">Budget</p>
                    <p className="font-display text-2xl font-bold text-[#E8830A]">{formatBudget(shipment.budget)}</p>
                  </div>

                  <button
                    onClick={() => handleApply(shipment.shipmentId)}
                    disabled={applyingId === shipment.shipmentId || !availableTruck}
                    className="w-full bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-40 disabled:cursor-not-allowed text-[#111418] font-bold text-sm py-2.5 rounded-lg transition-all"
                  >
                    {applyingId === shipment.shipmentId ? 'Accepting...' : 'Accept Job'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}