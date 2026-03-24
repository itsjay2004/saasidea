export default function IdeasLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="h-8 bg-surface-2 rounded w-64 mb-2 animate-pulse" />
        <div className="h-5 bg-surface-2 rounded w-48 animate-pulse" />
      </div>
      <div className="h-10 bg-surface-2 rounded-button max-w-md mb-6 animate-pulse" />
      <div className="flex gap-8">
        <div className="hidden lg:block w-60 shrink-0 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-surface-2 rounded w-20 animate-pulse" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-8 bg-surface-2 rounded animate-pulse" />
              ))}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-card-lg p-5 animate-pulse">
              <div className="flex gap-2 mb-3">
                <div className="h-5 w-16 bg-surface-2 rounded-full" />
                <div className="h-5 w-12 bg-surface-2 rounded-full" />
              </div>
              <div className="h-5 bg-surface-2 rounded w-3/4 mb-2" />
              <div className="h-4 bg-surface-2 rounded w-full mb-1" />
              <div className="h-4 bg-surface-2 rounded w-2/3 mb-4" />
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="h-10 bg-surface-2 rounded" />
                <div className="h-10 bg-surface-2 rounded" />
                <div className="h-10 bg-surface-2 rounded" />
              </div>
              <div className="h-2 bg-surface-2 rounded-full mb-3" />
              <div className="flex gap-1">
                <div className="h-5 w-12 bg-surface-2 rounded-full" />
                <div className="h-5 w-14 bg-surface-2 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
