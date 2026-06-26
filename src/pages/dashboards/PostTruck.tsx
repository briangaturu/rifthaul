import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useCreateTruckMutation } from '../../features/api/truckApi'

type TruckFormData = {
  plateNumber: string
  truckType: string
  capacityTonnes: string
  location: string
}

export default function PostTruck() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createTruck, { isLoading }] = useCreateTruckMutation()
  const [formData, setFormData] = useState<TruckFormData>({
    plateNumber: '',
    truckType: '',
    capacityTonnes: '',
    location: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTruck(formData).unwrap()
      alert('Truck posted successfully!')
      setIsModalOpen(false)
      setFormData({
        plateNumber: '',
        truckType: '',
        capacityTonnes: '',
        location: '',
      })
      navigate('/dashboard/transporter/trucks')
    } catch (error) {
      console.error('Truck post failed:', error)
      alert('Failed to post truck')
    }
  }

  return (
    <DashboardLayout userRole="transporter">
      <div className="p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
                My Trucks
              </h1>
              <p className="text-[#8A95A3] text-sm">Manage your registered trucks.</p>
            </div>

            <button
              type="button"
              onClick={openModal}
              className="bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-4 py-3 rounded-lg transition-all"
            >
              Add New Truck
            </button>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-truck-title"
            >
              <div className="w-full max-w-3xl rounded-xl bg-[#1C2128] border border-white/10 shadow-2xl">
                <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h2 id="add-truck-title" className="text-white text-xl font-bold">
                      Add New Truck
                    </h2>
                    <p className="text-[#8A95A3] text-sm">
                      Register your truck to start receiving jobs.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-[#8A95A3] hover:text-white text-2xl leading-none"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 md:p-6">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">
                          Plate Number
                        </label>
                        <input
                          type="text"
                          name="plateNumber"
                          value={formData.plateNumber}
                          onChange={handleChange}
                          placeholder="e.g., KDB 150A"
                          required
                          className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">Truck Type</label>
                        <select
                          name="truckType"
                          value={formData.truckType}
                          onChange={handleChange}
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">
                          Capacity (tonnes)
                        </label>
                        <input
                          type="number"
                          name="capacityTonnes"
                          value={formData.capacityTonnes}
                          onChange={handleChange}
                          placeholder="e.g., 15"
                          required
                          min="0"
                          step="0.1"
                          className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white text-sm font-semibold mb-2">
                          Current Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="e.g., Nairobi"
                          className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-60 text-[#111418] font-bold text-sm py-3 rounded-lg transition-all hover:-translate-y-0.5"
                      >
                        {isLoading ? 'Posting...' : 'Add Truck'}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}