import { cn } from "@/lib/utils"

type ScoreBadgeProps = {
  score?: { correct: number; total: number }
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  if (!score) {
    return <span className="shrink-0 rounded-full border border-[#e7e7e7] px-[10px] py-[2px] text-[12px] text-[#71717a]">Not finished</span>
  }

  const perfect = score.correct === score.total
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-[10px] py-[2px] text-[13px] font-medium",
        perfect ? "bg-[#f0fdf4] text-[#15803d]" : "bg-[#f4f4f5] text-[#111111]",
      )}
    >
      {score.correct}/{score.total}
    </span>
  )
}
