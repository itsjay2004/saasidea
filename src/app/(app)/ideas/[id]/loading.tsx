export default function IdeaLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-4 bg-surface-2 rounded w-20 mb-6" />
      <div className="h-3 bg-surface-2 rounded w-32 mb-4" />
      <div className="h-10 bg-surface-2 rounded w-3/4 mb-3" />
      <div className="h-6 bg-surface-2 rounded w-full mb-6" />
      <div className="flex gap-2 mb-8">
        <div className="h-6 w-16 bg-surface-2 rounded-full" />
        <div className="h-6 w-12 bg-surface-2 rounded-full" />
        <div className="h-6 w-20 bg-surface-2 rounded-full" />
      </div>
      <div className="h-24 bg-surface-2 rounded-lg mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-surface-2 rounded-card" />
        ))}
      </div>
      <div className="h-20 bg-surface-2 rounded-lg mb-8" />
      <div className="h-64 bg-surface-2 rounded-lg" />
    </div>
  )
}
