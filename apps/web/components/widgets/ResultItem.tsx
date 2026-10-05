import { Check, X } from "lucide-react"
import type { QuizQuestion } from "@/lib/placeholder"
import { cn } from "@/lib/utils"

type ResultItemProps = {
  number: number
  question: QuizQuestion
  answer: number
}

export function ResultItem({ number, question, answer }: ResultItemProps) {
  const isCorrect = answer === question.correctIndex

  return (
    <li className="flex flex-col gap-[12px] rounded-[16px] border border-[#e7e7e7] bg-white p-[16px] | sm:p-[20px]">
      <div className="flex items-start gap-[12px]">
        <span
          className={cn(
            "grid size-[24px] shrink-0 place-items-center rounded-full text-white",
            isCorrect ? "bg-[#16a34a]" : "bg-[#dc2626]",
          )}
        >
          {isCorrect ? <Check className="size-[14px]" aria-label="Correct" /> : <X className="size-[14px]" aria-label="Wrong" />}
        </span>
        <p className="text-[15px] font-medium leading-[1.5] text-[#111111]">
          <span className="text-[#71717a]">{number}.</span> {question.text}
        </p>
      </div>
      <dl className="flex flex-col gap-[4px] pl-[36px] text-[14px]">
        {!isCorrect && (
          <div className="flex flex-wrap gap-x-[6px]">
            <dt className="text-[#71717a]">Your answer:</dt>
            <dd className="text-[#b91c1c] line-through decoration-[#b91c1c]/40">{question.options[answer]}</dd>
          </div>
        )}
        <div className="flex flex-wrap gap-x-[6px]">
          <dt className="text-[#71717a]">Correct:</dt>
          <dd className="font-medium text-[#15803d]">{question.options[question.correctIndex]}</dd>
        </div>
      </dl>
      {question.explanation && (
        <p className="ml-[36px] rounded-[12px] bg-[#fafafa] px-[14px] py-[10px] text-[14px] leading-[1.6] text-[#3f3f46]">
          {question.explanation}
        </p>
      )}
    </li>
  )
}
