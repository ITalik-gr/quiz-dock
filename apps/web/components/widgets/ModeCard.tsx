import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ModeCardProps = {
  icon: LucideIcon
  title: string
  description: string
  cta: string
  primary?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function ModeCard({ icon: Icon, title, description, cta, primary, disabled, onClick }: ModeCardProps) {
  return (
    <div className="flex flex-col gap-[20px] rounded-[16px] border border-[#e7e7e7] bg-white p-[20px] | sm:p-[24px]">
      <span className="grid size-[40px] place-items-center rounded-[12px] bg-[#f4f4f5] text-[#111111]">
        <Icon className="size-[18px]" aria-hidden />
      </span>
      <div className="flex flex-col gap-[6px]">
        <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-[#111111]">{title}</h3>
        <p className="text-[14px] leading-[1.6] text-[#71717a]">{description}</p>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "mt-auto inline-flex h-[40px] items-center justify-center gap-[8px] self-start rounded-full px-[18px] text-[14px] font-medium outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40 disabled:cursor-not-allowed disabled:opacity-40",
          primary
            ? "bg-[#111111] text-white hover:bg-[#2a2a2a]"
            : "border border-[#e7e7e7] bg-white text-[#111111] hover:bg-[#f7f7f7]",
        )}
      >
        {cta}
        <ArrowRight className="size-[16px]" aria-hidden />
      </button>
    </div>
  )
}
