import * as readline from "node:readline/promises"
import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import path from "node:path";

import { makeAskHuman } from "./tools/askHuman.js";

import { runQuiz } from "./agent/quiz.js";


const { values } = parseArgs({
  options: {
    file: { type: "string", short: "f" },
    questions: { type: "string", default: "5", short: 'q' },
  },
})

if(!values.file?.length) {
  throw new Error('CLI does not receive correct props \n\n');
}

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

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

try {
  const askHuman = makeAskHuman(rl);

  const res = await runQuiz({ text, numberOfQuestions, askHuman })

  console.log('______Result______ \n\n')
  console.dir(res, { depth: null })
} finally {
  rl.close();
}

