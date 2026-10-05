import { Skeleton } from "@/components/ui/skeleton"

export function ChatSkeleton() {
  return (
    <div aria-busy className="flex flex-col gap-[28px]">
      <Skeleton className="ml-auto h-[44px] w-[60%] rounded-[16px]" />
      <div className="flex gap-[12px]">
        <Skeleton className="size-[28px] shrink-0 rounded-[8px]" />
        <div className="flex flex-1 flex-col gap-[10px]">
          <Skeleton className="h-[26px] w-[200px] rounded-full" />
          <Skeleton className="h-[16px] w-full" />
          <Skeleton className="h-[16px] w-[90%]" />
          <Skeleton className="h-[16px] w-[70%]" />
        </div>
      </div>
      <Skeleton className="ml-auto h-[44px] w-[40%] rounded-[16px]" />
    </div>
  )
}
