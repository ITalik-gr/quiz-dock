# Quiz Dock

A learning project and portfolio piece. I am building an AI agent harness by hand (no agent frameworks) on the raw Anthropic SDK. The app lets a user upload a document, discuss it with an agent that answers only from the document, and take quizzes on it.

The main goal is for me to understand harnesses deeply: the agent loop, tool use, message history, human-in-the-loop, subagents. Understanding matters more than speed of delivery.

## Structure

pnpm monorepo:

- `apps/server` — Hono server, agent core, tools, prompts, CLI entry (`src/cli.ts`)
- `apps/web` — Next.js front end (see `apps/web/CLAUDE.md`)
- `packages/shared` — the contract between server and web: event types, Zod schemas for API and quiz data. Pure TS + Zod only: no `node:*`, no Anthropic SDK, no `process.env`
- `docs/` — test documents. They describe fictional libraries on purpose, so the model cannot answer from training data

## Architecture

- `agent/core.ts` is a generic loop: call model → run tools → append `tool_result` → repeat until `stop_reason !== "tool_use"`. It knows nothing about quizzes, documents, the terminal or HTTP
- Tasks (`runQuiz`, `runDiscuss`) build the system prompt and first messages and call the core
- Tools are factories (`makeX(deps)`) returning `{ name, description, input_schema, run }`. Dependencies (I/O, data) come in through closures
- The core and tools never call `console` or `readline` directly: output goes through `onEvent`, input through injected functions
- Tool input is validated with Zod; `input_schema` is generated from the same Zod schema (single source of truth)
- Tool errors go back to the model as `tool_result` with `is_error: true`, never thrown out of the loop

## Status

Done (CLI): document split into sections, discuss mode with a `readSection` tool, quiz mode, interactive `startQuiz` tool with code-graded answers, typed events.

In progress: moving to the monorepo and web.

## Plan

1. Hono server with a typed client (`hc`) used from the web app
2. Database: SQLite via Drizzle (later Cloudflare D1). Tables: documents, sessions (message history as JSON, pending tool call)
3. Discuss over HTTP: one request per user message, SSE streaming of agent events, history in the DB
4. Pausable tools: tools like `startQuiz` stop the loop, the UI collects answers, a separate endpoint resumes the loop with the matching `tool_result`
5. Ingestion agent: user gives a docs URL, the agent fetches pages, subagents summarize relevant pages in parallel
6. Portfolio: deploy, README with architecture, short demo

## How to work with me

**Do not write code unless I explicitly ask for it.** I write the code myself; that is the point of the project. Your job is to explain, guide and review.

- Explain concepts in plain words, with the "why", not only the "what"
- When I am stuck: give hints, the shape of a solution, or a small snippet (up to ~10 lines) that shows the idea, preferably on a different example than my exact task
- Point out what to think about instead of making design decisions for me
- Exception: UI markup in `apps/web`, which you may write (see `apps/web/CLAUDE.md`)

**Code review:**

- Order by importance: bugs first, then contradictions (description vs schema vs validation), then best practices, then style
- Mark small things clearly as optional
- Do not polish endlessly. If the code is correct and reasonable, say it is good enough and move on. Do not re-raise points I have already decided against
- Explain why something is a problem, so I learn the rule, not just the fix

Reply in the language I write in (usually Ukrainian). Be direct and concrete.

## Commands

```
pnpm i                          # install everything (from the root only)
pnpm dev                        # run all apps
pnpm --filter server dev        # run one app
pnpm --filter server add <pkg>  # add a dependency to one package
pnpm typecheck                  # typecheck all packages
```
