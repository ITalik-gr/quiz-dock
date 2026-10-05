import { SidebarContent } from "./SidebarContent"

export function AppSidebar() {
  return (
    <aside className="hidden | lg:fixed lg:inset-y-0 lg:left-0 lg:block lg:w-[260px] lg:border-r lg:border-[#e7e7e7] lg:bg-[#fafafa]">
      <SidebarContent />
    </aside>
  )
}
