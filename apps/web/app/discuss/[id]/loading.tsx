import { TopBar } from "@/components/layout/TopBar"
import { Skeleton } from "@/components/ui/skeleton"
import { ChatComposer } from "@/components/widgets/ChatComposer"
import { ChatSkeleton } from "@/components/widgets/ChatSkeleton"

export default function Loading() {
  return (
    <>
      <TopBar crumbs={[{ label: "Discussions", href: "/discuss" }, { label: "Loading…" }]} />
      <div className="mx-auto flex w-full max-w-[760px] flex-1 flex-col px-[16px] | sm:px-[24px]">
        <div className="flex items-center justify-between gap-[12px] border-b border-[#e7e7e7] py-[16px]">
          <Skeleton className="h-[22px] w-[200px]" />
          <Skeleton className="h-[26px] w-[160px] rounded-full" />
        </div>
        <div className="flex-1 py-[28px]">
          <ChatSkeleton />
        </div>
        <div className="sticky bottom-0 bg-white pt-[8px] pb-[16px] | sm:pb-[24px]">
          <ChatComposer disabled />
        </div>
      </div>
    </>
  )
}
