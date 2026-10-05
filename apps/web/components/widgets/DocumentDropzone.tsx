"use client"

import { useState, type ChangeEvent, type DragEvent } from "react"
import { FileText, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

const EXTENSIONS = [".md", ".markdown", ".txt", ".pdf"]

type DocumentDropzoneProps = {
  file: File | null
  onFileChange: (file: File | null) => void
  error?: string
}

export function DocumentDropzone({ file, onFileChange, error }: DocumentDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const [typeError, setTypeError] = useState<string>()
  const shownError = error ?? typeError

  function pick(picked: File | undefined) {
    if (!picked) return
    // `accept` only filters the file dialog, dropped files need a check too
    if (!EXTENSIONS.some((ext) => picked.name.toLowerCase().endsWith(ext))) {
      setTypeError("Only Markdown, TXT or PDF files are supported.")
      return
    }
    setTypeError(undefined)
    onFileChange(picked)
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault()
    setDragging(true)
  }

  function onDragLeave(e: DragEvent) {
    // dragleave also fires when moving over children
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    pick(e.dataTransfer.files[0])
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    pick(e.target.files?.[0])
    // Allow picking the same file again after removing it
    e.target.value = ""
  }

  if (file) {
    return (
      <div className="flex items-center gap-[14px] rounded-[16px] border border-[#e7e7e7] bg-white p-[16px] | sm:p-[20px]">
        <span className="grid size-[44px] shrink-0 place-items-center rounded-[12px] bg-[#3b4fd8]/10 text-[#3b4fd8]">
          <FileText className="size-[20px]" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-[15px] font-medium text-[#111111]">{file.name}</p>
          <p className="text-[13px] text-[#71717a]">{formatSize(file.size)} · Ready</p>
        </div>
        <button
          type="button"
          onClick={() => onFileChange(null)}
          aria-label="Remove document"
          className="grid size-[32px] place-items-center rounded-full text-[#71717a] outline-none hover:bg-[#f4f4f5] hover:text-[#111111] focus-visible:ring-[3px] focus-visible:ring-[#3b4fd8]/40"
        >
          <X className="size-[16px]" aria-hidden />
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[8px]">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center gap-[16px] rounded-[16px] border border-dashed border-[#d4d4d8] bg-[#fafafa] px-[20px] py-[40px] text-center transition-colors | sm:py-[56px]",
          dragging && "border-[#3b4fd8] bg-[#3b4fd8]/5",
          shownError && "border-[#dc2626]/60",
        )}
      >
        <span className="grid size-[48px] place-items-center rounded-full border border-[#e7e7e7] bg-white text-[#3f3f46]">
          <Upload className="size-[20px]" aria-hidden />
        </span>
        <div className="flex flex-col gap-[4px]">
          <p className="text-[16px] font-medium text-[#111111]">{dragging ? "Drop to upload" : "Drop a document here"}</p>
          <p className="text-[14px] text-[#71717a]">Markdown, TXT or PDF</p>
        </div>
        <label className="inline-flex h-[40px] cursor-pointer items-center rounded-full border border-[#e7e7e7] bg-white px-[18px] text-[14px] font-medium text-[#111111] hover:bg-[#f7f7f7] has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-[#3b4fd8]/40">
          Browse files
          <input type="file" accept={EXTENSIONS.join(",")} onChange={onInputChange} className="sr-only" />
        </label>
      </div>
      {shownError && (
        <p role="alert" className="text-[13px] text-[#dc2626]">
          {shownError}
        </p>
      )}
    </div>
  )
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
