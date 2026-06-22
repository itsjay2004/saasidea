'use client'

import { useLayoutEffect } from 'react'

/**
 * Mirrors redesign-refrence/saasidea-v3.js — reveals `.rv` elements on scroll.
 *
 * Content is visible by default; this component adds `rv-ready` to the `.v3`
 * wrapper (which is what actually arms the `opacity:0` hidden state in CSS) and
 * then reveals each `.rv` as it scrolls into view. If this never runs, the page
 * simply shows everything immediately — no section is ever left blank.
 */
export default function Reveal() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.v3')
    if (!root) return

    const els = Array.from(root.querySelectorAll<HTMLElement>('.rv'))
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !('IntersectionObserver' in window)) {
      // No animation — just show everything immediately.
      els.forEach((el) => el.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        }),
      { threshold: 0.07, rootMargin: '0px 0px -60px 0px' }
    )

    // Arm the hidden state, then wait two frames so the browser paints
    // opacity:0 before the observer fires. Without this, elements already
    // in the viewport get .in in the same frame as rv-ready and the
    // transition never runs (everything appears visible instantly).
    root.classList.add('rv-ready')
    let raf1: number, raf2: number
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        els.forEach((el) => observer.observe(el))
      })
    })

    // Safety net: anything still hidden 1.5s after load gets revealed.
    const fallback = window.setTimeout(() => {
      els.forEach((el) => {
        if (!el.classList.contains('in')) el.classList.add('in')
      })
    }, 1500)

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return null
}
