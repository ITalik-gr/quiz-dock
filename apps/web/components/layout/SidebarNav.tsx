"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, ListChecks, MessagesSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "New document", icon: House },
  { href: "/discuss", label: "Discussions", icon: MessagesSquare },
  { href: "/quiz", label: "Quizzes", icon: ListChecks },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main">
      <ul className="flex flex-col gap-[2px]">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-[36px] items-center gap-[10px] rounded-[10px] px-[10px] text-[14px] text-[#3f3f46] outline-none transition-colors hover:bg-[#f0f0f0] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40",
                  active && "bg-white font-medium text-[#111111] ring-1 ring-[#e7e7e7] hover:bg-white",
                )}
              >
                <Icon className={cn("size-[16px] text-[#71717a]", active && "text-[#3b4fd8]")} aria-hidden />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
