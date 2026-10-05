"use client"

import { useEffect, useRef, useState } from "react"
import type { ChatMessage } from "@/lib/placeholder"
import { AssistantMessage } from "./AssistantMessage"
import { ChatComposer } from "./ChatComposer"
import { ChatEmpty } from "./ChatEmpty"
import { UserMessage } from "./UserMessage"

type DiscussionChatProps = {
  documentName: string
  initialMessages: ChatMessage[]
}

export function DiscussionChat({ documentName, initialMessages }: DiscussionChatProps) {
  const [messages, setMessages] = useState(initialMessages)
  const endRef = useRef<HTMLDivElement>(null)
  const last = messages.at(-1)
  const busy = last?.role === "assistant" && last.streaming === true

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [messages.length])

  function send(text: string) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text }])
    // TODO: send to the agent and stream the reply into `messages`
  }

  function submitQuiz(messageId: string, partIndex: number, answers: number[]) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.role === "assistant"
          ? { ...m, parts: m.parts.map((p, i) => (i === partIndex && p.type === "quiz" ? { ...p, answers } : p)) }
          : m,
      ),
    )
    // TODO: resume the agent with the answers as the startQuiz tool_result
  }

  return (
    <>
      <section aria-label="Conversation" aria-live="polite" className="flex flex-1 flex-col gap-[28px] py-[28px]">
        {messages.length === 0 ? (
          <ChatEmpty documentName={documentName} onPick={send} />
        ) : (
          messages.map((m) =>
            m.role === "user" ? (
              <UserMessage key={m.id} text={m.text} />
            ) : (
              <AssistantMessage
                key={m.id}
                id={m.id}
                parts={m.parts}
                streaming={m.streaming}
                onQuizSubmit={(partIndex, answers) => submitQuiz(m.id, partIndex, answers)}
              />
            ),
          )
        )}
        {/* Scroll margin keeps the last message above the sticky composer */}
        <div ref={endRef} className="scroll-mb-[140px]" />
      </section>

      <div className="sticky bottom-0 bg-white pt-[8px] pb-[16px] | sm:pb-[24px]">
        <ChatComposer onSend={send} busy={busy} />
        <p className="pt-[8px] text-center text-[12px] text-[#a1a1aa]">The agent answers only from the document.</p>
      </div>
    </>
  )
}
