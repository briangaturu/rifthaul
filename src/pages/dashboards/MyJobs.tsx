import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useGetMyShipmentsQuery, useUpdateShipmentStatusMutation } from '../../features/api/shipmentApi'
import { useState } from 'react'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

const formatBudget = (budget: string | null) =>
  budget ? `KES ${Number(budget).toLocaleString()}` : 'Negotiable'

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'accepted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'in_transit': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    case 'delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    case 'cancelled': return 'bg-red-500/10 text-red-400 border-red-500/20'
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

const formatStatus = (status: string) =>
  status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())

export default function AvailableJobs() {
  const { data: shipments, isLoading, isError } = useGetMyShipmentsQuery(undefined)
  const [updateShipmentStatus] = useUpdateShipmentStatusMutation()
  const [updatingId, setUpdatingId] = useState<number | null>(null)

  const myJobs = (shipments ?? []).filter((s: any) =>
    ['accepted', 'in_transit', 'delivered', 'cancelled'].includes(s.status)
  )

  const handleStatusUpdate = async (shipmentId: number, status: 'in_transit' | 'delivered') => {
    if (!confirm(`Mark as "${formatStatus(status)}"?`)) return
    setUpdatingId(shipmentId)
    try {
      await updateShipmentStatus({ shipmentId, status }).unwrap()
    } catch (err) {
      console.error('Failed to update status', err)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <DashboardLayout userRole="transporter">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            My Jobs 📋
          </h1>
          <p className="text-[#8A95A3] text-sm">Track and update the status of your accepted jobs.</p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
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
            <p className="text-[#8A95A3] text-sm">Make sure you are logged in</p>
          </div>
        )}

        {!isLoading && !isError && myJobs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📋</p>
            <p className="font-display text-xl font-bold text-white mb-2">No jobs yet</p>
            <p className="text-[#8A95A3] text-sm">Browse the marketplace and accept a shipment to get started</p>
          </div>
        )}

        {!isLoading && !isError && myJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myJobs.map((shipment: any) => (
              <div
                key={shipment.shipmentId}
                className="bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden hover:border-[#E8830A]/30 transition-all"
              >
                <div className="bg-gradient-to-r from-[#1a2235] to-[#1C1810] px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-display font-bold">{shipment.cargoType}</p>
                    <p className="text-[#8A95A3] text-xs">#{shipment.shipmentId}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(shipment.status)}`}>
                    {formatStatus(shipment.status)}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-4 p-3 bg-[#0D1117] rounded-lg">
                    <span className="text-white font-semibold text-sm">{shipment.origin}</span>
                    <svg className="flex-shrink-0" width="20" height="10" viewBox="0 0 20 10" fill="none">
                      <path d="M0 5h18M14 1l4 4-4 4" stroke="#E8830A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-white font-semibold text-sm">{shipment.destination}</span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8A95A3]">Weight</span>
                      <span className="text-white font-semibold">{shipment.weightTonnes} tonnes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8A95A3]">Pickup</span>
                      <span className="text-white font-semibold">{formatDate(shipment.pickupDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8A95A3]">Earnings</span>
                      <span className="text-[#E8830A] font-bold">{formatBudget(shipment.budget)}</span>
                    </div>
                  </div>

                  {shipment.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusUpdate(shipment.shipmentId, 'in_transit')}
                      disabled={updatingId === shipment.shipmentId}
                      className="w-full bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-bold text-sm py-2.5 rounded-lg transition-all disabled:opacity-50"
                    >
                      {updatingId === shipment.shipmentId ? 'Updating...' : 'Mark as In Transit'}
                    </button>
                  )}
                  {shipment.status === 'in_transit' && (
                    <button
                      onClick={() => handleStatusUpdate(shipment.shipmentId, 'delivered')}
                      disabled={updatingId === shipment.shipmentId}
                      className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-sm py-2.5 rounded-lg transition-all disabled:opacity-50"
                    >
                      {updatingId === shipment.shipmentId ? 'Updating...' : 'Mark as Delivered'}
                    </button>
                  )}
                  {shipment.status === 'delivered' && (
                    <div className="w-full text-center text-emerald-400 text-sm font-semibold py-2.5">✅ Delivered</div>
                  )}
                  {shipment.status === 'cancelled' && (
                    <div className="w-full text-center text-red-400 text-sm font-semibold py-2.5">❌ Cancelled</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}