'use client'

import { useState, useRef, useEffect } from 'react'
import { faqItems } from '@/lib/faq-data'

type Item = { q: string; a: string }

function FaqRow({ item, open, onToggle }: { item: Item; open: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (open && ref.current) {
      setHeight(ref.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [open])

  return (
    <div className="faq-item">
      <button type="button" className={`faq-question${open ? ' active' : ''}`} onClick={onToggle}>
        <span className="faq-question-text">{item.q}</span>
        <span className="faq-icon">+</span>
      </button>
      <div
        className="faq-answer"
        style={{ maxHeight: height }}
      >
        <div
          className="faq-answer-inner"
          ref={ref}
          dangerouslySetInnerHTML={{ __html: item.a }}
        />
      </div>
    </div>
  )
}


export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section" id="faq">
      <div className="wrap--sm">
        <div className="section-head rv">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title">
            Answered
            <br />
            <em>straight.</em>
          </h2>
        </div>

        <div className="faq-list rv">
          {faqItems.map((item, i) => (
            <FaqRow
              key={i}
              item={item}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

