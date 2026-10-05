import { Link2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function UrlImport() {
  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center gap-[8px]">
        <label htmlFor="docs-url" className="text-[14px] font-medium text-[#111111]">
          Or import from a docs URL
        </label>
        <Badge variant="outline" className="rounded-full border-[#3b4fd8]/30 text-[11px] text-[#3b4fd8]">
          Soon
        </Badge>
      </div>
      <div className="relative">
        <Link2 className="pointer-events-none absolute top-1/2 left-[14px] size-[16px] -translate-y-1/2 text-[#a1a1aa]" aria-hidden />
        <input
          id="docs-url"
          type="url"
          disabled
          placeholder="https://docs.example.com"
          className="h-[44px] w-full cursor-not-allowed rounded-[12px] border border-[#e7e7e7] bg-[#fafafa] pr-[14px] pl-[40px] text-[14px] text-[#71717a] placeholder:text-[#a1a1aa]"
        />
      </div>
    </div>
  )
}
