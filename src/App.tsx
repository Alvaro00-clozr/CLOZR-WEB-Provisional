import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import AttributionSection from './components/AttributionSection'
import SolutionSection from './components/SolutionSection'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="top" className="flex-1 pt-[60px]">
        <HeroSection />
        <AttributionSection />
        <SolutionSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
