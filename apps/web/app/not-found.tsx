import { FileQuestion } from "lucide-react"
import { PageContainer } from "@/components/layout/PageContainer"
import { TopBar } from "@/components/layout/TopBar"
import { EmptyState } from "@/components/widgets/EmptyState"

export default function NotFound() {
  return (
    <>
      <TopBar crumbs={[{ label: "Not found" }]} />
      <PageContainer>
        <EmptyState
          icon={FileQuestion}
          title="Page not found"
          description="This discussion or quiz does not exist or was removed."
          action={{ label: "Back to home", href: "/" }}
        />
      </PageContainer>
    </>
  )
}
