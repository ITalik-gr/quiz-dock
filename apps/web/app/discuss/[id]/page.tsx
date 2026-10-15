import { TopBar } from "@/components/layout/TopBar"
import { DiscussionChat } from "@/components/widgets/DiscussionChat"
import { DocumentChip } from "@/components/widgets/DocumentChip"
import useAction from "@/hooks/useAction"
import { api } from "@/lib/api"
import { unwrap } from "@/lib/api-error"
import { chatMessages, discussion } from "@/lib/placeholder"

type Props = {
  params: Promise<{id: string}>
}

export default async function DiscussionPage({ params }: Props) {

  const { id } = await params

  const res = await unwrap(
    api.documents[":id"].$get({
      param: { id },
    })
  )

  const documentName = res.title;


  console.log(res)

  return (
    <>
      <TopBar crumbs={[{ label: "Discussions", href: "/discuss" }, { label: res.title }]} />
      <div className="mx-auto flex w-full max-w-[760px] flex-1 flex-col px-[16px] | sm:px-[24px]">
        <div className="flex flex-wrap items-center justify-between gap-[12px] border-b border-[#e7e7e7] py-[16px]">
          <h1 className="text-[18px] font-semibold tracking-[-0.01em] text-[#111111]">{discussion.title}</h1>
          <DocumentChip name={documentName} meta={`${discussion.document.sections} sections`} />
        </div>
        <DiscussionChat documentName={documentName} initialMessages={chatMessages} />
      </div>
    </>
  )
}
