import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const stats = [
  { num: '2,400+', label: 'Verified trucks' },
  { num: '47+', label: 'Counties covered' },
  { num: '98%', label: 'On-time delivery' },
]

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.2 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-28 pb-20 overflow-hidden">

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111418] to-[#0D1117]" />

      {/* Route map — full bleed background behind everything */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <svg
          viewBox="0 0 500 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-3xl opacity-[0.07]"
        >
          <g>
            {([[100,100],[200,80],[300,120],[400,90],[150,200],[350,180],[80,300],[420,280],[250,350],[180,450],[320,420]] as [number,number][]).map(([cx,cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="#E8830A" />
            ))}
          </g>
          <path
            id="routePath"
            d="M 120 150 C 160 180, 200 140, 250 200 C 300 260, 280 320, 340 360 C 380 390, 400 440, 380 500"
            stroke="#E8830A" strokeWidth="3" fill="none" strokeDasharray="8 5"
          />
          <circle r="10" fill="#E8830A">
            <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#routePath" />
            </animateMotion>
          </circle>
          <circle cx="120" cy="150" r="12" fill="#E8830A" />
          <circle cx="250" cy="200" r="8" fill="#8A95A3" />
          <circle cx="340" cy="360" r="8" fill="#8A95A3" />
          <circle cx="380" cy="500" r="12" fill="#E8830A" />
        </svg>
      </div>

      {/* Amber radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,131,10,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Foreground content — centered */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[#E8830A]/10 border border-[#E8830A]/30 text-[#E8830A] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8830A] animate-pulse" />
          Live across Kenya
        </div>

        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight text-white mb-6">
          Move cargo.<br />
          Track every <span className="text-[#E8830A]">mile.</span>
        </h1>

        <p className="text-[#8A95A3] text-lg leading-relaxed max-w-lg mx-auto mb-10">
          Rift Haul connects businesses with verified truck transporters across Kenya. Post a shipment, get matched instantly, and track delivery in real time.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Post a shipment
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
          <Link
            to="/register?role=transporter"
            className="inline-flex items-center gap-2 border border-white/15 hover:border-white/40 text-[#F5F0E8] font-semibold text-sm px-7 py-3.5 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Register your truck
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="reveal flex flex-wrap justify-center gap-0 pt-10 border-t border-white/[0.07] w-full">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`px-10 ${i < stats.length - 1 ? 'border-r border-white/[0.07]' : ''}`}
            >
              <div className="font-display text-4xl font-extrabold text-white leading-none">{s.num}</div>
              <div className="text-[#8A95A3] text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}