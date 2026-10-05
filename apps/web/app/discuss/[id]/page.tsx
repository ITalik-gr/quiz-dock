import { TopBar } from "@/components/layout/TopBar"
import { DiscussionChat } from "@/components/widgets/DiscussionChat"
import { DocumentChip } from "@/components/widgets/DocumentChip"
import { chatMessages, discussion } from "@/lib/placeholder"

export default function DiscussionPage() {
  // TODO: load the discussion and its history by id
  return (
    <>
      <TopBar crumbs={[{ label: "Discussions", href: "/discuss" }, { label: discussion.title }]} />
      <div className="mx-auto flex w-full max-w-[760px] flex-1 flex-col px-[16px] | sm:px-[24px]">
        <div className="flex flex-wrap items-center justify-between gap-[12px] border-b border-[#e7e7e7] py-[16px]">
          <h1 className="text-[18px] font-semibold tracking-[-0.01em] text-[#111111]">{discussion.title}</h1>
          <DocumentChip name={discussion.document.name} meta={`${discussion.document.sections} sections`} />
        </div>
        <DiscussionChat documentName={discussion.document.name} initialMessages={chatMessages} />
      </div>
    </>
  )
}
