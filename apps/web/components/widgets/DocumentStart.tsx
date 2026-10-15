"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import { DocumentDropzone } from "./DocumentDropzone"
import { ModeChoice, type Mode } from "./ModeChoice"
import { UrlImport } from "./UrlImport"

import useAction from "@/hooks/useAction"
import { unwrap } from "@/lib/api-error"
import { api } from "@/lib/api"



export function DocumentStart() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null)

  const { run, isLoading, error } = useAction((file: File) =>
    unwrap(api.documents.$post({ form: { file } }))
  )

  async function start(mode: Mode) {
    if (!file) return

    const res = await run(file);

    if(res) {
      router.push(`/${mode}/${res.id}`)
    }
  }

  return (
    <>
      <section aria-label="Document" className="flex flex-col gap-[24px]">
        <DocumentDropzone file={file} onFileChange={setFile} />
        <UrlImport />
      </section>
      <ModeChoice disabled={!file || isLoading} onSelect={start} />
    </>
  )
}
