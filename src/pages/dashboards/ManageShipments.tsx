import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useGetAllShipmentsQuery, useDeleteShipmentMutation } from '../../features/api/shipmentApi'

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'open': return 'bg-green-500/10 text-green-400'
    case 'accepted': return 'bg-blue-500/10 text-blue-400'
    case 'in_transit': return 'bg-yellow-500/10 text-yellow-400'
    case 'delivered': return 'bg-emerald-500/10 text-emerald-400'
    case 'cancelled': return 'bg-red-500/10 text-red-400'
    default: return 'bg-gray-500/10 text-gray-400'
  }
}

const formatStatus = (status: string) =>
  status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

export default function ManageShipments() {
  const { data: shipments, isLoading, isError } = useGetAllShipmentsQuery(undefined)
  const [deleteShipment] = useDeleteShipmentMutation()

  const handleDelete = async (shipmentId: number) => {
    if (!confirm('Are you sure you want to delete this shipment?')) return
    try {
      await deleteShipment(shipmentId).unwrap()
    } catch (err) {
      console.error('Failed to delete shipment', err)
    }
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            Manage Shipments
          </h1>
          <p className="text-[#8A95A3] text-sm">View and manage all shipments on the platform.</p>
        </div>

        <div className="bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden">
          {isLoading && (
            <div className="p-12 text-center text-[#8A95A3] text-sm">Loading shipments...</div>
          )}

          {isError && (
            <div className="p-12 text-center text-red-400 text-sm">Failed to load shipments. Make sure the backend is running.</div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D1117] border-b border-white/5">
                  <tr>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">ID</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Cargo</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Route</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Weight</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Status</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Pickup Date</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(shipments ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-[#8A95A3] text-sm">
                        No shipments found
                      </td>
                    </tr>
                  ) : (
                    (shipments ?? []).map((shipment: any) => (
                      <tr key={shipment.shipmentId} className="border-b border-white/5 hover:bg-[#2D3748] transition-colors">
                        <td className="px-6 py-4 text-white text-sm font-medium">#{shipment.shipmentId}</td>
                        <td className="px-6 py-4 text-white text-sm">{shipment.cargoType}</td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{shipment.origin} → {shipment.destination}</td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{shipment.weightTonnes} t</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(shipment.status)}`}>
                            {formatStatus(shipment.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{formatDate(shipment.pickupDate)}</td>
                        <td className="px-6 py-4 flex items-center gap-4">
                          <button className="text-[#E8830A] hover:text-[#F5A030] text-sm font-semibold transition-colors">
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(shipment.shipmentId)}
                            className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}