import { MessagesSquare, Plus } from "lucide-react"
import Link from "next/link"
import { PageContainer } from "@/components/layout/PageContainer"
import { PageHeader } from "@/components/layout/PageHeader"
import { TopBar } from "@/components/layout/TopBar"
import { EmptyState } from "@/components/widgets/EmptyState"
import { SessionList } from "@/components/widgets/SessionList"
import { SessionRow } from "@/components/widgets/SessionRow"
import { discussions } from "@/lib/placeholder"

export default function DiscussionsPage() {
  // TODO: load discussions
  const items = discussions

  return (
    <>
      <TopBar crumbs={[{ label: "Discussions" }]} />
      <PageContainer>
        <PageHeader
          eyebrow="Discuss"
          title="Discussions"
          description="Conversations with the agent about your documents."
          actions={
            <Link
              href="/"
              className="inline-flex h-[40px] items-center gap-[8px] rounded-full bg-[#111111] px-[18px] text-[14px] font-medium text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
            >
              <Plus className="size-[16px]" aria-hidden />
              New discussion
            </Link>
          }
        />
        {items.length === 0 ? (
          <EmptyState
            icon={MessagesSquare}
            title="No discussions yet"
            description="Upload a document and start a discussion to see it here."
            action={{ label: "Upload a document", href: "/" }}
          />
        ) : (
          <SessionList label="Discussions">
            {items.map((d) => (
              <SessionRow key={d.id} href={`/discuss/${d.id}`} title={d.title} document={d.document} meta={`${d.messages} messages · ${d.updatedAt}`} />
            ))}
          </SessionList>
        )}
      </PageContainer>
    </>
  )
}
