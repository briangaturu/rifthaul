import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111418]/95 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-16 py-4">
        <Link to="/" className="font-display text-xl sm:text-2xl font-extrabold tracking-wide text-white flex-shrink-0">
          RIFT<span className="text-[#E8830A]">HAUL</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-[#8A95A3] hover:text-[#F5F0E8] text-sm font-medium transition-colors">
            Home
          </Link>
          <Link to="/marketplace" className="text-[#8A95A3] hover:text-[#F5F0E8] text-sm font-medium transition-colors">
            Marketplace
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4 px-4 sm:px-6 py-6 bg-[#0D1117]/95 border-t border-white/5">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)}
            className={`text-sm font-medium transition-colors py-2 ${
              isActive('/') ? 'text-[#E8830A]' : 'text-[#8A95A3] hover:text-[#F5F0E8]'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/marketplace" 
            onClick={() => setIsMenuOpen(false)}
            className={`text-sm font-medium transition-colors py-2 ${
              isActive('/marketplace') ? 'text-[#E8830A]' : 'text-[#8A95A3] hover:text-[#F5F0E8]'
            }`}
          >
            Marketplace
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsMenuOpen(false)}
            className={`text-sm font-medium transition-colors py-2 ${
              isActive('/about') ? 'text-[#E8830A]' : 'text-[#8A95A3] hover:text-[#F5F0E8]'
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsMenuOpen(false)}
            className={`text-sm font-medium transition-colors py-2 ${
              isActive('/contact') ? 'text-[#E8830A]' : 'text-[#8A95A3] hover:text-[#F5F0E8]'
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/login" 
            onClick={() => setIsMenuOpen(false)}
            className={`text-sm font-medium transition-colors py-2 ${
              isActive('/login') || isActive('/register') ? 'text-[#E8830A]' : 'text-[#F5F0E8] hover:text-white'
            }`}
          >
            Log in
          </Link>
          <Link
            to="/register"
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#E8830A] hover:bg-[#F5A030] text-[#111418] font-semibold text-sm px-5 py-3 rounded-md transition-colors text-center"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  )
}
