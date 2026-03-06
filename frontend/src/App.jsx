import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { ProblemSolution } from './components/ProblemSolution'
import { Specialties } from './components/Specialties'
import { Vacancies } from './components/Vacancies'
import { Partners } from './components/Partners'
import { Calculator } from './components/Calculator'
import { CalculatorButton } from './components/CalculatorButton'
import { OurPartners } from './components/OurPartners'
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
        <ProblemSolution />
        <Specialties />
        <Vacancies />
        <Partners />
        <Calculator />
        <OurPartners />
        <WhyUs />
        <News />
        <CTA />
      </main>
      <Footer />
      <CalculatorButton />
      <ScrollToTop />
    </>
  )
}

export default App
