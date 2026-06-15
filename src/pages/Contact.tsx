import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactHero from '../content/contact/ContactHero'
import ContactForm from '../content/contact/ContactForm'

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
