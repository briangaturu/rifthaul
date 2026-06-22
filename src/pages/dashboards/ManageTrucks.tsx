import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useGetAllTrucksQuery, useDeleteTruckMutation } from '../../features/api/truckApi'

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-500/10 text-green-400'
    case 'on_job': return 'bg-blue-500/10 text-blue-400'
    case 'inactive': return 'bg-yellow-500/10 text-yellow-400'
    default: return 'bg-gray-500/10 text-gray-400'
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

export default function ManageTrucks() {
  const { data: trucks, isLoading, isError } = useGetAllTrucksQuery(undefined)
  const [deleteTruck] = useDeleteTruckMutation()

  const handleDelete = async (truckId: number) => {
    if (!confirm('Are you sure you want to delete this truck?')) return
    try {
      await deleteTruck(truckId).unwrap()
    } catch (err) {
      console.error('Failed to delete truck', err)
    }
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            Manage Trucks
          </h1>
          <p className="text-[#8A95A3] text-sm">View and manage all registered trucks.</p>
        </div>

        <div className="bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden">
          {isLoading && (
            <div className="p-12 text-center text-[#8A95A3] text-sm">Loading trucks...</div>
          )}

          {isError && (
            <div className="p-12 text-center text-red-400 text-sm">
              Failed to load trucks. Make sure the backend is running.
            </div>
          )}

          {!isLoading && !isError && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D1117] border-b border-white/5">
                  <tr>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">ID</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Plate</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Type</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Capacity</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Status</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Location</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(trucks ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-[#8A95A3] text-sm">
                        No trucks registered yet
                      </td>
                    </tr>
                  ) : (
                    (trucks ?? []).map((truck: any) => (
                      <tr key={truck.truckId} className="border-b border-white/5 hover:bg-[#2D3748] transition-colors">
                        <td className="px-6 py-4 text-white text-sm font-medium">#{truck.truckId}</td>
                        <td className="px-6 py-4 text-white text-sm">{truck.plateNumber}</td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{truck.truckType}</td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{truck.capacityTonnes} t</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(truck.status)}`}>
                            {formatStatus(truck.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{truck.location ?? '—'}</td>
                        <td className="px-6 py-4 flex items-center gap-4">
                          <button className="text-[#E8830A] hover:text-[#F5A030] text-sm font-semibold transition-colors">
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(truck.truckId)}
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