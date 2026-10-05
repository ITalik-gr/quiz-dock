import * as readline from "node:readline/promises"
import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import path from "node:path";

import { makeAskHuman } from "./tools/askHuman.js";

import { runQuiz } from "./agent/quiz.js";
import { runDiscuss } from "./agent/discuss.js";
import { parseSections } from "./lib/parseSections.js";
import type { AgentEventType } from "./agent/core.js";

const { values } = parseArgs({
  options: {
    file: { type: "string", short: "f" },
    questions: { type: "string", default: "5", short: 'q' },
    discuss: {type: "boolean", default: false, short: 'd'},
  },
})


if(!values.file?.length) {
  throw new Error('CLI does not receive correct props \n\n');
}

// TODO: check if number valid (minus, NaN)
const numberOfQuestions = Number(values.questions);

const filePath = path.resolve(process.cwd(), values.file);

let text: string = '';

try {
  text = await readFile(filePath, 'utf-8');

  console.log('Reading file... \n\n');

} catch (error) {
  throw new Error(`File ${values.file} does not exist \n\n`, { cause: error })
}

if(!text.trim().length) {
  throw new Error('Your file is empty \n');
} 

const sections = parseSections(text)

const event = (event: AgentEventType) => {
  switch (event.type) {
    case 'text':
      console.log(event.text);
      break;
    case 'tool_call': 
      console.dir(`Event ${event.name} was called. Input: ${JSON.stringify(event.input)}`);
      break;
    case 'tool_result':
      if(event.isError) {
        console.log(`Tool ${event.name} respond with error: ${event.result}`)
      } else {
        console.log(`Tool "${event.name}" respond: ${event.result}`)
      }
      break;
    case 'done': 
      console.log(`Model finished work. Stop reasoning: ${event.stopReasoning} \n Tokens usage: \n Input: ${event.usage.input} \n Output: ${event.usage.output}`)
      break;
    default:
      console.log('Unsupported event type')
      break;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

if(values.discuss) {

  try {

    const response = await runDiscuss({ text, ask: (prompt: string) => rl.question(prompt), onEvent: event, documentSections: sections });

    console.log('Discuss Result (Messages): ')
    console.dir(response, { depth: null })
  } finally {
    rl.close()
  }

} else {
  try {
    const askHuman = makeAskHuman(rl);

    const res = await runQuiz({ text, numberOfQuestions, askHuman, onEvent: event})

    console.log('______Result______ \n\n')
    console.dir(res, { depth: null })
  } finally {
    rl.close();
  }
}