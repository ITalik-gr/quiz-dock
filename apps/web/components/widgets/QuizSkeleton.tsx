import { Skeleton } from "@/components/ui/skeleton"

export function QuizSkeleton() {
  return (
    <div aria-busy className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px]">
        <Skeleton className="h-[16px] w-[140px]" />
        <Skeleton className="h-[4px] w-full rounded-full" />
      </div>
      <div className="flex flex-col gap-[12px] rounded-[16px] border border-[#e7e7e7] p-[20px] | sm:p-[28px]">
        <Skeleton className="mb-[12px] h-[24px] w-[80%]" />
        <Skeleton className="h-[52px] w-full rounded-[12px]" />
        <Skeleton className="h-[52px] w-full rounded-[12px]" />
        <Skeleton className="h-[52px] w-full rounded-[12px]" />
      </div>
    </div>
  )
}
