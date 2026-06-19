import DashboardLayout from '../../components/dashboard/DashboardLayout'

const users = [
  { id: '1', name: 'John Kamau', email: 'john@example.com', type: 'Transporter', status: 'Active', joined: '2025-12-15' },
  { id: '2', name: 'Acme Ltd', email: 'contact@acme.com', type: 'Business', status: 'Active', joined: '2026-01-20' },
  { id: '3', name: 'Mary Wanjiku', email: 'mary@example.com', type: 'Transporter', status: 'Active', joined: '2026-02-10' },
  { id: '4', name: 'Swift Logistics', email: 'info@swift.com', type: 'Business', status: 'Active', joined: '2026-03-05' },
  { id: '5', name: 'Peter Omondi', email: 'peter@example.com', type: 'Transporter', status: 'Suspended', joined: '2025-11-30' },
]

export default function ManageUsers() {
  return (
    <DashboardLayout userRole="admin">
      <div className="p-4 md:p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
            Manage Users
          </h1>
          <p className="text-[#8A95A3] text-sm">View and manage all platform users.</p>
        </div>

        <div className="bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0D1117] border-b border-white/5">
                <tr>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Name</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Email</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Type</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Status</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Joined</th>
                  <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-[#2D3748] transition-colors">
                    <td className="px-6 py-4 text-white text-sm font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8830A]/10 text-[#E8830A]">
                        {user.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#8A95A3] text-sm">{user.joined}</td>
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
