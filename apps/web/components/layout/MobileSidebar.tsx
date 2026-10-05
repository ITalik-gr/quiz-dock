"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "./SidebarContent"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [lastPath, setLastPath] = useState(pathname)

  // Close the drawer after navigation
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="grid size-[36px] place-items-center rounded-full border border-[#e7e7e7] text-[#3f3f46] outline-none hover:bg-[#f7f7f7] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40 | lg:hidden"
      >
        <Menu className="size-[18px]" aria-hidden />
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] bg-[#fafafa] p-0 shadow-none">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}
