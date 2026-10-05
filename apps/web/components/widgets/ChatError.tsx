import { CircleAlert } from "lucide-react"

type ChatErrorProps = {
  message?: string
  onRetry: () => void
}

// Inline error for a failed agent turn, shown inside the thread
export function ChatError({ message = "The agent stopped unexpectedly.", onRetry }: ChatErrorProps) {
  return (
    <div role="alert" className="flex items-center gap-[10px] rounded-[12px] border border-[#dc2626]/30 bg-[#fef2f2] px-[14px] py-[10px] text-[14px] text-[#b91c1c]">
      <CircleAlert className="size-[16px] shrink-0" aria-hidden />
      <span className="flex-1">{message}</span>
      <button type="button" onClick={onRetry} className="shrink-0 rounded-full px-[10px] py-[2px] font-medium underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-[#dc2626]/30">
        Retry
      </button>
    </div>
  )
}
