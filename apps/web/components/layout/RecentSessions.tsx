import Link from "next/link"
import { recentSessions } from "@/lib/placeholder"

export function RecentSessions() {
  // TODO: replace placeholder with real recent sessions
  const sessions = recentSessions

  return (
    <section aria-labelledby="recent-heading" className="flex flex-col gap-[6px]">
      <h2 id="recent-heading" className="px-[10px] text-[12px] font-medium text-[#71717a]">
        Recent
      </h2>
      {sessions.length === 0 ? (
        <p className="px-[10px] text-[13px] text-[#a1a1aa]">No sessions yet</p>
      ) : (
        <ul className="flex flex-col gap-[2px]">
          {sessions.map((s) => (
            <li key={s.id}>
              <Link
                href={`/${s.kind}/${s.id}`}
                className="flex h-[32px] items-center gap-[8px] rounded-[10px] px-[10px] text-[13px] text-[#3f3f46] outline-none hover:bg-[#f0f0f0] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
              >
                <span
                  aria-hidden
                  className={s.kind === "quiz" ? "size-[6px] shrink-0 rounded-full bg-[#3b4fd8]" : "size-[6px] shrink-0 rounded-full bg-[#a1a1aa]"}
                />
                <span className="truncate">{s.title}</span>
                <span className="sr-only">({s.kind})</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
