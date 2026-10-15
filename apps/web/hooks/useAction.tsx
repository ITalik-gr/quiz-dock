import { useState } from "react"
import { ApiError } from "@/lib/api-error"

export type ActionError = {
  text: string
  code: number | null
}

export default function useAction<Args extends unknown[], T>(
  action: (...args: Args) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ActionError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function run(...args: Args): Promise<T | null> {
    if (isLoading) return null

    setIsLoading(true)
    setError(null)

    try {
      const result = await action(...args)
      setData(result)
      return result
    } catch (e) {
      if (e instanceof ApiError) {
        setError({ text: e.message, code: e.code })
      } else {
        setError({ text: "Network error, try again", code: null })
      }
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { run, data, error, isLoading }
}
