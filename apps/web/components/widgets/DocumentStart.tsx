"use client"

import { useState } from "react"
import { DocumentDropzone } from "./DocumentDropzone"
import { ModeChoice, type Mode } from "./ModeChoice"
import { UrlImport } from "./UrlImport"

export function DocumentStart() {
  const [file, setFile] = useState<File | null>(null)

  function start(mode: Mode) {
    if (!file) return
    // TODO: upload the document, create a `mode` session, navigate to it
    void mode
  }

  return (
    <>
      <section aria-label="Document" className="flex flex-col gap-[24px]">
        <DocumentDropzone file={file} onFileChange={setFile} />
        <UrlImport />
      </section>
      <ModeChoice disabled={!file} onSelect={start} />
    </>
  )
}
