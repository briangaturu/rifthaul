import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useGetAllTransportersQuery, useGetAllBusinessesQuery, useDeleteUserProfileMutation } from '../../features/api/userApi'

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

const getUserName = (user: any) =>
  user.fullName ?? user.companyName ?? user.email

export default function ManageUsers() {
  const { data: transporters, isLoading: loadingTransporters } = useGetAllTransportersQuery(undefined)
  const { data: businesses, isLoading: loadingBusinesses } = useGetAllBusinessesQuery(undefined)
  const [deleteUser] = useDeleteUserProfileMutation()

  const isLoading = loadingTransporters || loadingBusinesses

  const allUsers = [
    ...(transporters ?? []).map((u: any) => ({ ...u, type: 'Transporter' })),
    ...(businesses ?? []).map((u: any) => ({ ...u, type: 'Business' })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await deleteUser(userId).unwrap()
    } catch (err) {
      console.error('Failed to delete user', err)
    }
  }

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
          {isLoading && (
            <div className="p-12 text-center text-[#8A95A3] text-sm">Loading users...</div>
          )}

          {!isLoading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0D1117] border-b border-white/5">
                  <tr>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Name</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Email</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Type</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Phone</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Joined</th>
                    <th className="text-left text-[#8A95A3] text-xs font-semibold uppercase px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-[#8A95A3] text-sm">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    allUsers.map((user: any) => (
                      <tr key={user.userId} className="border-b border-white/5 hover:bg-[#2D3748] transition-colors">
                        <td className="px-6 py-4 text-white text-sm font-medium">{getUserName(user)}</td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8830A]/10 text-[#E8830A]">
                            {user.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{user.phone ?? '—'}</td>
                        <td className="px-6 py-4 text-[#8A95A3] text-sm">{formatDate(user.createdAt)}</td>
                        <td className="px-6 py-4 flex items-center gap-4">
                          <button className="text-[#E8830A] hover:text-[#F5A030] text-sm font-semibold transition-colors">
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(user.userId)}
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