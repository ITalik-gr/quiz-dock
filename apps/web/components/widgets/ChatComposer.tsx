"use client"

import { useState, type FormEvent, type KeyboardEvent } from "react"
import { ArrowUp } from "lucide-react"

type ChatComposerProps = {
  onSend?: (text: string) => void
  // Agent is answering: typing is allowed, sending is not
  busy?: boolean
  disabled?: boolean
}

export function ChatComposer({ onSend, busy, disabled }: ChatComposerProps) {
  const [value, setValue] = useState("")
  const canSend = value.trim() !== "" && !busy && !disabled

  function submit(e?: FormEvent) {
    e?.preventDefault()
    if (!canSend) return
    onSend?.(value.trim())
    setValue("")
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends, Shift+Enter adds a line; skip while an IME is composing
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={submit} className="flex items-end gap-[8px] rounded-[16px] border border-[#e7e7e7] bg-white p-[8px] pl-[16px] has-[:focus-visible]:border-[#3b4fd8]/50">
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <textarea
        id="chat-input"
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder={busy ? "Agent is answering…" : "Ask about the document…"}
        className="max-h-[200px] min-h-[40px] flex-1 resize-none bg-transparent py-[9px] text-[15px] leading-[1.5] text-[#111111] outline-none placeholder:text-[#a1a1aa] field-sizing-content disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className="grid size-[40px] shrink-0 place-items-center rounded-full bg-[#111111] text-white outline-none hover:bg-[#2a2a2a] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ArrowUp className="size-[18px]" aria-hidden />
      </button>
    </form>
  )
}
