import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const businessFeatures = [
  'Post shipments with route & cargo details',
  'Compare transporter quotes side by side',
  'Real-time GPS tracking on all deliveries',
  'Digital proof of delivery',
  'Full shipment history & invoices',
]

const transporterFeatures = [
  'Browse jobs matching your route & truck type',
  'Set your own rates and availability',
  'Instant payment on delivery confirmation',
  'Build your reputation with ratings',
  'Manage your entire fleet in one place',
]

function FeatureList({ items, accent }: { items: string[]; accent: 'blue' | 'amber' }) {
  return (
    <ul className="mb-9 space-y-0">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-[#F5F0E8] text-sm py-2.5 border-b border-white/5 last:border-none">
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${accent === 'blue' ? 'bg-blue-500/15 text-blue-300' : 'bg-[#E8830A]/15 text-[#E8830A]'}`}>
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function TwoSides() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 120)
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
    <section id="sides" ref={ref} className="px-6 md:px-16 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Business */}
        <div className="reveal relative rounded-2xl p-12 overflow-hidden border border-white/8 bg-gradient-to-br from-[#1a2235] to-[#1C2128]">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-500 opacity-[0.06] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <span className="inline-block bg-blue-500/15 text-blue-300 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            For businesses
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white mb-3">
            Ship smarter,<br />not harder.
          </h2>
          <p className="text-[#8A95A3] text-sm leading-relaxed mb-8">
            Whether you're moving goods weekly or managing multiple routes, Rift Haul gives you full control of your supply chain.
          </p>
          <FeatureList items={businessFeatures} accent="blue" />
          <Link
            to="/register?role=business"
            className="inline-flex items-center gap-2 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Start shipping free
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

        {/* Transporter */}
        <div className="reveal relative rounded-2xl p-12 overflow-hidden border border-[#E8830A]/20 bg-gradient-to-br from-[#1f1608] to-[#1C1810]">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#E8830A] opacity-[0.07] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <span className="inline-block bg-[#E8830A]/15 text-[#E8830A] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            For transporters
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white mb-3">
            Find loads.<br />Fill your trucks.
          </h2>
          <p className="text-[#8A95A3] text-sm leading-relaxed mb-8">
            Stop chasing business through middlemen. Rift Haul brings consistent cargo jobs directly to verified drivers and fleet owners.
          </p>
          <FeatureList items={transporterFeatures} accent="amber" />
          <Link
            to="/register?role=transporter"
            className="inline-flex items-center gap-2 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Register your truck
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

      </div>
    </section>
  )
}