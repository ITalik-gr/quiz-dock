import { Hono } from 'hono'
import { cors } from 'hono/cors'

export const port = process.env.HONO_PORT ? Number(process.env.HONO_PORT) : 8787

export const routes = new Hono()
  .use('/api/*', cors({ origin: process.env.WEB_ORIGIN! || '3001' }))
  .get('/health', (c) => c.json({ ok: true }))
  // .route('/documents', documentsRoutes)

export type AppType = typeof routes
export const app = new Hono().route('/api', routes)
