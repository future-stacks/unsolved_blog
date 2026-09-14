export function SeriesProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-1.5 w-32 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <span className="text-[12.5px] font-medium text-fg-secondary font-tabular">
        {current} of {total} essays
      </span>
    </div>
  );
}
