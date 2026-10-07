import type { ReactNode } from "react"
import { PixelPattern } from "./PixelPattern"
import { api } from "@/lib/api"

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: ReactNode
  actions?: ReactNode
}

export async function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {

  const res = await api.health.$get();
  const data = await res.json() 

  return (
    <div className="flex items-start justify-between gap-[24px]">
      <div className="flex max-w-[640px] flex-col gap-[12px]">
        {eyebrow && <p className="text-[13px] font-medium text-[#3b4fd8]">{eyebrow}</p>}
        <h1 className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#111111] | sm:text-[38px] | lg:text-[44px]">
          {title}
        </h1>
        {description && <p className="text-[16px] leading-[1.6] text-[#71717a]">{description}</p>}
        {actions && <div className="flex flex-wrap gap-[8px] pt-[8px]">{actions}</div>}

        <div className="">
          <span>API Health:</span>
          <span>{data.ok ? 'Ok' : 'Failed'}</span>
        </div>
      </div>
      <div className="hidden shrink-0 pt-[8px] | md:block">
        <PixelPattern />
      </div>
    </div>
  )
}
