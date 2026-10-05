import Link from "next/link"

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-[10px] rounded-[8px] outline-none focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
    >
      <span className="grid size-[28px] place-items-center rounded-[8px] bg-[#111111] text-[13px] font-bold text-white">
        Q
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#111111]">Quiz Dock</span>
    </Link>
  )
}
