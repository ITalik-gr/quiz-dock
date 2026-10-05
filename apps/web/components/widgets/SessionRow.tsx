import Link from "next/link"
import { ChevronRight, FileText } from "lucide-react"
import type { ReactNode } from "react"

type SessionRowProps = {
  href: string
  title: string
  document: string
  meta: string
  trailing?: ReactNode
}

export function SessionRow({ href, title, document, meta, trailing }: SessionRowProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-[16px] px-[16px] py-[14px] outline-none transition-colors hover:bg-[#fafafa] focus-visible:bg-[#fafafa] focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-[#3b4fd8]/40 | sm:px-[20px] sm:py-[16px]"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
          <p className="truncate text-[15px] font-medium text-[#111111]">{title}</p>
          <p className="flex min-w-0 items-center gap-[6px] text-[13px] text-[#71717a]">
            <FileText className="size-[13px] shrink-0" aria-hidden />
            <span className="truncate">{document}</span>
            <span aria-hidden>·</span>
            <span className="shrink-0">{meta}</span>
          </p>
        </div>
        {trailing}
        <ChevronRight className="size-[16px] shrink-0 text-[#a1a1aa]" aria-hidden />
      </Link>
    </li>
  )
}
