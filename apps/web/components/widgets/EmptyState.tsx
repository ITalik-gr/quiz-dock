import type { LucideIcon } from "lucide-react"
import Link from "next/link"

type EmptyStateProps = {
  icon: LucideIcon
  title: string
  description: string
  action?: { label: string; href: string }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-[16px] rounded-[16px] border border-dashed border-[#d4d4d8] bg-[#fafafa] px-[20px] py-[56px] text-center">
      <span className="grid size-[48px] place-items-center rounded-full border border-[#e7e7e7] bg-white text-[#3f3f46]">
        <Icon className="size-[20px]" aria-hidden />
      </span>
      <div className="flex max-w-[360px] flex-col gap-[6px]">
        <h2 className="text-[17px] font-semibold text-[#111111]">{title}</h2>
        <p className="text-[14px] leading-[1.6] text-[#71717a]">{description}</p>
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex h-[40px] items-center rounded-full bg-[#111111] px-[18px] text-[14px] font-medium text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
