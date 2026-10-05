import type { FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import type { QuizQuestion } from "@/lib/placeholder"
import { AnswerOption } from "./AnswerOption"

type QuestionCardProps = {
  number: number
  question: QuizQuestion
  selectedIndex?: number
  last?: boolean
  onSelect: (index: number) => void
  onNext: () => void
  onBack?: () => void
}

export function QuestionCard({ number, question, selectedIndex, last, onSelect, onNext, onBack }: QuestionCardProps) {
  function submit(e: FormEvent) {
    e.preventDefault()
    if (selectedIndex !== undefined) onNext()
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-[24px] rounded-[16px] border border-[#e7e7e7] bg-white p-[20px] | sm:p-[28px]">
      <fieldset className="flex flex-col gap-[10px]">
        <legend className="mb-[16px] text-[20px] font-semibold leading-[1.4] tracking-[-0.01em] text-[#111111] | sm:text-[22px]">
          <span className="sr-only">Question {number}: </span>
          {question.text}
        </legend>
        {question.options.map((option, i) => (
          <AnswerOption
            key={i}
            name={`q${number}`}
            index={i}
            text={option}
            state={i === selectedIndex ? "selected" : "idle"}
            onSelect={onSelect}
          />
        ))}
      </fieldset>
      <div className="flex items-center justify-between gap-[12px]">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="h-[40px] rounded-full px-[14px] text-[14px] text-[#71717a] outline-none hover:text-[#111111] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40 disabled:invisible"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={selectedIndex === undefined}
          className="inline-flex h-[40px] items-center gap-[8px] rounded-full bg-[#111111] px-[18px] text-[14px] font-medium text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {last ? "Finish quiz" : "Next question"}
          <ArrowRight className="size-[16px]" aria-hidden />
        </button>
      </div>
    </form>
  )
}
