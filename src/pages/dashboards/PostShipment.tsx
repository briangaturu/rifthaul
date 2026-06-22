import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useCreateShipmentMutation } from '../../features/api/shipmentApi'

export default function PostShipment() {
  const navigate = useNavigate()
  const [createShipment, { isLoading }] = useCreateShipmentMutation()
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    cargoType: '',
    weightTonnes: '',
    pickupLocation: '',
    deliveryLocation: '',
    pickupDate: '',
    budget: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await createShipment({
        cargoType: formData.cargoType,
        weightTonnes: Number(formData.weightTonnes),
        origin: formData.pickupLocation,
        destination: formData.deliveryLocation,
        pickupDate: new Date(formData.pickupDate).toISOString(),
        budget: formData.budget ? Number(formData.budget) : undefined,
      }).unwrap()

      navigate('/dashboard/business/shipments')
    } catch (err: any) {
      setError(err?.data?.error?.[0]?.message || err?.data?.error || 'Failed to post shipment. Please try again.')
    }
  }

  return (
    <DashboardLayout userRole="business">
      <div className="p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
              Post New Shipment
            </h1>
            <p className="text-[#8A95A3] text-sm">Fill in the details below to post your shipment.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-[#1C2128] border border-white/5 rounded-xl p-6 md:p-8">

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Cargo Type</label>
                  <select
                    name="cargoType"
                    value={formData.cargoType}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  >
                    <option value="">Select type</option>
                    <option value="General Goods">General Goods</option>
                    <option value="Perishable">Perishable</option>
                    <option value="Fragile">Fragile</option>
                    <option value="Construction Materials">Construction Materials</option>
                    <option value="Agricultural Products">Agricultural Products</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Weight (tonnes)</label>
                  <input
                    type="number"
                    name="weightTonnes"
                    value={formData.weightTonnes}
                    onChange={handleChange}
                    placeholder="e.g., 15"
                    required
                    min="0"
                    step="0.1"
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Pickup Location</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="e.g., Nairobi"
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Delivery Location</label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={formData.deliveryLocation}
                    onChange={handleChange}
                    placeholder="e.g., Mombasa"
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">Budget (KES)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., 45000"
                    min="0"
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-50 disabled:cursor-not-allowed text-[#111418] font-bold text-sm py-3 rounded-lg transition-all hover:not-disabled:-translate-y-0.5"
                >
                  {isLoading ? 'Posting...' : 'Post Shipment'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard/business')}
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