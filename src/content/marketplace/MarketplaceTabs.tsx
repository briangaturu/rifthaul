import { useState } from 'react'
import ShipmentList from './ShipmentList'
import TruckList from './TruckList'

type TabType = 'shipments' | 'trucks'

export default function MarketplaceTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('shipments')

  return (
    <section className="px-4 sm:px-6 md:px-16 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Tab Buttons - Centered and Smaller */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex gap-2 sm:gap-3 bg-[#1C2128] p-1.5 sm:p-2 rounded-xl border border-white/5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('shipments')}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'shipments'
                  ? 'bg-[#E8830A] text-[#111418] shadow-lg shadow-[#E8830A]/20'
                  : 'text-[#8A95A3] hover:text-white hover:bg-[#2D3748]'
              }`}
            >
              <span className="inline-block mr-1 sm:mr-2">📦</span>
              Shipments
            </button>
            <button
              onClick={() => setActiveTab('trucks')}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 ${
                activeTab === 'trucks'
                  ? 'bg-[#E8830A] text-[#111418] shadow-lg shadow-[#E8830A]/20'
                  : 'text-[#8A95A3] hover:text-white hover:bg-[#2D3748]'
              }`}
            >
              <span className="inline-block mr-1 sm:mr-2">🚛</span>
              Trucks
            </button>
          </div>
        </div>

        {/* Content with Fade Animation */}
        <div className="animate-fadeIn">
          {activeTab === 'shipments' ? <ShipmentList /> : <TruckList />}
        </div>
      </div>
    </section>
  )
}
