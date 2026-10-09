import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator"
import { CreateDocumentSchema } from "@quiz/shared";
import { createDocument, getDocument, getDocuments } from "../services/documents.services";

export const documentsRoutes = new Hono()
  .post('/', zValidator("form", CreateDocumentSchema), async (c) => {

    const body = c.req.valid("form")

    const text = await body.file.text();
    const fileName = body.file.name;

    try {
      const doc = await createDocument({ title: fileName, text });

      return c.json({ id: doc?.id, title: doc?.title, created: doc?.createdAt }, 201)
    } catch (error) {
      return c.json({ error, title: fileName }, 500)
    }
  })
  .get('/', async (c) => {
    try {
      const docs = await getDocuments()

      return c.json(docs, 200)
    } catch (error) {

      return c.json({ error }, 500)
    }
  })
  .get('/:id', async (c) => {
    const id = c.req.param('id');

    const document = await getDocument(id);

    if(!document.length) {
      return c.json({ error: "Document not found" }, 404);
    }

    return c.json(document, 200)
  })