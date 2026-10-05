import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type AnswerOptionState = "idle" | "selected" | "correct" | "wrong" | "missed"

type AnswerOptionProps = {
  name: string
  index: number
  text: string
  state?: AnswerOptionState
  onSelect?: (index: number) => void
}

const letters = ["A", "B", "C", "D", "E"]

export function AnswerOption({ name, index, text, state = "idle", onSelect }: AnswerOptionProps) {
  const graded = state === "correct" || state === "wrong" || state === "missed"
  const readOnly = graded || !onSelect

  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-[12px] rounded-[12px] border border-[#e7e7e7] bg-white p-[12px] text-[14px] leading-[1.5] text-[#3f3f46] transition-colors hover:border-[#d4d4d8] has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-[#3b4fd8]/40 | sm:p-[14px] sm:text-[15px]",
        state === "selected" && "border-[#3b4fd8] bg-[#3b4fd8]/5 text-[#111111] hover:border-[#3b4fd8]",
        state === "correct" && "border-[#16a34a]/50 bg-[#f0fdf4] text-[#111111]",
        state === "wrong" && "border-[#dc2626]/40 bg-[#fef2f2] text-[#111111]",
        state === "missed" && "border-dashed border-[#16a34a]/50",
        readOnly && "cursor-default hover:border-[#e7e7e7]",
      )}
    >
      <input
        type="radio"
        name={name}
        value={index}
        checked={state === "selected" || state === "correct" || state === "wrong"}
        onChange={() => onSelect?.(index)}
        disabled={readOnly}
        className="sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "grid size-[24px] shrink-0 place-items-center rounded-full border border-[#e7e7e7] text-[12px] font-medium text-[#71717a]",
          state === "selected" && "border-[#3b4fd8] bg-[#3b4fd8] text-white",
          state === "correct" && "border-[#16a34a] bg-[#16a34a] text-white",
          state === "wrong" && "border-[#dc2626] bg-[#dc2626] text-white",
          state === "missed" && "border-[#16a34a] text-[#16a34a]",
        )}
      >
        {state === "correct" ? <Check className="size-[14px]" /> : state === "wrong" ? <X className="size-[14px]" /> : letters[index]}
      </span>
      <span className="pt-[1px]">{text}</span>
      {state === "missed" && <span className="ml-auto shrink-0 pt-[2px] text-[12px] font-medium text-[#16a34a]">Correct answer</span>}
    </label>
  )
}
