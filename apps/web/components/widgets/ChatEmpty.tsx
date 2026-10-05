type ChatEmptyProps = {
  documentName: string
  onPick: (text: string) => void
}

const suggestions = ["Summarize the document", "What are the key concepts?", "Quiz me, 3 questions"]

export function ChatEmpty({ documentName, onPick }: ChatEmptyProps) {
  return (
    <div className="flex flex-col items-center gap-[20px] py-[48px] text-center | sm:py-[80px]">
      <div className="flex flex-col gap-[6px]">
        <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-[#111111]">Ask anything about the document</h2>
        <p className="text-[14px] text-[#71717a]">Answers come only from {documentName}.</p>
      </div>
      <ul className="flex flex-wrap justify-center gap-[8px]">
        {suggestions.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => onPick(s)}
              className="h-[36px] rounded-full border border-[#e7e7e7] bg-white px-[14px] text-[14px] text-[#3f3f46] outline-none hover:bg-[#f7f7f7] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
