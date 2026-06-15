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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111418] to-[#0D1117]" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(232,131,10,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 60% 40%, black 0%, transparent 75%)',
        }}
      />

      {/* Animated route map — desktop only */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center z-10">
        <svg viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g opacity="0.15">
            {([[100,100],[200,80],[300,120],[400,90],[150,200],[350,180],[80,300],[420,280],[250,350],[180,450],[320,420]] as [number,number][]).map(([cx,cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2" fill="#E8830A" />
            ))}
          </g>
          <path
            id="routePath"
            d="M 120 150 C 160 180, 200 140, 250 200 C 300 260, 280 320, 340 360 C 380 390, 400 440, 380 500"
            stroke="#E8830A" strokeWidth="2.5" fill="none" strokeDasharray="8 5" opacity="0.5"
          />
          <circle r="8" fill="#E8830A" opacity="0.9">
            <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#routePath" />
            </animateMotion>
          </circle>
          <circle r="14" fill="#E8830A" opacity="0.2">
            <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#routePath" />
            </animateMotion>
          </circle>
          {/* Nairobi */}
          <circle cx="120" cy="150" r="10" fill="#E8830A" opacity="0.9" />
          <circle cx="120" cy="150" r="20" fill="#E8830A" opacity="0.1">
            <animate attributeName="r" values="12;24;12" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x="140" y="155" fill="#F5F0E8" fontFamily="Inter" fontSize="13" fontWeight="600">Nairobi</text>
          {/* Eldoret */}
          <circle cx="250" cy="200" r="7" fill="#8A95A3" opacity="0.7" />
          <text x="265" y="205" fill="#8A95A3" fontFamily="Inter" fontSize="11">Eldoret</text>
          {/* Kisumu */}
          <circle cx="340" cy="360" r="7" fill="#8A95A3" opacity="0.7" />
          <text x="355" y="365" fill="#8A95A3" fontFamily="Inter" fontSize="11">Kisumu</text>
          {/* Mombasa */}
          <circle cx="380" cy="500" r="10" fill="#E8830A" opacity="0.9" />
          <circle cx="380" cy="500" r="20" fill="#E8830A" opacity="0.1">
            <animate attributeName="r" values="12;24;12" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x="396" y="505" fill="#F5F0E8" fontFamily="Inter" fontSize="13" fontWeight="600">Mombasa</text>
          {/* Status card */}
          <g transform="translate(30, 380)">
            <rect width="160" height="72" rx="10" fill="#1C2128" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="22" cy="22" r="6" fill="#22C55E" />
            <circle cx="22" cy="22" r="10" fill="#22C55E" opacity="0.2">
              <animate attributeName="r" values="7;13;7" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="38" y="27" fill="#F5F0E8" fontFamily="Inter" fontSize="11" fontWeight="600">In transit</text>
            <text x="14" y="50" fill="#8A95A3" fontFamily="Inter" fontSize="10">Cargo: 12 tonnes</text>
            <text x="14" y="64" fill="#8A95A3" fontFamily="Inter" fontSize="10">ETA: 6 hrs</text>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-xl">
        <div className="inline-flex items-center gap-2 bg-[#E8830A]/10 border border-[#E8830A]/30 text-[#E8830A] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8830A] animate-pulse" />
          Live across Kenya
        </div>

        <h1 className="font-display text-6xl md:text-7xl font-extrabold leading-none tracking-tight text-white mb-6">
          Move cargo.<br />
          Track every <span className="text-[#E8830A]">mile.</span>
        </h1>

        <p className="text-[#8A95A3] text-lg leading-relaxed max-w-md mb-11">
          Rift Haul connects businesses with verified truck transporters across Kenya. Post a shipment, get matched instantly, and track delivery in real time.
        </p>

        <div className="flex flex-wrap gap-4">
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
        <div ref={statsRef} className="reveal flex flex-wrap gap-0 mt-14 pt-10 border-t border-white/[0.07]">
          {stats.map((s, i) => (
            <div key={i} className={`pr-10 ${i < stats.length - 1 ? 'mr-10 border-r border-white/[0.07]' : ''}`}>
              <div className="font-display text-4xl font-extrabold text-white leading-none">{s.num}</div>
              <div className="text-[#8A95A3] text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}