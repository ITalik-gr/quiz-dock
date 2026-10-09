import { z } from "zod"

// export const CreateDocumentSchema = z.object({
//   title: z.string().trim().min(1).max(200),
//   text: z.string().trim().min(1).max(200_000),
// })

export const CreateDocumentSchema = z.object({
  file: z.custom<File>((val) => val instanceof Blob),
});

export type CreateDocument = z.infer<typeof CreateDocumentSchema>

export const DocumentSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
})
export type DocumentSummary = z.infer<typeof DocumentSummarySchema>