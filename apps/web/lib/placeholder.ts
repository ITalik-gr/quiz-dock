// Static data for the markup. Replace with real data from the API.

export type RecentSession = {
  id: string
  kind: "discuss" | "quiz"
  title: string
}

export const recentSessions: RecentSession[] = [
  { id: "d1", kind: "discuss", title: "Lumen Router — caching" },
  { id: "q1", kind: "quiz", title: "Lumen Router basics" },
  { id: "d2", kind: "discuss", title: "Brindle ORM migrations" },
]

export type QuizQuestion = {
  text: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export type ChatPart =
  | { type: "text"; text: string }
  | { type: "tool"; tool: "readSection" | "startQuiz"; label: string; status: "running" | "done" | "error" }
  | { type: "quiz"; questions: QuizQuestion[]; answers?: number[] }

export type ChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; parts: ChatPart[]; streaming?: boolean }

const lumenQuestions: QuizQuestion[] = [
  {
    text: "Which option controls how long Lumen Router keeps a cached route?",
    options: ["cache.ttl", "router.expire", "lumen.keepAlive"],
    correctIndex: 0,
    explanation: "Section “Caching” says routes stay cached for cache.ttl seconds (default 60).",
  },
  {
    text: "What happens when two routes match the same path?",
    options: ["The first registered wins", "The more specific one wins", "Lumen throws at startup"],
    correctIndex: 1,
    explanation: "Section “Matching” ranks static segments above params, so the more specific route wins.",
  },
  {
    text: "Where are route guards executed?",
    options: ["Before the loader", "After the loader", "Only on the server"],
    correctIndex: 0,
    explanation: "Section “Guards” runs guards before loaders so a failed guard skips data loading.",
  },
]

export const discussion = {
  id: "d1",
  title: "Lumen Router — caching",
  document: { name: "lumen-router.md", sections: 12 },
}

export const chatMessages: ChatMessage[] = [
  { id: "m1", role: "user", text: "How does caching work in Lumen Router?" },
  {
    id: "m2",
    role: "assistant",
    parts: [
      { type: "tool", tool: "readSection", label: "Reading section: Caching", status: "done" },
      {
        type: "text",
        text: "Lumen Router caches resolved routes in memory. Each entry lives for cache.ttl seconds (60 by default). You can opt a route out with cache: false in its definition.",
      },
    ],
  },
  { id: "m3", role: "user", text: "Quiz me on this, 3 questions" },
  {
    id: "m4",
    role: "assistant",
    parts: [
      { type: "tool", tool: "readSection", label: "Reading section: Matching", status: "done" },
      { type: "tool", tool: "startQuiz", label: "Starting quiz", status: "done" },
      { type: "quiz", questions: lumenQuestions, answers: [0, 2, 0] },
      { type: "text", text: "2 of 3 correct. Matching prefers the more specific route, not the first registered one." },
    ],
  },
  { id: "m5", role: "user", text: "And what about guards?" },
  {
    id: "m6",
    role: "assistant",
    streaming: true,
    parts: [
      { type: "tool", tool: "readSection", label: "Reading section: Guards", status: "running" },
    ],
  },
]

export const quiz = {
  id: "q1",
  title: "Lumen Router basics",
  document: { name: "lumen-router.md" },
  questions: lumenQuestions,
}

export type DiscussionListItem = {
  id: string
  title: string
  document: string
  messages: number
  updatedAt: string
}

export const discussions: DiscussionListItem[] = [
  { id: "d1", title: "Lumen Router — caching", document: "lumen-router.md", messages: 6, updatedAt: "2 hours ago" },
  { id: "d2", title: "Brindle ORM migrations", document: "brindle-orm.md", messages: 14, updatedAt: "Yesterday" },
  { id: "d3", title: "Quillstack build pipeline", document: "quillstack.pdf", messages: 3, updatedAt: "Oct 1" },
]

export type QuizListItem = {
  id: string
  title: string
  document: string
  score?: { correct: number; total: number }
  updatedAt: string
}

export const quizzes: QuizListItem[] = [
  { id: "q1", title: "Lumen Router basics", document: "lumen-router.md", score: { correct: 2, total: 3 }, updatedAt: "2 hours ago" },
  { id: "q2", title: "Brindle ORM relations", document: "brindle-orm.md", score: { correct: 5, total: 5 }, updatedAt: "Yesterday" },
  { id: "q3", title: "Quillstack plugins", document: "quillstack.pdf", updatedAt: "Oct 1" },
]
