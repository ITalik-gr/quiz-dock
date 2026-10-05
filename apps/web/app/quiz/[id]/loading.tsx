import { PageContainer } from "@/components/layout/PageContainer"
import { TopBar } from "@/components/layout/TopBar"
import { PageHeaderSkeleton } from "@/components/widgets/PageHeaderSkeleton"
import { QuizSkeleton } from "@/components/widgets/QuizSkeleton"

export default function Loading() {
  return (
    <>
      <TopBar crumbs={[{ label: "Quizzes", href: "/quiz" }, { label: "Loading…" }]} />
      <PageContainer>
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-[32px]">
          <PageHeaderSkeleton />
          <QuizSkeleton />
        </div>
      </PageContainer>
    </>
  )
}
