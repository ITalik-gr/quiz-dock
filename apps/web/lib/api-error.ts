import type { ClientResponse } from "hono/client"

export class ApiError extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = "ApiError"
    this.code = code
  }
}

// our routes send { error: string }, zValidator sends { error: { issues: [...] } }
function readMessage(body: unknown, fallback: string): string {
  if (typeof body !== "object" || body === null || !("error" in body)) return fallback

  const { error } = body
  if (typeof error === "string") return error

  const issues = (error as { issues?: { message?: string }[] })?.issues
  return issues?.[0]?.message ?? fallback
}

export async function unwrap<R extends ClientResponse<any, any, any>>(
  request: Promise<R>
): Promise<Awaited<ReturnType<Extract<R, { ok: true }>["json"]>>> {
  const res = await request

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(readMessage(body, `Request failed (${res.status})`), res.status)
  }

  return res.json()
}
