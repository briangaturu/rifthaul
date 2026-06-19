import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRegisterUserMutation } from '../features/api/authApi'

type Role = 'business' | 'transporter' | null

export default function Register() {
  const [searchParams] = useSearchParams()
  const initialRole = (searchParams.get('role') as Role) ?? null

  const [role, setRole] = useState<Role>(initialRole)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!role) {
      setError('Please select whether you are a business or transporter')
      return
    }

    const payload =
      role === 'business'
        ? { companyName: name, email, password, userType: role }
        : { fullName: name, email, password, userType: role }

    try {
      await registerUser(payload).unwrap()
      // Redirect to login after successful registration
      navigate('/login')
    } catch (err: any) {
      setError(err?.data?.error?.[0]?.message || err?.data?.error || 'Registration failed. Please try again.')
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#111418] flex items-center justify-center px-4 pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#E8830A] opacity-[0.05] blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md py-16">
          <form onSubmit={handleSubmit} className="bg-[#1C2128] border border-white/8 rounded-2xl p-8">
            <h1 className="font-display text-3xl font-extrabold text-white mb-1">Create your account</h1>
            <p className="text-[#8A95A3] text-sm mb-8">Join Rift Haul — Kenya's cargo network</p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
                {error}
              </div>
            )}

            {/* Role selector */}
            <p className="text-[#F5F0E8] text-sm font-medium mb-3">I am a...</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
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
                type="button"
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
                  {role === 'business' ? 'Business name' : 'Full name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'business' ? 'Acme Supplies Ltd.' : 'John Kamau'}
                  required
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
                  required
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
                  required
                  minLength={8}
                  className="w-full bg-[#111418] border border-white/10 text-[#F5F0E8] placeholder-[#8A95A3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E8830A]/60 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!role || isLoading}
                className="w-full bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-40 disabled:cursor-not-allowed text-[#111418] font-bold text-sm py-3 rounded-lg transition-all hover:not-disabled:-translate-y-0.5 mt-1"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <p className="text-center text-[#8A95A3] text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#E8830A] hover:text-[#F5A030] font-medium transition-colors">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}