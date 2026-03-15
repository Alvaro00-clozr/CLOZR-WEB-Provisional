import enDictionary from '../i18n/en'
import LegalPage from './LegalPage'

function TermsPage() {
  const copy = enDictionary.legalPages.terms

  return (
    <LegalPage
      title={copy.title}
      seoTitle={copy.seoTitle}
      seoDescription={copy.seoDescription}
      seoPath="/terms"
      eyebrow={copy.eyebrow}
      intro={copy.intro}
      lastUpdatedLabel={copy.lastUpdatedLabel}
      lastUpdatedValue={copy.lastUpdatedValue}
      sections={copy.sections}
    />
  )
}

export default TermsPage
