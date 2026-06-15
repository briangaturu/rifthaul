import { useEffect, useRef } from 'react'

const shipments = [
  {
    id: 'SH-2847',
    title: 'Construction Materials',
    cargoType: 'Building Supplies',
    weight: '15 tonnes',
    pickupLocation: 'Nairobi',
    deliveryLocation: 'Nakuru',
    distance: '160 km',
    budget: 'KES 45,000',
    pickupDate: '18 Jul 2026',
    deliveryDeadline: '19 Jul 2026',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
  },
  {
    id: 'SH-2846',
    title: 'Fresh Produce',
    cargoType: 'Perishable Goods',
    weight: '8 tonnes',
    pickupLocation: 'Nairobi',
    deliveryLocation: 'Kisumu',
    distance: '350 km',
    budget: 'KES 65,000',
    pickupDate: '17 Jul 2026',
    deliveryDeadline: '17 Jul 2026',
    status: 'Urgent',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80',
  },
  {
    id: 'SH-2845',
    title: 'Electronics & Appliances',
    cargoType: 'Fragile Items',
    weight: '5 tonnes',
    pickupLocation: 'Mombasa',
    deliveryLocation: 'Nairobi',
    distance: '480 km',
    budget: 'KES 85,000',
    pickupDate: '20 Jul 2026',
    deliveryDeadline: '21 Jul 2026',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80',
  },
  {
    id: 'SH-2844',
    title: 'Agricultural Products',
    cargoType: 'Grains & Seeds',
    weight: '12 tonnes',
    pickupLocation: 'Eldoret',
    deliveryLocation: 'Nairobi',
    distance: '310 km',
    budget: 'KES 58,000',
    pickupDate: '19 Jul 2026',
    deliveryDeadline: '20 Jul 2026',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
  },
  {
    id: 'SH-2843',
    title: 'Furniture & Home Goods',
    cargoType: 'General Cargo',
    weight: '7 tonnes',
    pickupLocation: 'Nairobi',
    deliveryLocation: 'Mombasa',
    distance: '480 km',
    budget: 'KES 72,000',
    pickupDate: '21 Jul 2026',
    deliveryDeadline: '22 Jul 2026',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
  },
  {
    id: 'SH-2842',
    title: 'Beverages & Drinks',
    cargoType: 'Packaged Goods',
    weight: '10 tonnes',
    pickupLocation: 'Nairobi',
    deliveryLocation: 'Kisumu',
    distance: '350 km',
    budget: 'KES 62,000',
    pickupDate: '22 Jul 2026',
    deliveryDeadline: '23 Jul 2026',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Urgent':
      return 'bg-red-500/90'
    case 'Open':
      return 'bg-green-500/90'
    default:
      return 'bg-gray-500/90'
  }
}

export default function ShipmentList() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="reveal bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[#E8830A]/30 cursor-pointer group"
        >
          {/* Shipment Image */}
          <div className="relative h-48 overflow-hidden bg-[#0D1117]">
            <img
              src={shipment.image}
              alt={shipment.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Cargo Type Badge - Left Side */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#E8830A]/90 text-white backdrop-blur-sm">
                {shipment.cargoType}
              </span>
            </div>

            {/* Status Badge - Right Side */}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm ${getStatusColor(shipment.status)}`}>
                {shipment.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Shipment Title with Icon */}
            <div className="mb-4">
              <h3 className="font-display text-xl font-bold text-white">
                📦 {shipment.title}
              </h3>
            </div>

            {/* Essential Details */}
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-start justify-between">
                <span className="text-[#8A95A3] text-xs">Weight:</span>
                <span className="text-white font-semibold text-xs">{shipment.weight}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#8A95A3] text-xs">From:</span>
                <span className="text-white font-semibold text-xs">{shipment.pickupLocation}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#8A95A3] text-xs">To:</span>
                <span className="text-white font-semibold text-xs">{shipment.deliveryLocation}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#8A95A3] text-xs">Distance:</span>
                <span className="text-white font-semibold text-xs">{shipment.distance}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#8A95A3] text-xs">Pickup:</span>
                <span className="text-white font-semibold text-xs">{shipment.pickupDate}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#8A95A3] text-xs">Deadline:</span>
                <span className="text-white font-semibold text-xs">{shipment.deliveryDeadline}</span>
              </div>
            </div>

            {/* Budget */}
            <div className="mb-4 pb-4 border-b border-white/[0.07]">
              <p className="text-[#8A95A3] text-xs mb-1">Budget</p>
              <p className="font-display text-2xl font-bold text-[#E8830A]">{shipment.budget}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 border border-white/15 hover:border-white/40 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all">
                View Load
              </button>
              <button className="flex-1 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-xs px-4 py-2.5 rounded-lg transition-all hover:-translate-y-0.5">
                Apply
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
