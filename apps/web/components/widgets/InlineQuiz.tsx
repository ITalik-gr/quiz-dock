"use client"

import { useState, type FormEvent } from "react"
import { ListChecks } from "lucide-react"
import type { QuizQuestion } from "@/lib/placeholder"
import { AnswerOption, type AnswerOptionState } from "./AnswerOption"

type InlineQuizProps = {
  id: string
  questions: QuizQuestion[]
  // Present once the answers were submitted
  answers?: number[]
  onSubmit?: (answers: number[]) => void
}

export function InlineQuiz({ id, questions, answers, onSubmit }: InlineQuizProps) {
  const [selected, setSelected] = useState<(number | undefined)[]>([])
  const submitted = answers !== undefined
  const complete = questions.every((_, i) => selected[i] !== undefined)
  const correct = answers?.filter((a, i) => a === questions[i].correctIndex).length ?? 0

  function select(question: number, option: number) {
    setSelected((prev) => {
      const next = [...prev]
      next[question] = option
      return next
    })
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    if (complete) onSubmit?.(selected as number[])
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-[20px] rounded-[16px] border border-[#e7e7e7] bg-white p-[16px] | sm:p-[20px]">
      <div className="flex items-center justify-between gap-[12px]">
        <div className="flex items-center gap-[8px]">
          <ListChecks className="size-[16px] text-[#3b4fd8]" aria-hidden />
          <p className="text-[14px] font-semibold text-[#111111]">Quiz · {questions.length} questions</p>
        </div>
        {submitted && (
          <span className="rounded-full bg-[#f4f4f5] px-[10px] py-[2px] text-[13px] font-medium text-[#111111]">
            {correct}/{questions.length}
          </span>
        )}
      </div>

      <ol className="flex flex-col gap-[20px]">
        {questions.map((q, qi) => (
          <li key={qi}>
            <fieldset className="flex flex-col gap-[8px]">
              <legend className="mb-[8px] text-[15px] font-medium leading-[1.5] text-[#111111]">
                <span className="text-[#71717a]">{qi + 1}.</span> {q.text}
              </legend>
              {q.options.map((option, oi) => (
                <AnswerOption
                  key={oi}
                  name={`${id}-q${qi}`}
                  index={oi}
                  text={option}
                  state={submitted ? gradeState(oi, answers[qi], q.correctIndex) : selected[qi] === oi ? "selected" : "idle"}
                  onSelect={submitted ? undefined : (o) => select(qi, o)}
                />
              ))}
            </fieldset>
          </li>
        ))}
      </ol>

      {!submitted && (
        <button
          type="submit"
          disabled={!complete}
          className="h-[40px] self-start rounded-full bg-[#111111] px-[18px] text-[14px] font-medium text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Submit answers
        </button>
      )}
    </form>
  )
}

export function gradeState(option: number, answer: number, correct: number): AnswerOptionState {
  if (option === correct) return answer === correct ? "correct" : "missed"
  if (option === answer) return "wrong"
  return "idle"
}
