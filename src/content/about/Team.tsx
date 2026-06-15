import { useEffect, useRef } from 'react'

const stats = [
  { num: '15+', label: 'Team members' },
  { num: '3', label: 'Years experience' },
  { num: '5,000+', label: 'Deliveries completed' },
]

export default function Team() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
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
    <section ref={ref} className="px-6 md:px-16 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="reveal font-display text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Built by logistics <span className="text-[#E8830A]">experts</span>
        </h2>
        <p className="reveal text-[#8A95A3] text-base leading-relaxed max-w-2xl mx-auto mb-12">
          Our team combines decades of logistics, technology, and customer service experience to create a platform that works for everyone.
        </p>

        <div className="reveal flex flex-wrap justify-center gap-12 pt-10 border-t border-white/[0.07]">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-5xl font-extrabold text-white leading-none mb-2">{s.num}</div>
              <div className="text-[#8A95A3] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
