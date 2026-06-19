import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Marketplace from './pages/Marketplace'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import BusinessDashboard from './pages/dashboards/BusinessDashboard'
import TransporterDashboard from './pages/dashboards/TransporterDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard/business" element={<BusinessDashboard />} />
      <Route path="/dashboard/transporter" element={<TransporterDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
    </Routes>
  )
}