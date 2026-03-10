import { useCallback, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealOptions = {
  itemsSelector: string
  animateRoot?: boolean
  mediaSelector?: string
  start?: string
  once?: boolean
  toggleActions?: string
  useScrollTrigger?: boolean
  xItems?: number
  yItems?: number
  xMedia?: number
  durationItems?: number
  durationMedia?: number
  stagger?: number
  overlap?: string
  gridColumns?: number
  afterSelector?: string
  afterY?: number
  afterDuration?: number
  afterStart?: string
  afterOnce?: boolean
  doneClass?: string
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') {
    return true
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useGsapReveal<T extends HTMLElement>(options: RevealOptions) {
  const [rootEl, setRootEl] = useState<T | null>(null)
  const rootRef = useCallback((node: T | null) => {
    setRootEl(node)
  }, [])

  useLayoutEffect(() => {
    const sectionRoot = rootEl
    if (!sectionRoot || prefersReducedMotion()) {
      return
    }

    const {
      itemsSelector,
      animateRoot = false,
      mediaSelector,
      start = 'top 75%',
      once = true,
      toggleActions = once ? 'play none none none' : 'restart none restart reset',
      useScrollTrigger = true,
      xItems = 0,
      yItems = 24,
      xMedia = 16,
      durationItems = 0.45,
      durationMedia = 0.55,
      stagger = 0.11,
      overlap = '-=0.30',
      gridColumns,
      afterSelector,
      afterY = 16,
      afterDuration = 0.35,
      afterStart = 'top 92%',
      afterOnce = true,
      doneClass,
    } = options

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRoot)
      const selectedItems = q<HTMLElement>(itemsSelector)
      const items = animateRoot ? [sectionRoot, ...selectedItems] : selectedItems
      const media = mediaSelector
        ? sectionRoot.querySelector<HTMLElement>(mediaSelector)
        : null
      const afterEl = afterSelector ? q<HTMLElement>(afterSelector)[0] : null

      if (items.length === 0 && !media && !afterEl) {
        return
      }

      const hasX = typeof xItems === 'number' && xItems !== 0
      const hasY = typeof yItems === 'number' && yItems !== 0

      gsap.set(items, {
        autoAlpha: 0,
        ...(hasX ? { x: xItems } : {}),
        ...(hasY ? { y: yItems } : {}),
        willChange: 'transform,opacity',
        force3D: true,
      })

      if (media) {
        gsap.set(media, {
          autoAlpha: 0,
          x: xMedia,
          willChange: 'transform,opacity',
          force3D: true,
        })
      }

      const tl = gsap.timeline({
        ...(useScrollTrigger
          ? {
              scrollTrigger: {
                trigger: sectionRoot,
                start,
                once,
                toggleActions,
                invalidateOnRefresh: true,
              },
            }
          : {}),
        defaults: { ease: 'power2.out' },
      })

      const columns = gridColumns ?? 0

      if (!columns || columns <= 1) {
        tl.to(items, {
          autoAlpha: 1,
          ...(hasX ? { x: 0 } : {}),
          ...(hasY ? { y: 0 } : {}),
          duration: durationItems,
          stagger,
          onComplete: () => {
            if (doneClass) {
              sectionRoot.classList.add(doneClass)
            }

            for (const item of items) {
              item.style.willChange = ''
              item.style.transform = ''
              item.style.opacity = ''
            }
          },
        })
      } else {
        for (let i = 0; i < items.length; i += columns) {
          const row = items.slice(i, i + columns)
          tl.to(
            row,
            {
              autoAlpha: 1,
              ...(hasX ? { x: 0 } : {}),
              ...(hasY ? { y: 0 } : {}),
              duration: durationItems,
              stagger: 0.06,
              onComplete: () => {
                for (const item of row) {
                  item.style.willChange = ''
                  item.style.transform = ''
                  item.style.opacity = ''
                }
              },
            },
            i === 0 ? undefined : '+=0.04',
          )
        }
      }

      if (media) {
        tl.to(
          media,
          {
            autoAlpha: 1,
            x: 0,
            duration: durationMedia,
            onComplete: () => {
              media.style.willChange = ''
              media.style.transform = ''
              media.style.opacity = ''
            },
          },
          overlap,
        )
      }

      if (afterEl) {
        gsap.set(afterEl, {
          autoAlpha: 0,
          y: afterY,
          willChange: 'transform,opacity',
          force3D: true,
        })

        const afterAnim: gsap.TweenVars = {
          autoAlpha: 1,
          y: 0,
          duration: afterDuration,
          ease: 'power2.out',
          onComplete: () => {
            afterEl.style.willChange = ''
            afterEl.style.transform = ''
            afterEl.style.opacity = ''
          },
        }

        if (useScrollTrigger) {
          afterAnim.scrollTrigger = {
            trigger: afterEl,
            start: afterStart,
            once: afterOnce,
          }
        }

        gsap.to(afterEl, afterAnim)
      }
    }, sectionRoot)

    return () => {
      ctx.revert()
    }
  }, [options, rootEl])

  return { rootRef }
}
