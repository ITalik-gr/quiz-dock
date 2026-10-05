import Link from "next/link"
import type { QuizQuestion } from "@/lib/placeholder"
import { ResultItem } from "./ResultItem"
import { ScoreSummary } from "./ScoreSummary"

type QuizResultsProps = {
  questions: QuizQuestion[]
  answers: number[]
  onRetake: () => void
}

export function QuizResults({ questions, answers, onRetake }: QuizResultsProps) {
  const correct = answers.filter((a, i) => a === questions[i].correctIndex).length

  return (
    <div className="flex flex-col gap-[24px]">
      <ScoreSummary correct={correct} total={questions.length} />
      <section aria-labelledby="review-heading" className="flex flex-col gap-[12px]">
        <h2 id="review-heading" className="text-[18px] font-semibold text-[#111111]">
          Review
        </h2>
        <ol className="flex flex-col gap-[12px]">
          {questions.map((q, i) => (
            <ResultItem key={i} number={i + 1} question={q} answer={answers[i]} />
          ))}
        </ol>
      </section>
      <div className="flex flex-wrap gap-[8px]">
        <button
          type="button"
          onClick={onRetake}
          className="h-[40px] rounded-full bg-[#111111] px-[18px] text-[14px] font-medium text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
        >
          Retake quiz
        </button>
        <Link
          href="/quiz"
          className="inline-flex h-[40px] items-center rounded-full border border-[#e7e7e7] bg-white px-[18px] text-[14px] font-medium text-[#111111] outline-none hover:bg-[#f7f7f7] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
        >
          All quizzes
        </Link>
      </div>
    </div>
  )
}
