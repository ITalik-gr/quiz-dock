import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MobileSidebar } from "./MobileSidebar"

export type Crumb = {
  label: string
  href?: string
}

type TopBarProps = {
  crumbs: Crumb[]
}

export function TopBar({ crumbs }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-[56px] items-center gap-[12px] border-b border-[#e7e7e7] bg-white/90 px-[16px] backdrop-blur | sm:px-[24px] | lg:px-[40px]">
      <MobileSidebar />
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex items-center gap-[6px] text-[14px]">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1
            return (
              <li key={i} className="flex min-w-0 items-center gap-[6px]">
                {i > 0 && <ChevronRight className="size-[14px] shrink-0 text-[#a1a1aa]" aria-hidden />}
                {crumb.href && !last ? (
                  <Link href={crumb.href} className="truncate text-[#71717a] hover:text-[#111111]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className="truncate font-medium text-[#111111]">
                    {crumb.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </header>
  )
}
