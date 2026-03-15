import enDictionary from '../i18n/en'
import LegalPage from './LegalPage'

function PrivacyPage() {
  const copy = enDictionary.legalPages.privacy

  return (
    <LegalPage
      title={copy.title}
      seoTitle={copy.seoTitle}
      seoDescription={copy.seoDescription}
      seoPath="/privacy"
      eyebrow={copy.eyebrow}
      intro={copy.intro}
      lastUpdatedLabel={copy.lastUpdatedLabel}
      lastUpdatedValue={copy.lastUpdatedValue}
      sections={copy.sections}
    />
  )
}

export default PrivacyPage
