import { useEffect, useRef } from 'react'

const trucks = [
  {
    id: 'TRK-5624',
    registrationNumber: 'KCA 234B',
    driver: 'John Kamau',
    truckType: 'Flatbed Trailer',
    capacity: '15 tonnes',
    location: 'Nairobi',
    rating: 4.8,
    trips: 127,
    status: 'Available',
    pricePerKm: 'KES 120/km',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
  },
  {
    id: 'TRK-5623',
    registrationNumber: 'KBZ 789C',
    driver: 'Peter Omondi',
    truckType: 'Refrigerated Truck',
    capacity: '8 tonnes',
    location: 'Mombasa',
    rating: 4.9,
    trips: 203,
    status: 'Available',
    pricePerKm: 'Negotiable',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
  },
  {
    id: 'TRK-5622',
    registrationNumber: 'KDB 456A',
    driver: 'James Kipchoge',
    truckType: 'Trailer',
    capacity: '20 tonnes',
    location: 'Eldoret',
    rating: 4.7,
    trips: 89,
    status: 'On Trip',
    pricePerKm: 'KES 95/km',
    image: 'https://images.unsplash.com/photo-1622183123244-f1ec66ca75b6?w=800&q=80',
  },
  {
    id: 'TRK-5621',
    registrationNumber: 'KCE 123D',
    driver: 'David Mwangi',
    truckType: 'Box Truck',
    capacity: '5 tonnes',
    location: 'Kisumu',
    rating: 4.6,
    trips: 156,
    status: 'Available',
    pricePerKm: 'KES 140/km',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    id: 'TRK-5620',
    registrationNumber: 'KAA 987F',
    driver: 'Samuel Otieno',
    truckType: 'Tanker',
    capacity: '12 tonnes',
    location: 'Nairobi',
    rating: 4.8,
    trips: 178,
    status: 'Scheduled',
    pricePerKm: 'KES 110/km',
    image: 'https://images.unsplash.com/photo-1565517798185-44698658f54e?w=800&q=80',
  },
  {
    id: 'TRK-5619',
    registrationNumber: 'KCC 567H',
    driver: 'Michael Wanjiku',
    truckType: 'Pickup',
    capacity: '2 tonnes',
    location: 'Nakuru',
    rating: 4.5,
    trips: 94,
    status: 'Available',
    pricePerKm: 'KES 85/km',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available':
      return 'bg-green-500/90'
    case 'On Trip':
      return 'bg-blue-500/90'
    case 'Scheduled':
      return 'bg-yellow-500/90'
    default:
      return 'bg-gray-500/90'
  }
}

export default function TruckList() {
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
      {trucks.map((truck) => (
        <div
          key={truck.id}
          className="reveal bg-[#1C2128] border border-white/5 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[#E8830A]/30 cursor-pointer group"
        >
          {/* Truck Photo */}
          <div className="relative h-48 overflow-hidden bg-[#0D1117]">
            <img
              src={truck.image}
              alt={truck.truckType}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Availability Status Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-sm ${getStatusColor(truck.status)}`}>
                {truck.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Registration Number & Truck Type */}
            <div className="mb-3">
              <h3 className="font-display text-xl font-bold text-white mb-1">{truck.registrationNumber}</h3>
              <p className="text-[#E8830A] font-semibold text-sm">{truck.truckType}</p>
            </div>

            {/* Driver Info with Rating */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.07]">
              <div>
                <p className="text-[#8A95A3] text-xs mb-0.5">Driver</p>
                <p className="text-white font-semibold text-sm">{truck.driver}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#E8830A] text-lg">⭐</span>
                <span className="text-white font-bold text-sm">{truck.rating}</span>
                <span className="text-[#8A95A3] text-xs">({truck.trips})</span>
              </div>
            </div>

            {/* Essential Details */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[#8A95A3] text-xs">Maximum Load</span>
                <span className="text-white font-semibold text-sm">{truck.capacity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A95A3] text-xs">Current Location</span>
                <span className="text-white font-semibold text-sm">{truck.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A95A3] text-xs">Price</span>
                <span className="text-[#E8830A] font-bold text-sm">{truck.pricePerKm}</span>
              </div>
            </div>

            {/* Action Button */}
            <button 
              className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-5 py-3 rounded-lg transition-all hover:-translate-y-0.5"
              disabled={truck.status !== 'Available'}
            >
              {truck.status === 'Available' ? 'Request Truck' : `${truck.status}`}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
