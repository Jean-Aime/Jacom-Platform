export function InsightCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="skeleton aspect-video"></div>
      <div className="p-6 space-y-3">
        <div className="skeleton h-4 w-20 rounded"></div>
        <div className="skeleton h-6 w-full rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-3/4 rounded"></div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white border rounded-lg p-8">
      <div className="skeleton h-8 w-3/4 rounded mb-4"></div>
      <div className="skeleton h-4 w-full rounded mb-2"></div>
      <div className="skeleton h-4 w-full rounded mb-2"></div>
      <div className="skeleton h-4 w-2/3 rounded"></div>
    </div>
  );
}

export function ExpertCardSkeleton() {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="skeleton aspect-square"></div>
      <div className="p-6 space-y-3">
        <div className="skeleton h-6 w-3/4 rounded"></div>
        <div className="skeleton h-4 w-1/2 rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
        <div className="skeleton h-4 w-full rounded"></div>
      </div>
    </div>
  );
}
