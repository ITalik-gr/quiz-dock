import { z } from "zod"

const ALLOWED_FILE_TYPES: string[] = ["text/plain", "text/markdown", "application/pdf"];
const MAX_FILE_SIZE: number = 20_000_000;

// export const CreateDocumentSchema = z.object({
//   file: z.custom<File>((val) => val instanceof Blob)
//     .refine((f) => f.size > 0, 'Empty  file')
//     .refine((f) => f.size <= MAX_FILE_SIZE, 'Max 20 MB')
//     .refine((f) => ALLOWED_FILE_TYPES.includes(f.type), 'TXT or PDF only')
// });

export const CreateDocumentSchema = z.object({
  file: z.file().min(1).max(MAX_FILE_SIZE, 'Max file size is 20MB').mime(ALLOWED_FILE_TYPES, "TXT, PDF, MD only")
})

export type CreateDocument = z.infer<typeof CreateDocumentSchema>

export const DocumentSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
})
export type DocumentSummary = z.infer<typeof DocumentSummarySchema>