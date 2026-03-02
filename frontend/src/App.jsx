import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Vacancies } from './components/Vacancies'
import { Partners } from './components/Partners'
import { News } from './components/News'
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
        <About />
        <Services />
        <Vacancies />
        <Partners />
        <News />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
