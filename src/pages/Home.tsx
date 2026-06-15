import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../content/home/Hero'
import HowItWorks from '../content/home/HowItWorks'
import TwoSides from '../content/home/TwoSides'
import CTASection from '../content/home/CTASection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <TwoSides />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}