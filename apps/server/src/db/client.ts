import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';

const rawUrl = process.env.DATABASE_URL || './data/quiz.db'
const cleanUrl = rawUrl.replace(/^file:/, '');
const absolutePath = path.resolve(process.cwd(), cleanUrl);

console.log(`[DB] Connecting to database at: ${absolutePath}`);

const sqlite = new Database(absolutePath);

export const db = drizzle(sqlite, { schema });
