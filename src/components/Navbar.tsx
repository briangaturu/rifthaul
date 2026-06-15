import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4 bg-[#111418]/85 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="font-display text-2xl font-extrabold tracking-wide text-white">
        RIFT<span className="text-[#E8830A]">HAUL</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-[#8A95A3] hover:text-[#F5F0E8] text-sm font-medium transition-colors">
          Home
        </Link><Link to="/marketplace" className="text-[#8A95A3] hover:text-[#F5F0E8] text-sm font-medium transition-colors">
          Marketplace
        </Link>
        <Link to="/how-it-works" className="text-[#8A95A3] hover:text-[#F5F0E8] text-sm font-medium transition-colors">
          How it works
        </Link>
        <Link to="/about" className="text-[#8A95A3] hover:text-[#F5F0E8] text-sm font-medium transition-colors">
          About
        </Link>
        <Link to="/contact" className="text-[#8A95A3] hover:text-[#F5F0E8] text-sm font-medium transition-colors">
          Contact
        </Link>
        <Link to="/login" className="text-[#F5F0E8] hover:text-white text-sm font-medium transition-colors">
          Log in
        </Link>
        <Link
          to="/register"
          className="bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm px-5 py-2 rounded-md transition-colors"
        >
          Get started
        </Link>
      </div>

      {/* Mobile */}
      <Link
        to="/register"
        className="md:hidden bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm px-4 py-2 rounded-md transition-colors"
      >
        Get started
      </Link>
    </nav>
  )
}