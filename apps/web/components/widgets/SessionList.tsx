import type { ReactNode } from "react"

type SessionListProps = {
  label: string
  children: ReactNode
}

export function SessionList({ label, children }: SessionListProps) {
  return (
    <ul aria-label={label} className="divide-y divide-[#e7e7e7] overflow-hidden rounded-[16px] border border-[#e7e7e7] bg-white">
      {children}
    </ul>
  )
}
