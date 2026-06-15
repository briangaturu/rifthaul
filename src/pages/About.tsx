import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHero from '../content/about/AboutHero'
import Mission from '../content/about/Mission'
import Values from '../content/about/Values'
import Team from '../content/about/Team'

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <Mission />
        <Values />
        <Team />
      </main>
      <Footer />
    </>
  )
}
