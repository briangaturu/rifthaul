import DashboardLayout from '../../components/dashboard/DashboardLayout'

const shipments = [
  { id: 'SH-2847', title: 'Construction Materials', from: 'Nairobi', to: 'Nakuru', weight: '15 tonnes', status: 'Active', date: '18 Jul 2026' },
  { id: 'SH-2846', title: 'Fresh Produce', from: 'Nairobi', to: 'Kisumu', weight: '8 tonnes', status: 'Completed', date: '17 Jul 2026' },
  { id: 'SH-2845', title: 'Electronics', from: 'Mombasa', to: 'Nairobi', weight: '5 tonnes', status: 'Active', date: '20 Jul 2026' },
  { id: 'SH-2844', title: 'Agricultural Products', from: 'Eldoret', to: 'Nairobi', weight: '12 tonnes', status: 'Active', date: '19 Jul 2026' },
  { id: 'SH-2843', title: 'Furniture', from: 'Nairobi', to: 'Mombasa', weight: '7 tonnes', status: 'Cancelled', date: '21 Jul 2026' },
]

export default function ManageShipments() {
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D1117] border-b border-white/5">
                <tr>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">ID</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Title</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Route</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Weight</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Status</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Date</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-white/5 hover:bg-[#2D3748] transition-colors">
                    <td className="px-6 py-4 text-white text-sm font-medium">{shipment.id}</td>
                    <td className="px-6 py-4 text-white text-sm">{shipment.title}</td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{shipment.from} → {shipment.to}</td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{shipment.weight}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        shipment.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400' 
                          : shipment.status === 'Completed'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{shipment.date}</td>
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
