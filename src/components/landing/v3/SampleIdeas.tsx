import IdeaCard from '@/components/ideas/IdeaCard'
import type { Idea } from '@/types'

interface SampleIdeasProps {
  ideas: Idea[]
  lockedIdeas: Idea[]
}

const delays = ['', 'd1', 'd2', '', 'd1']

export default function SampleIdeas({ ideas, lockedIdeas }: SampleIdeasProps) {
  const sample = ideas.slice(0, 5)
  const locked = lockedIdeas[0]

  return (
    <section className="section" id="samples">
      <div className="wrap">
        <div className="preview-intro rv">
          <span className="eyebrow">See the receipts</span>
          <h2 className="section-title">
            This is one idea.
            <br />
            All 1,200 go this deep.
          </h2>
          <p>
            <em>None of this is made up.</em> Every card traces back to a documented complaint — a
            Reddit thread, a forum post, an app review — and carries the research you&apos;d
            otherwise spend weeks doing yourself. Five of them, in full:
          </p>
        </div>

        <div className="idea-grid">
          {sample.map((idea, i) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              hasAccess={true}
              className={`rv${delays[i] ? ` ${delays[i]}` : ''}`}
            />
          ))}

          {locked && (
            <IdeaCard
              idea={locked}
              hasAccess={false}
              className="rv d2"
              lockedConfig={{
                href: '#pricing',
                title: '+1,195 more, fully unlocked',
                subtitle: 'The whole library for $29 — one time, forever.',
                cta: 'Unlock the library →',
              }}
            />
          )}
        </div>

        <div className="preview-bridge rv">
          <div className="preview-bridge-text">
            <h3>That&apos;s 5 of 1,200+.</h3>
            <p>
              Want to read complete ideas across every industry before you decide? No signup, no
              card.
            </p>
          </div>
          <div className="preview-bridge-actions">
            <a href="/ideas" className="btn btn--outline">
              Browse free samples →
            </a>
            <a href="#pricing" className="btn btn--primary">
              Unlock all 1,200+ — $29
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
