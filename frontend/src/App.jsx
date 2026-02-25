import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { HowItWorks } from './components/HowItWorks'
import { WhyUs } from './components/WhyUs'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
