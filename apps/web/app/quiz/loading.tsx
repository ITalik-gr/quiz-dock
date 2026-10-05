import { PageContainer } from "@/components/layout/PageContainer"
import { TopBar } from "@/components/layout/TopBar"
import { ListSkeleton } from "@/components/widgets/ListSkeleton"
import { PageHeaderSkeleton } from "@/components/widgets/PageHeaderSkeleton"

export default function Loading() {
  return (
    <>
      <TopBar crumbs={[{ label: "Quizzes" }]} />
      <PageContainer>
        <PageHeaderSkeleton />
        <ListSkeleton />
      </PageContainer>
    </>
  )
}
