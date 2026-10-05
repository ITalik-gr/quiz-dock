import { ListChecks, MessagesSquare } from "lucide-react"
import { ModeCard } from "./ModeCard"

export type Mode = "discuss" | "quiz"

type ModeChoiceProps = {
  disabled?: boolean
  onSelect: (mode: Mode) => void
}

export function ModeChoice({ disabled, onSelect }: ModeChoiceProps) {
  return (
    <section aria-labelledby="mode-heading" className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[4px]">
        <h2 id="mode-heading" className="text-[20px] font-semibold tracking-[-0.01em] text-[#111111]">
          What do you want to do?
        </h2>
        <p className="text-[14px] text-[#71717a]">
          {disabled ? "Add a document first." : "The agent answers only from your document."}
        </p>
      </div>
      <div className="grid gap-[16px] | md:grid-cols-2">
        <ModeCard
          icon={MessagesSquare}
          title="Discuss"
          description="Ask questions and get answers grounded in the document, with the sections the agent read."
          cta="Start discussion"
          primary
          disabled={disabled}
          onClick={() => onSelect("discuss")}
        />
        <ModeCard
          icon={ListChecks}
          title="Quiz"
          description="Get a short multiple-choice quiz on the document and see explanations for each answer."
          cta="Start quiz"
          disabled={disabled}
          onClick={() => onSelect("quiz")}
        />
      </div>
    </section>
  )
}
