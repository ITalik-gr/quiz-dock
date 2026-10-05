import type { ChatPart } from "@/lib/placeholder"
import { InlineQuiz } from "./InlineQuiz"
import { ToolActivity } from "./ToolActivity"

type AssistantMessageProps = {
  id: string
  parts: ChatPart[]
  streaming?: boolean
  onQuizSubmit?: (partIndex: number, answers: number[]) => void
}

export function AssistantMessage({ id, parts, streaming, onQuizSubmit }: AssistantMessageProps) {
  return (
    <div className="flex gap-[12px]">
      <span aria-hidden className="mt-[2px] hidden size-[28px] shrink-0 place-items-center rounded-[8px] bg-[#111111] text-[12px] font-bold text-white | sm:grid">
        Q
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[10px]">
        {parts.map((part, i) => {
          if (part.type === "tool") {
            return <ToolActivity key={i} label={part.label} status={part.status} kind={part.tool === "startQuiz" ? "quiz" : "read"} />
          }
          if (part.type === "quiz") {
            return (
              <InlineQuiz
                key={i}
                id={`${id}-${i}`}
                questions={part.questions}
                answers={part.answers}
                onSubmit={(answers) => onQuizSubmit?.(i, answers)}
              />
            )
          }
          return (
            <p key={i} className="text-[15px] leading-[1.7] text-[#3f3f46]">
              {part.text}
            </p>
          )
        })}
        {streaming && <span aria-label="Agent is responding" className="h-[16px] w-[8px] animate-pulse rounded-[2px] bg-[#111111]" />}
      </div>
    </div>
  )
}
