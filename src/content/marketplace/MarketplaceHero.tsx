import { useEffect, useRef } from 'react'

export default function MarketplaceHero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center px-6 md:px-16 pt-32 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111418] to-[#0D1117]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(232,131,10,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 75%)',
        }}
      />

      {/* Content */}
      <div ref={ref} className="reveal relative z-20 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#E8830A]/10 border border-[#E8830A]/30 text-[#E8830A] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8830A] animate-pulse" />
          Available Shipments
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-none tracking-tight text-white mb-6">
          Find your next <span className="text-[#E8830A]">haul</span>
        </h1>

        <p className="text-[#8A95A3] text-lg leading-relaxed max-w-2xl mx-auto">
          Browse active shipments across Kenya. Submit competitive quotes and grow your transport business.
        </p>
      </div>
    </section>
  )
}
