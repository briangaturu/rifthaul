import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function CTASection() {
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
      { threshold: 0.2 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-16 py-28 text-center bg-gradient-to-b from-[#111418] to-[#0D1117] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#E8830A] opacity-[0.07] blur-3xl pointer-events-none" />
      <h2 className="reveal relative font-display text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
        Kenya's cargo moves.<br />Make sure yours does too.
      </h2>
      <p className="reveal relative text-[#8A95A3] text-base mb-10">
        Join thousands of businesses and transporters already on Rift Haul.
      </p>
      <Link
        to="/register"
        className="reveal relative inline-flex items-center gap-2 bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-base px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5"
      >
        Get started — it's free
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Link>
    </section>
  )
}