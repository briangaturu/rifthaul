import { useEffect, useRef } from 'react'

export default function Mission() {
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
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="reveal">
            <div className="w-14 h-14 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-2xl mb-6">
              🎯
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white mb-4">Our Mission</h2>
            <p className="text-[#8A95A3] text-base leading-relaxed">
              To empower businesses of all sizes with reliable, transparent, and efficient cargo transport solutions. We eliminate the friction in logistics—no more endless phone calls, uncertain pricing, or lost shipments.
            </p>
          </div>

          <div className="reveal">
            <div className="w-14 h-14 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-2xl mb-6">
              👁️
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white mb-4">Our Vision</h2>
            <p className="text-[#8A95A3] text-base leading-relaxed">
              To become East Africa's most trusted logistics platform, where every shipment moves with confidence, every mile is tracked, and every stakeholder wins—shippers, transporters, and the economy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
