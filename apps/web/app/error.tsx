"use client"

import { useEffect } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { ErrorState } from "@/components/widgets/ErrorState"

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <TopBar crumbs={[{ label: "Error" }]} />
      <ErrorState onRetry={retry} />
    </>
  )
}
