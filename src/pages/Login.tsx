import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../features/api/authApi'
import { useAppDispatch } from '../features/hooks'
import { setCredentials } from '../features/auth/authSlice'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const result = await loginUser({ email, password }).unwrap()
      dispatch(setCredentials({
        token: result.token,
        userId: result.userId,
        email: result.email,
        userType: result.userType,
      }))
      
      // Redirect to appropriate dashboard based on user type
      if (result.userType === 'admin') {
        navigate('/dashboard/admin')
      } else if (result.userType === 'transporter') {
        navigate('/dashboard/transporter')
      } else {
        navigate('/dashboard/business')
      }
    } catch (err: any) {
      setError(err?.data?.error || 'Login failed. Check your credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-[#111418] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#E8830A] opacity-[0.05] blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="block text-center font-display text-2xl font-extrabold tracking-wide text-white mb-8">
          RIFT<span className="text-[#E8830A]">HAUL</span>
        </Link>

        <form onSubmit={handleSubmit} className="bg-[#1C2128] border border-white/8 rounded-2xl p-8">
          <h1 className="font-display text-3xl font-extrabold text-white mb-1">Welcome back</h1>
          <p className="text-[#8A95A3] text-sm mb-8">Log in to your Rift Haul account</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <div className="space-y-5">
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
              <div className="flex items-center justify-between mb-2">
                <label className="text-[#F5F0E8] text-sm font-medium">Password</label>
                <a href="#" className="text-[#E8830A] text-xs hover:text-[#F5A030] transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#111418] border border-white/10 text-[#F5F0E8] placeholder-[#8A95A3] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#E8830A]/60 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E8830A] hover:bg-[#F5A030] disabled:opacity-50 disabled:cursor-not-allowed text-[#111418] font-bold text-sm py-3 rounded-lg transition-all hover:not-disabled:-translate-y-0.5 mt-2"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </div>

          <p className="text-center text-[#8A95A3] text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#E8830A] hover:text-[#F5A030] font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}