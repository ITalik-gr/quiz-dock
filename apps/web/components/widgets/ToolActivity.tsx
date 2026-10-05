import { BookOpen, Check, CircleAlert, ListChecks, LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type ToolActivityProps = {
  label: string
  status: "running" | "done" | "error"
  kind?: "read" | "quiz"
}

export function ToolActivity({ label, status, kind = "read" }: ToolActivityProps) {
  const Icon = kind === "quiz" ? ListChecks : BookOpen

  return (
    <div
      role="status"
      className={cn(
        "inline-flex max-w-full items-center gap-[8px] self-start rounded-full border border-[#e7e7e7] bg-[#fafafa] py-[4px] pr-[12px] pl-[8px] text-[13px] text-[#71717a]",
        status === "error" && "border-[#dc2626]/30 bg-[#fef2f2] text-[#b91c1c]",
      )}
    >
      <Icon className="size-[14px] shrink-0" aria-hidden />
      <span className={cn("truncate", status === "running" && "animate-pulse")}>{label}</span>
      {status === "running" && <LoaderCircle className="size-[14px] shrink-0 animate-spin text-[#3b4fd8]" aria-label="In progress" />}
      {status === "done" && <Check className="size-[14px] shrink-0 text-[#16a34a]" aria-label="Done" />}
      {status === "error" && <CircleAlert className="size-[14px] shrink-0" aria-label="Failed" />}
    </div>
  )
}
