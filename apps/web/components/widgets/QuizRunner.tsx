"use client"

import { useState } from "react"
import type { QuizQuestion } from "@/lib/placeholder"
import { QuestionCard } from "./QuestionCard"
import { QuizProgress } from "./QuizProgress"
import { QuizResults } from "./QuizResults"

type QuizRunnerProps = {
  questions: QuizQuestion[]
}

export function QuizRunner({ questions }: QuizRunnerProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | undefined)[]>([])
  const [finished, setFinished] = useState(false)
  const last = current === questions.length - 1

  function select(option: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[current] = option
      return next
    })
  }

  function next() {
    if (!last) {
      setCurrent(current + 1)
      return
    }
    setFinished(true)
    // TODO: save the answers
  }

  function retake() {
    setCurrent(0)
    setAnswers([])
    setFinished(false)
  }

  if (finished) {
    return <QuizResults questions={questions} answers={answers as number[]} onRetake={retake} />
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <QuizProgress current={current + 1} total={questions.length} />
      <QuestionCard
        // Remount per question so focus and radios reset
        key={current}
        number={current + 1}
        question={questions[current]}
        selectedIndex={answers[current]}
        last={last}
        onSelect={select}
        onNext={next}
        onBack={current > 0 ? () => setCurrent(current - 1) : undefined}
      />
    </div>
  )
}
