import { Logo } from "./Logo"
import { RecentSessions } from "./RecentSessions"
import { SidebarNav } from "./SidebarNav"

export function SidebarContent() {
  return (
    <div className="flex h-full flex-col gap-[28px] p-[16px]">
      <div className="px-[6px] pt-[4px]">
        <Logo />
      </div>
      <SidebarNav />
      <RecentSessions />
    </div>
  )
}
