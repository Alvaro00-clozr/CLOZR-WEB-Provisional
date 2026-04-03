import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import AttributionSection from '../components/AttributionSection'
import SolutionSection from '../components/SolutionSection'
import SocialProofSection from '../components/SocialProofSection'
import PricingSection from '../components/PricingSection'
import RevenueAuditCtaSection from '../components/RevenueAuditCtaSection'
import ContactSection from '../components/ContactSection'
import GlobalMotionBackground from '../components/GlobalMotionBackground'
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
      <Header />
      <main id="top" className="site-main-offset relative isolate flex-1 overflow-hidden">
        <GlobalMotionBackground />
        <HeroSection />
        <div className="relative">
          <AttributionSection />
          <SolutionSection />
          <SocialProofSection />
          <PricingSection />
          <RevenueAuditCtaSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
