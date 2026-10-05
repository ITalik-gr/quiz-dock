type ScoreSummaryProps = {
  correct: number
  total: number
}

export function ScoreSummary({ correct, total }: ScoreSummaryProps) {
  const percent = Math.round((correct / total) * 100)

  return (
    <div className="flex flex-col gap-[6px] rounded-[16px] border border-[#e7e7e7] bg-[#fafafa] p-[20px] | sm:p-[28px]">
      <p className="text-[13px] font-medium text-[#3b4fd8]">Your score</p>
      <p className="text-[44px] font-bold leading-none tracking-[-0.02em] text-[#111111] | sm:text-[56px]">
        {correct}
        <span className="text-[#a1a1aa]">/{total}</span>
      </p>
      <p className="text-[14px] text-[#71717a]">{percent}% correct</p>
    </div>
  )
}
