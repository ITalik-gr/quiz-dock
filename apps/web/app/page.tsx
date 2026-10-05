import { PageContainer } from "@/components/layout/PageContainer"
import { PageHeader } from "@/components/layout/PageHeader"
import { TopBar } from "@/components/layout/TopBar"
import { DocumentStart } from "@/components/widgets/DocumentStart"

export default function HomePage() {
  return (
    <>
      <TopBar crumbs={[{ label: "New document" }]} />
      <PageContainer>
        <PageHeader
          eyebrow="Quiz Dock"
          title="Learn any document"
          description="Upload a document, talk it through with an agent that sticks to the text, then check yourself with a quiz."
        />
        <DocumentStart />
      </PageContainer>
    </>
  )
}
