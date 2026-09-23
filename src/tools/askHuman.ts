import type { Interface } from "node:readline/promises"
import type { toolType } from "../agent/core.js";


export function makeAskHuman(rl: Interface): toolType {


  return {
    name: 'askHuman',
    description: `
      Shows exactly one quiz question to the user and waits for their answer.
      Call it once per question and wait for the result before asking the next one; never put several questions in one call.
      The question must be self-contained: the user sees only this text, so include answer options (if any) inside it.
      Returns the user's answer verbatim. It may be empty, short, or wrong — evaluate it yourself.
      Do not use this tool to give feedback or explanations; write those as normal text.
      In the “answer” field, enter the correct answer exactly as it appears in the question itself.
    `,
    input_schema: {
      "type": "object",
      "properties": {
        "question": {
          "type": "string",
          "description": "The quiz question to show the user"
        },
        "answer": {
          "type": "string",
          "description": "Correct answer for quiz question"
        }
      },
      "required": ["question", "answer"]
    },
    run: async (input: unknown) => {
      if (typeof input !== "object" || input === null || !("question" in input) || typeof input.question !== "string" || !("answer" in input) || typeof input.answer !== "string" || !input.question.trim()) {
        throw new Error('Invalid input: expected { question: string }')
      }

      const question = rl.question(`${input.question} > \n\n`);

      console.log(`Correct Answer: ${input.answer}`)

      return question;
    }
  }
}