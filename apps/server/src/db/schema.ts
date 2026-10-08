import { sqliteTable } from "drizzle-orm/sqlite-core";


export const documents = sqliteTable("documents", (t) => ({
  id: t.text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: t.text("title").notNull(),
  text: t.text().notNull(),
  createdAt: t.integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
}))
