import { FileText } from "lucide-react"

type DocumentChipProps = {
  name: string
  meta?: string
}

export function DocumentChip({ name, meta }: DocumentChipProps) {
  return (
    <span className="inline-flex max-w-full items-center gap-[8px] rounded-full border border-[#e7e7e7] bg-white py-[4px] pr-[12px] pl-[8px] text-[13px] text-[#3f3f46]">
      <FileText className="size-[14px] shrink-0 text-[#3b4fd8]" aria-hidden />
      <span className="truncate">{name}</span>
      {meta && <span className="shrink-0 text-[#a1a1aa]">· {meta}</span>}
    </span>
  )
}
