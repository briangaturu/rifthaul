import { useEffect, useRef, useState } from 'react'

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section ref={ref} className="px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="reveal animate-slideUp">
              <h2 className="font-display text-3xl font-extrabold text-white mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#E8830A]/20 transition-colors">
                    📧
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-[#8A95A3] text-sm">support@rifthaul.co.ke</p>
                    <p className="text-[#8A95A3] text-sm">partnerships@rifthaul.co.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#E8830A]/20 transition-colors">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Phone</h3>
                    <p className="text-[#8A95A3] text-sm">+254 700 123 456</p>
                    <p className="text-[#8A95A3] text-sm">Available Mon-Fri, 8am-6pm EAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#E8830A]/10 border border-[#E8830A]/25 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#E8830A]/20 transition-colors">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Office</h3>
                    <p className="text-[#8A95A3] text-sm">Westlands, Nairobi</p>
                    <p className="text-[#8A95A3] text-sm">Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal pt-6 border-t border-white/[0.07]">
              <h3 className="font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-lg bg-[#1C2128] hover:bg-[#2D3748] border border-white/5 flex items-center justify-center text-[#8A95A3] hover:text-[#E8830A] transition-all hover:-translate-y-1"
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal animate-scaleIn">
            <form onSubmit={handleSubmit} className="bg-[#1C2128] border border-white/5 rounded-xl p-8 hover:border-[#E8830A]/20 transition-colors">
              <h3 className="font-display text-2xl font-bold text-white mb-6">Send us a message</h3>
              
              <div className="space-y-5">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 focus:ring-2 focus:ring-[#E8830A]/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 focus:ring-2 focus:ring-[#E8830A]/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="group">
                  <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E8830A]/50 focus:ring-2 focus:ring-[#E8830A]/20 transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#8A95A3] focus:outline-none focus:border-[#E8830A]/50 focus:ring-2 focus:ring-[#E8830A]/20 transition-all resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-bold text-sm px-7 py-3.5 rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E8830A]/30"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
