import { useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useGetMyTrucksQuery, useDeleteTruckMutation, useUpdateTruckMutation, useUpdateTruckStatusMutation, useCreateTruckMutation } from '../../features/api/truckApi'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available': return 'bg-green-500/10 text-green-400 border-green-500/20'
    case 'on_job': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    case 'inactive': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
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

interface EditForm {
  plateNumber: string
  truckType: string
  capacityTonnes: string
  location: string
}

const emptyForm: EditForm = { plateNumber: '', truckType: '', capacityTonnes: '', location: '' }

export default function MyTrucks() {
  const { data: trucks, isLoading, isError } = useGetMyTrucksQuery(undefined)
  const [createTruck, { isLoading: isCreating }] = useCreateTruckMutation()
  const [deleteTruck] = useDeleteTruckMutation()
  const [updateTruck] = useUpdateTruckMutation()
  const [updateTruckStatus] = useUpdateTruckStatusMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addForm, setAddForm] = useState<EditForm>(emptyForm)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<EditForm>(emptyForm)

  // ── Add truck ──
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTruck({
        plateNumber: addForm.plateNumber,
        truckType: addForm.truckType,
        capacityTonnes: Number(addForm.capacityTonnes),
        location: addForm.location,
      }).unwrap()
      setIsModalOpen(false)
      setAddForm(emptyForm)
    } catch (err) {
      console.error('Failed to add truck', err)
    }
  }

  // ── Edit truck ──
  const handleEditOpen = (truck: any) => {
    setEditingId(truck.truckId)
    setEditForm({
      plateNumber: truck.plateNumber,
      truckType: truck.truckType,
      capacityTonnes: truck.capacityTonnes,
      location: truck.location ?? '',
    })
  }

  const handleEditSave = async (truckId: number) => {
    try {
      await updateTruck({
        truckId,
        plateNumber: editForm.plateNumber,
        truckType: editForm.truckType,
        capacityTonnes: Number(editForm.capacityTonnes),
        location: editForm.location,
      }).unwrap()
      setEditingId(null)
    } catch (err) {
      console.error('Failed to update truck', err)
    }
  }

  // ── Delete truck ──
  const handleDelete = async (truckId: number) => {
    if (!confirm('Are you sure you want to remove this truck?')) return
    try {
      await deleteTruck(truckId).unwrap()
    } catch (err) {
      console.error('Failed to delete truck', err)
    }
  }

  // ── Status change ──
  const handleStatusChange = async (truckId: number, status: 'available' | 'on_job' | 'inactive') => {
    try {
      await updateTruckStatus({ truckId, status }).unwrap()
    } catch (err) {
      console.error('Failed to update truck status', err)
    }
  }

  return (
    <DashboardLayout userRole="transporter">
      <div className="p-4 md:p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">My Trucks</h1>
            <p className="text-[#8A95A3] text-sm">Manage your registered trucks.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-5 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            + Add Truck
          </button>
        </div>

        {/* ── Add Truck Modal ── */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-2xl rounded-xl bg-[#1C2128] border border-white/10 shadow-2xl">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-white text-xl font-bold">Add New Truck</h2>
                  <p className="text-[#8A95A3] text-sm">Register your truck to start receiving jobs.</p>
                </div>
                <button
                  onClick={() => { setIsModalOpen(false); setAddForm(emptyForm) }}
                  className="text-[#8A95A3] hover:text-white text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Plate Number</label>
                    <input
                      type="text"
                      value={addForm.plateNumber}
                      onChange={(e) => setAddForm({ ...addForm, plateNumber: e.target.value })}
                      placeholder="e.g., KCA 234B"
                      required
                      className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Truck Type</label>
                    <select
                      value={addForm.truckType}
                      onChange={(e) => setAddForm({ ...addForm, truckType: e.target.value })}
                      required
                      className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                    >
                      <option value="">Select type</option>
                      <option value="Flatbed Trailer">Flatbed Trailer</option>
                      <option value="Box Truck">Box Truck</option>
                      <option value="Trailer">Trailer</option>
                      <option value="Tanker">Tanker</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Refrigerated Truck">Refrigerated Truck</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Capacity (tonnes)</label>
                    <input
                      type="number"
                      value={addForm.capacityTonnes}
                      onChange={(e) => setAddForm({ ...addForm, capacityTonnes: e.target.value })}
                      placeholder="e.g., 15"
                      required
                      min="0"
                      step="0.1"
                      className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Current Location</label>
                    <input
                      type="text"
                      value={addForm.location}
                      onChange={(e) => setAddForm({ ...addForm, location: e.target.value })}
                      placeholder="e.g., Nairobi"
                      className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-60 text-[#111418] font-bold text-sm py-3 rounded-lg transition-all"
                  >
                    {isCreating ? 'Adding...' : 'Add Truck'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsModalOpen(false); setAddForm(emptyForm) }}
                    className="px-6 border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Loading */}
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

        {/* Error */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="font-display text-xl font-bold text-white mb-2">Failed to load trucks</p>
            <p className="text-[#8A95A3] text-sm">Make sure you are logged in</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && (trucks ?? []).length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🚛</p>
            <p className="font-display text-xl font-bold text-white mb-2">No trucks yet</p>
            <p className="text-[#8A95A3] text-sm mb-6">Register your first truck to start receiving jobs</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-6 py-3 rounded-lg transition-all"
            >
              + Add Truck
            </button>
          </div>
        )}

        {/* Trucks Grid */}
        {!isLoading && !isError && (trucks ?? []).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(trucks ?? []).map((truck: any) => (
              <div
                key={truck.truckId}
                className="bg-[#1C2128] border border-white/5 rounded-xl p-6 hover:border-[#E8830A]/30 transition-all"
              >
                {editingId === truck.truckId ? (
                  /* ── Edit Mode ── */
                  <div className="space-y-3">
                    <p className="text-white font-display font-bold text-lg mb-4">Edit Truck</p>
                    <div>
                      <label className="text-[#8A95A3] text-xs mb-1 block">Plate Number</label>
                      <input
                        value={editForm.plateNumber}
                        onChange={(e) => setEditForm({ ...editForm, plateNumber: e.target.value })}
                        className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8830A]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[#8A95A3] text-xs mb-1 block">Truck Type</label>
                      <select
                        value={editForm.truckType}
                        onChange={(e) => setEditForm({ ...editForm, truckType: e.target.value })}
                        className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8830A]/50"
                      >
                        <option value="Flatbed Trailer">Flatbed Trailer</option>
                        <option value="Box Truck">Box Truck</option>
                        <option value="Trailer">Trailer</option>
                        <option value="Tanker">Tanker</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Refrigerated Truck">Refrigerated Truck</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[#8A95A3] text-xs mb-1 block">Capacity (tonnes)</label>
                      <input
                        type="number"
                        value={editForm.capacityTonnes}
                        onChange={(e) => setEditForm({ ...editForm, capacityTonnes: e.target.value })}
                        className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8830A]/50"
                      />
                    </div>
                    <div>
                      <label className="text-[#8A95A3] text-xs mb-1 block">Location</label>
                      <input
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8830A]/50"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleEditSave(truck.truckId)}
                        className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm py-2.5 rounded-lg transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-2.5 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── View Mode ── */
                  <>
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-2xl">
                          🚛
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-white">{truck.plateNumber}</h3>
                          <p className="text-[#E8830A] text-xs font-semibold">{truck.truckType}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(truck.status)}`}>
                        {formatStatus(truck.status)}
                      </span>
                    </div>

                    <div className="space-y-2.5 mb-5">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8A95A3]">Capacity</span>
                        <span className="text-white font-semibold">{truck.capacityTonnes} tonnes</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8A95A3]">Location</span>
                        <span className="text-white font-semibold">{truck.location ?? '—'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8A95A3]">Truck ID</span>
                        <span className="text-[#8A95A3] text-xs">#{truck.truckId}</span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <p className="text-[#8A95A3] text-xs mb-2">Update status</p>
                      <div className="flex gap-2">
                        {(['available', 'on_job', 'inactive'] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => handleStatusChange(truck.truckId, s)}
                            className={`flex-1 text-xs py-1.5 rounded-lg border transition-all ${
                              truck.status === s
                                ? 'bg-[#E8830A] border-[#E8830A] text-[#111418] font-bold'
                                : 'border-white/10 text-[#8A95A3] hover:border-white/30'
                            }`}
                          >
                            {formatStatus(s)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditOpen(truck)}
                        className="flex-1 border border-white/15 hover:border-[#E8830A]/50 hover:text-[#E8830A] text-white font-semibold text-sm py-2.5 rounded-lg transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(truck.truckId)}
                        className="flex-1 border border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold text-sm py-2.5 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}