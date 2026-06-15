import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0D1117] border-t border-white/5 px-4 sm:px-6 md:px-16 py-8 md:py-10">
      <div className="flex flex-col items-center gap-6 md:gap-4">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-extrabold tracking-wide text-white">
          RIFT<span className="text-[#E8830A]">HAUL</span>
        </Link>
        
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[#8A95A3] text-xs">
          <Link to="/" className="hover:text-[#F5F0E8] transition-colors">Home</Link>
          <Link to="/marketplace" className="hover:text-[#F5F0E8] transition-colors">Marketplace</Link>
          <Link to="/about" className="hover:text-[#F5F0E8] transition-colors">About</Link>
          <Link to="/contact" className="hover:text-[#F5F0E8] transition-colors">Contact</Link>
        </div>
        
        {/* Copyright */}
        <p className="text-[#8A95A3] text-xs text-center">© 2026 Rift Haul. Built for Kenya's roads.</p>
      </div>
    </footer>
  )
}