import { useEffect } from 'react'

type UsePageSeoOptions = {
  title: string
  description: string
  path?: string
}

function usePageSeo({ title, description, path }: UsePageSeoOptions) {
  useEffect(() => {
    document.title = title

    const origin = window.location.origin
    const resolvedPath = path ?? window.location.pathname
    const canonicalUrl = new URL(resolvedPath, origin).toString()

    const descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description)
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl)
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title)
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description)
    }
  }, [description, path, title])
}

export default usePageSeo
