import { eq, getTableColumns } from "drizzle-orm"
import { db } from "../db/client"
import { documents } from "../db/schema"

type CreateDocumentType = {
  title: string
  text: string
}

export const createDocument = async ({ title, text } : CreateDocumentType) => {

  const [row] = await db.insert(documents).values({ title, text }).returning()

  return row;
}

export const getDocuments = async () => {

  const { text, ...documentColumns } = getTableColumns(documents);

  return await db.select(documentColumns).from(documents);
}

export const getDocument = async (id: string) => {
  return await db.select().from(documents).where(eq(documents.id, id))
}