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
import PostShipment from './pages/dashboards/PostShipment'
import ManageShipments from './pages/dashboards/ManageShipments'
import ManageTrucks from './pages/dashboards/ManageTrucks'
import ManageUsers from './pages/dashboards/ManageUsers'
import BusinessShipments from './pages/dashboards/BusinessShipments'
import MyTrucks from './pages/dashboards/MyTrucks'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Business Dashboard Routes */}
      <Route path="/dashboard/business" element={<BusinessDashboard />} />
      <Route path="/dashboard/business/new-shipment" element={<PostShipment />} />
      <Route path="/dashboard/business/shipments" element={<BusinessShipments />} />

      {/* Transporter Dashboard Routes */}
      <Route path="/dashboard/transporter" element={<TransporterDashboard />} />
      <Route path="/dashboard/transporter/trucks" element={<MyTrucks />} />

      {/* Admin Dashboard Routes */}
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/admin/shipments" element={<ManageShipments />} />
      <Route path="/dashboard/admin/trucks" element={<ManageTrucks />} />
      <Route path="/dashboard/admin/users" element={<ManageUsers />} />
    </Routes>
  )
}