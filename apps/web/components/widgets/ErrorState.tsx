import { TriangleAlert } from "lucide-react"

type ErrorStateProps = {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this page. Try again in a moment.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="mx-auto flex max-w-[420px] flex-col items-center gap-[16px] px-[16px] py-[96px] text-center">
      <span className="grid size-[48px] place-items-center rounded-full bg-[#fef2f2] text-[#dc2626]">
        <TriangleAlert className="size-[20px]" aria-hidden />
      </span>
      <div className="flex flex-col gap-[6px]">
        <h2 className="text-[20px] font-semibold text-[#111111]">{title}</h2>
        <p className="text-[14px] leading-[1.6] text-[#71717a]">{description}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="h-[40px] rounded-full bg-[#111111] px-[18px] text-[14px] font-medium text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
        >
          Try again
        </button>
      )}
    </div>
  )
}
