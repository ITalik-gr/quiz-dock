import type Anthropic from "@anthropic-ai/sdk";
import { agent, type toolType } from "./core.js";
import { SYSTEM_QUIZ_PROMPT } from "../prompts.js";

type runQuizType = {
  text: string
  numberOfQuestions: number
  askHuman: toolType
}

export async function runQuiz({ text, numberOfQuestions, askHuman } : runQuizType) {

  const messages: Anthropic.MessageParam[] = [
    {
      role: "user",
      content: `<document>\n${text}\n</document>\n\n Create ${numberOfQuestions} quiz questions about this document.`,
    },
  ];

  return await agent({ messages, system: SYSTEM_QUIZ_PROMPT, tools: [askHuman], tool_choice: { type: "auto", disable_parallel_tool_use: true } })
}