import { ListChecks, Plus } from "lucide-react"
import Link from "next/link"
import { PageContainer } from "@/components/layout/PageContainer"
import { PageHeader } from "@/components/layout/PageHeader"
import { TopBar } from "@/components/layout/TopBar"
import { EmptyState } from "@/components/widgets/EmptyState"
import { ScoreBadge } from "@/components/widgets/ScoreBadge"
import { SessionList } from "@/components/widgets/SessionList"
import { SessionRow } from "@/components/widgets/SessionRow"
import { quizzes } from "@/lib/placeholder"

export default function QuizzesPage() {
  // TODO: load quizzes
  const items = quizzes

  return (
    <>
      <TopBar crumbs={[{ label: "Quizzes" }]} />
      <PageContainer>
        <PageHeader
          eyebrow="Quiz"
          title="Quizzes"
          description="Every quiz you took, with your score."
          actions={
            <Link
              href="/"
              className="inline-flex h-[40px] items-center gap-[8px] rounded-full bg-[#111111] px-[18px] text-[14px] font-medium text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
            >
              <Plus className="size-[16px]" aria-hidden />
              New quiz
            </Link>
          }
        />
        {items.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            title="No quizzes yet"
            description="Upload a document and start a quiz to see your scores here."
            action={{ label: "Upload a document", href: "/" }}
          />
        ) : (
          <SessionList label="Quizzes">
            {items.map((q) => (
              <SessionRow
                key={q.id}
                href={`/quiz/${q.id}`}
                title={q.title}
                document={q.document}
                meta={q.updatedAt}
                trailing={<ScoreBadge score={q.score} />}
              />
            ))}
          </SessionList>
        )}
      </PageContainer>
    </>
  )
}
