import { useEffect, useRef } from 'react'

type TabType = 'shipments' | 'trucks'

interface FiltersProps {
  activeTab: TabType
}

export default function Filters({ activeTab }: FiltersProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal bg-[#1C2128] border border-white/5 rounded-xl p-6 sticky top-24">
      <h3 className="font-display text-xl font-bold text-white mb-6">
        Filter {activeTab === 'shipments' ? 'Shipments' : 'Trucks'}
      </h3>
      
      <div className="space-y-6">
        {activeTab === 'shipments' ? (
          <>
            {/* Route */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Route</label>
              <select className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors">
                <option value="">All routes</option>
                <option value="nairobi-mombasa">Nairobi → Mombasa</option>
                <option value="nairobi-kisumu">Nairobi → Kisumu</option>
                <option value="nairobi-eldoret">Nairobi → Eldoret</option>
                <option value="mombasa-nairobi">Mombasa → Nairobi</option>
              </select>
            </div>

            {/* Cargo Type */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Cargo Type</label>
              <select className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors">
                <option value="">All types</option>
                <option value="general">General Goods</option>
                <option value="perishable">Perishable</option>
                <option value="fragile">Fragile</option>
                <option value="bulk">Bulk Materials</option>
              </select>
            </div>

            {/* Weight Range */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Weight</label>
              <select className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors">
                <option value="">Any weight</option>
                <option value="0-5">0 - 5 tonnes</option>
                <option value="5-10">5 - 10 tonnes</option>
                <option value="10-20">10 - 20 tonnes</option>
                <option value="20+">20+ tonnes</option>
              </select>
            </div>

            {/* Pickup Date */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Pickup Date</label>
              <input
                type="date"
                className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors"
              />
            </div>
          </>
        ) : (
          <>
            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Location</label>
              <select className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors">
                <option value="">All locations</option>
                <option value="nairobi">Nairobi</option>
                <option value="mombasa">Mombasa</option>
                <option value="kisumu">Kisumu</option>
                <option value="eldoret">Eldoret</option>
                <option value="nakuru">Nakuru</option>
              </select>
            </div>

            {/* Truck Type */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Truck Type</label>
              <select className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors">
                <option value="">All types</option>
                <option value="flatbed">Flatbed Trailer</option>
                <option value="refrigerated">Refrigerated Truck</option>
                <option value="container">Container Truck</option>
                <option value="box">Box Truck</option>
                <option value="tipper">Tipper Truck</option>
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Capacity</label>
              <select className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors">
                <option value="">Any capacity</option>
                <option value="0-5">0 - 5 tonnes</option>
                <option value="5-10">5 - 10 tonnes</option>
                <option value="10-15">10 - 15 tonnes</option>
                <option value="15-20">15 - 20 tonnes</option>
                <option value="20+">20+ tonnes</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Minimum Rating</label>
              <select className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors">
                <option value="">Any rating</option>
                <option value="4.5">4.5+ stars</option>
                <option value="4.0">4.0+ stars</option>
                <option value="3.5">3.5+ stars</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Available From</label>
              <input
                type="date"
                className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#E8830A]/50 transition-colors"
              />
            </div>
          </>
        )}

        <button className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5">
          Apply Filters
        </button>

        <button className="w-full text-[#8A95A3] hover:text-white font-semibold text-sm transition-colors">
          Reset All
        </button>
      </div>
    </div>
  )
}
