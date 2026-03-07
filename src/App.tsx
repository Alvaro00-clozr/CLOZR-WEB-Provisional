import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--gradient-bg-primary)]">
      <Header />
      <main className="flex-1 pt-20 md:pt-24" />
      <Footer />
    </div>
  )
}

export default App
