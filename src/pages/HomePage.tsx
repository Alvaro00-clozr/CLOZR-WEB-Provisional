import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import StickyFeaturesSection from '../components/StickyFeaturesSection'
import PricingSection from '../components/PricingSection'
import RevenueAuditCtaSection from '../components/RevenueAuditCtaSection'
import ContactSection from '../components/ContactSection'
import GlobalMotionBackground from '../components/GlobalMotionBackground'
import ParticleBackground from '../components/ParticleBackground'
import enDictionary from '../i18n/en'
import usePageSeo from '../hooks/usePageSeo'

function HomePage() {
  usePageSeo({
    title: enDictionary.seo.title,
    description: enDictionary.seo.description,
    path: '/',
  })

  return (
    <div className="flex min-h-screen flex-col">
      <ParticleBackground />
      <Header />
      <main id="top" className="site-main-offset relative isolate flex-1">
        <GlobalMotionBackground />
        <HeroSection />
        <div className="relative">
          <StickyFeaturesSection />
          <PricingSection />
          <ContactSection />
          <RevenueAuditCtaSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
