import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

type Role = 'business' | 'transporter' | null

export default function Register() {
  const [searchParams] = useSearchParams()
  const initialRole = (searchParams.get('role') as Role) ?? null

  const [role, setRole] = useState<Role>(initialRole)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to backend auth
    console.log({ role, name, email, password })
  }

  return (
    <div className="min-h-screen bg-[#111418] flex items-center justify-center px-4 py-16">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#E8830A] opacity-[0.05] blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="block text-center font-display text-2xl font-extrabold tracking-wide text-white mb-8">
          RIFT<span className="text-[#E8830A]">HAUL</span>
        </Link>

        <div className="bg-[#1C2128] border border-white/8 rounded-2xl p-8">
          <h1 className="font-display text-3xl font-extrabold text-white mb-1">Create your account</h1>
          <p className="text-[#8A95A3] text-sm mb-8">Join Rift Haul — Kenya's cargo network</p>

          {/* Role selector */}
          <p className="text-[#F5F0E8] text-sm font-medium mb-3">I am a...</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setRole('business')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-semibold transition-all ${
                role === 'business'
                  ? 'border-[#E8830A] bg-[#E8830A]/10 text-[#E8830A]'
                  : 'border-white/10 text-[#8A95A3] hover:border-white/25'
              }`}
            >
              <span className="text-2xl">🏢</span>
              Business
            </button>
            <button
              onClick={() => setRole('transporter')}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-semibold transition-all ${
                role === 'transporter'
                  ? 'border-[#E8830A] bg-[#E8830A]/10 text-[#E8830A]'
                  : 'border-white/10 text-[#8A95A3] hover:border-white/25'
              }`}
            >
              <span className="text-2xl">🚛</span>
              Transporter
            </button>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#F5F0E8] text-sm font-medium mb-2">
                {role === 'business' ? 'Business name' : role === 'transporter' ? 'Full name' : 'Full name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'business' ? 'Acme Supplies Ltd.' : 'John Kamau'}
                className="w-full bg-[#111418] border border-white/10 text-[#F5F0E8] placeholder-[#8A95A3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E8830A]/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#F5F0E8] text-sm font-medium mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-[#111418] border border-white/10 text-[#F5F0E8] placeholder-[#8A95A3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E8830A]/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#F5F0E8] text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-[#111418] border border-white/10 text-[#F5F0E8] placeholder-[#8A95A3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E8830A]/60 transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!role}
              className="w-full bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-40 disabled:cursor-not-allowed text-[#111418] font-bold text-sm py-3 rounded-lg transition-all hover:not-disabled:-translate-y-0.5 mt-1"
            >
              Create account
            </button>
          </div>

          <p className="text-center text-[#8A95A3] text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#E8830A] hover:text-[#F5A030] font-medium transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}