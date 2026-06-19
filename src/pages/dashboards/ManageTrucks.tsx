import DashboardLayout from '../../components/dashboard/DashboardLayout'

const trucks = [
  { id: 'TRK-5624', registration: 'KCA 234B', driver: 'John Kamau', type: 'Flatbed Trailer', capacity: '15 tonnes', status: 'Available', location: 'Nairobi' },
  { id: 'TRK-5623', registration: 'KBZ 789C', driver: 'Peter Omondi', type: 'Refrigerated Truck', capacity: '8 tonnes', status: 'On Trip', location: 'Mombasa' },
  { id: 'TRK-5622', registration: 'KDB 456A', driver: 'James Kipchoge', type: 'Trailer', capacity: '20 tonnes', status: 'Available', location: 'Eldoret' },
  { id: 'TRK-5621', registration: 'KCE 123D', driver: 'David Mwangi', type: 'Box Truck', capacity: '5 tonnes', status: 'Maintenance', location: 'Kisumu' },
  { id: 'TRK-5620', registration: 'KAA 987F', driver: 'Samuel Otieno', type: 'Tanker', capacity: '12 tonnes', status: 'Available', location: 'Nairobi' },
]

export default function ManageTrucks() {
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D1117] border-b border-white/5">
                <tr>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">ID</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Registration</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Driver</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Type</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Capacity</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Status</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Location</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trucks.map((truck) => (
                  <tr key={truck.id} className="border-b border-white/5 hover:bg-[#2D3748] transition-colors">
                    <td className="px-6 py-4 text-white text-sm font-medium">{truck.id}</td>
                    <td className="px-6 py-4 text-white text-sm">{truck.registration}</td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{truck.driver}</td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{truck.type}</td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{truck.capacity}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        truck.status === 'Available' 
                          ? 'bg-green-500/10 text-green-400' 
                          : truck.status === 'On Trip'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {truck.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{truck.location}</td>
                    <td className="px-6 py-4">
                      <button className="text-[#E8830A] hover:text-[#F5A030] text-sm font-semibold transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
