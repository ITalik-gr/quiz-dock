import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator"
import { CreateDocumentSchema } from "@quiz/shared";
import { createDocument, getDocument, getDocuments } from "../services/documents.services";

export const documentsRoutes = new Hono()
  .post('/', zValidator("form", CreateDocumentSchema), async (c) => {

    const body = c.req.valid("form")

    const text = (await body.file.text()).trim();
    if(text.length === 0) {
      return c.json({ error: 'File is empty' }, 400);
    }

    const fileName = body.file.name;

    const doc = await createDocument({ title: fileName, text });

    return c.json({ id: doc?.id, title: doc?.title, createdAt: doc?.createdAt }, 201)
  })
  .get('/', async (c) => {
    const docs = await getDocuments()

    return c.json(docs, 200)
  })
  .get('/:id', async (c) => {
    const id = c.req.param('id');

    const document = await getDocument(id);

    if(!document) {
      return c.json({ error: "Document not found" }, 404);
    }

    return c.json(document, 200)
  })