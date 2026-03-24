import IdeaCard from './IdeaCard'
import type { Idea } from '@/types'

interface IdeaGridProps {
  ideas: Idea[]
  hasAccess: boolean
}

export default function IdeaGrid({ ideas, hasAccess }: IdeaGridProps) {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-muted text-lg mb-2">No ideas found</p>
        <p className="text-text-subtle text-sm">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} hasAccess={hasAccess} />
      ))}
    </div>
  )
}
