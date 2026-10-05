import { Skeleton } from "@/components/ui/skeleton"

export function PageHeaderSkeleton() {
  return (
    <div aria-busy className="flex flex-col gap-[12px]">
      <Skeleton className="h-[14px] w-[80px]" />
      <Skeleton className="h-[40px] w-[60%] | lg:h-[48px]" />
      <Skeleton className="h-[16px] w-[40%]" />
    </div>
  )
}
