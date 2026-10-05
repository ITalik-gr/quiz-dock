type QuizProgressProps = {
  current: number
  total: number
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-medium text-[#3b4fd8]">
          Question {current} of {total}
        </span>
        <span className="text-[#71717a]">{Math.round(((current - 1) / total) * 100)}% done</span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current - 1}
        aria-label="Quiz progress"
        className="flex gap-[4px]"
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={i < current - 1 ? "h-[4px] flex-1 rounded-full bg-[#3b4fd8]" : i === current - 1 ? "h-[4px] flex-1 rounded-full bg-[#3b4fd8]/30" : "h-[4px] flex-1 rounded-full bg-[#e7e7e7]"}
          />
        ))}
      </div>
    </div>
  )
}
