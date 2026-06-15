import { useEffect, useRef } from 'react'

const values = [
  {
    icon: '🛡️',
    title: 'Trust & Safety',
    desc: 'Every transporter is verified. Every payment is secure. Every shipment is insured.',
  },
  {
    icon: '⚡',
    title: 'Speed & Efficiency',
    desc: 'Real-time matching, instant quotes, and live tracking keep cargo moving without delays.',
  },
  {
    icon: '🤝',
    title: 'Fair & Transparent',
    desc: 'No hidden fees. No surprise charges. Just honest pricing and clear communication.',
  },
  {
    icon: '🌍',
    title: 'Community First',
    desc: 'We support local transporters and help small businesses compete on equal footing.',
  },
]

export default function Values() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="px-6 md:px-16 py-24 bg-[#0D1117]">
      <div className="max-w-6xl mx-auto">
        <p className="reveal text-[#E8830A] text-xs font-bold tracking-widest uppercase mb-4 text-center">
          What we stand for
        </p>
        <h2 className="reveal font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-16 text-center">
          Our Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="reveal bg-[#1C2128] hover:bg-[#2D3748] transition-colors border border-white/5 rounded-xl px-8 py-8"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-2xl mb-5">
                {value.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-[#8A95A3] text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
