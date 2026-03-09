import Header from './components/Header'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
