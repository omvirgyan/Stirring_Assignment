export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-20 w-full rounded-md bg-zinc-200 animate-pulse"
        />
      ))}
    </div>
  );
}
