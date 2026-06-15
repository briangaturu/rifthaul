import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0D1117] border-t border-white/5 px-6 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="font-display text-xl font-extrabold tracking-wide text-white">
        RIFT<span className="text-[#E8830A]">HAUL</span>
      </Link>
      <div className="flex gap-6 text-[#8A95A3] text-xs">
        <Link to="/how-it-works" className="hover:text-[#F5F0E8] transition-colors">How it works</Link>
        <Link to="/marketplace" className="hover:text-[#F5F0E8] transition-colors">Marketplace</Link>
        <Link to="/about" className="hover:text-[#F5F0E8] transition-colors">About</Link>
        <Link to="/contact" className="hover:text-[#F5F0E8] transition-colors">Contact</Link>
      </div>
      <p className="text-[#8A95A3] text-xs">© 2026 Rift Haul. Built for Kenya's roads.</p>
    </footer>
  )
}