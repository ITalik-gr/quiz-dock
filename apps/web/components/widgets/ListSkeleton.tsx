import { Skeleton } from "@/components/ui/skeleton"

type ListSkeletonProps = {
  rows?: number
}

export function ListSkeleton({ rows = 4 }: ListSkeletonProps) {
  return (
    <div aria-busy className="divide-y divide-[#e7e7e7] rounded-[16px] border border-[#e7e7e7]">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex flex-col gap-[8px] px-[16px] py-[16px] | sm:px-[20px]">
          <Skeleton className="h-[16px] w-[45%]" />
          <Skeleton className="h-[12px] w-[30%]" />
        </div>
      ))}
    </div>
  )
}
