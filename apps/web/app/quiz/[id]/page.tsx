import { PageContainer } from "@/components/layout/PageContainer"
import { PageHeader } from "@/components/layout/PageHeader"
import { TopBar } from "@/components/layout/TopBar"
import { DocumentChip } from "@/components/widgets/DocumentChip"
import { QuizRunner } from "@/components/widgets/QuizRunner"
import { quiz } from "@/lib/placeholder"

export default function QuizPage() {
  // TODO: load the quiz by id
  return (
    <>
      <TopBar crumbs={[{ label: "Quizzes", href: "/quiz" }, { label: quiz.title }]} />
      <PageContainer>
        <div className="mx-auto flex w-full max-w-[720px] flex-col gap-[32px]">
          <PageHeader eyebrow="Quiz" title={quiz.title} description={<DocumentChip name={quiz.document.name} />} />
          <QuizRunner questions={quiz.questions} />
        </div>
      </PageContainer>
    </>
  )
}
