import { serve } from "@hono/node-server"
import { app, port } from "./app"

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})