import type { toolType } from "../agent/core.js";

import { z } from "zod"

const QuestionSchema = z
  .object({
    text: z.string().min(1).describe("Question text, self-contained"),
    options: z.array(z.string().min(1)).length(3).describe("Exactly 3 answer options"),
    correctIndex: z.number().int().min(0).describe("Index of the correct option in options"),
  })
  .refine((q) => q.correctIndex < q.options.length, {
    message: "correctIndex must point to an existing option",
    path: ["correctIndex"],
  })

const InputSchema = z.object({
  questions: z.array(QuestionSchema).min(1).max(5)
    .describe("Questions in display order. Use the number the user asked for (max 5); default 3."),
})

type MakeStartQuizType = {
  ask: (prompt: string) => Promise<string>
  print: (text: string) => void
}

type QuizAnswerType = {
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

export function makeStartQuiz({ ask, print }: MakeStartQuizType): toolType {


  return {
    name: "startQuiz",
    description: `
      Runs an interactive multiple-choice quiz with the user and returns their results.
      Use it when the user asks to be tested, or to check their understanding after you have explained a topic and they agree to a quiz.
      Before calling, read the relevant sections with the section-reading tool: every question and every correct answer must be based on the document text, not on general knowledge.
      You write the questions yourself in the arguments. Each question must be self-contained (the user sees only the question and its options, not your previous messages), have exactly 3 options with one clearly correct answer, and test understanding of a specific fact or behavior rather than trivial wording.
      Do not reveal the questions or the answers in your text before or while calling this tool.
      The user answers all questions, then the tool returns, for each question, the user's choice and whether it was correct.
      After the result, briefly go through the mistakes using the document, and suggest what to review. Do not start another quiz unless the user asks for it.
    `,
    input_schema: z.toJSONSchema(InputSchema) as toolType['input_schema'],
    run: async (input: unknown) => {
      const parsed = InputSchema.safeParse(input);

      if (!parsed.success) {
        throw new Error(`Invalid input: ${z.prettifyError(parsed.error)}`)
      }

      const answers: QuizAnswerType[] = []

      const { questions } = parsed.data;

      for(const [i, question] of questions.entries()) {

        let userIndex: number;

        const correctAnswer = question.options[question.correctIndex];

        if(correctAnswer === undefined) {
          throw new Error('correctAnswer not found in options');
        }

        print(`Question #${i+1}: \n\n ${question.text} \n\n Options: \n\n ${question.options.map((option, iOpt) => `${iOpt+1}) ${option}`).join("\n")} > \n\n`);

        while(true) {
          const n = Number((await ask("> ")).trim());

          if(Number.isInteger(n) && n >= 1 && n <= question.options.length) {
            userIndex = n - 1;
            break;
          }

          print("Enter a number from the list");
        }

        const userTextResponse = question.options[userIndex];

        if(userTextResponse === undefined) {
          throw new Error('User response not found in options');
        }

        answers.push({
          question: question.text,
          userAnswer: userTextResponse,
          correctAnswer,
          isCorrect: userIndex === question.correctIndex
        })
      }

      return JSON.stringify(answers);
    }
  }
}