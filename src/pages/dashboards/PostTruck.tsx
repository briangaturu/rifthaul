import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function PostTruck() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    registrationNumber: '',
    truckType: '',
    capacity: '',
    location: '',
    pricePerKm: '',
    availability: '',
    description: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit to backend
    console.log('Truck data:', formData)
    alert('Truck posted successfully!')
    navigate('/dashboard/transporter/trucks')
  }

  return (
    <DashboardLayout userRole="transporter">
      <div className="p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
              Add New Truck
            </h1>
            <p className="text-[#8A95A3] text-sm">Register your truck to start receiving jobs.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-[#1C2128] border border-white/5 rounded-xl p-6 md:p-8">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Registration Number</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="e.g., KCA 234B"
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
                  <label className="block text-white text-sm font-semibold mb-2">Maximum Load Capacity (tonnes)</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g., 15"
                    required
                    min="0"
                    step="0.1"
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Price per KM (KES)</label>
                  <input
                    type="number"
                    name="pricePerKm"
                    value={formData.pricePerKm}
                    onChange={handleChange}
                    placeholder="e.g., 120"
                    required
                    min="0"
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Current Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Nairobi"
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Available From</label>
                  <input
                    type="date"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Additional details about your truck..."
                  rows={4}
                  className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm py-3 rounded-lg transition-all hover:-translate-y-0.5"
                >
                  Add Truck
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/transporter')}
                  className="px-6 border border-white/15 hover:border-white/40 text-white font-semibold text-sm py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
