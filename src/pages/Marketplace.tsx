import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MarketplaceHero from '../content/marketplace/MarketplaceHero'
import MarketplaceTabs from '../content/marketplace/MarketplaceTabs'

export default function Marketplace() {
  return (
    <>
      <Navbar />
      <main>
        <MarketplaceHero />
        <MarketplaceTabs />
      </main>
      <Footer />
    </>
  )
}
