import { useEffect, useRef } from 'react'

const steps = [
  {
    icon: '📦',
    num: 'Step 01',
    title: 'Post your shipment',
    desc: 'Describe your cargo, pickup point, destination, and preferred date. Takes under two minutes.',
  },
  {
    icon: '🚛',
    num: 'Step 02',
    title: 'Get matched instantly',
    desc: 'Verified transporters near your route receive your job and submit competitive quotes.',
  },
  {
    icon: '📍',
    num: 'Step 03',
    title: 'Track in real time',
    desc: 'Follow your cargo live from pickup to drop-off. Get notified at every milestone.',
  },
]

export default function HowItWorks() {
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
    <section id="how" ref={ref} className="px-6 md:px-16 py-24">
      <p className="text-[#E8830A] text-xs font-bold tracking-widest uppercase mb-4">The process</p>
      <h2 className="reveal font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
        From post to delivery<br />in three steps
      </h2>
      <p className="reveal text-[#8A95A3] text-base leading-relaxed max-w-md mb-14">
        No phone calls, no haggling. Just fast, transparent logistics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
        {steps.map((step) => (
          <div
            key={step.num}
            className="reveal bg-[#1C2128] hover:bg-[#2D3748] transition-colors px-9 py-10"
          >
            <div className="w-12 h-12 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-2xl mb-6">
              {step.icon}
            </div>
            <p className="text-[#E8830A] text-xs font-bold tracking-widest uppercase mb-2">{step.num}</p>
            <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
            <p className="text-[#8A95A3] text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}