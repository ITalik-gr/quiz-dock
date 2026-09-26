import type Anthropic from "@anthropic-ai/sdk";
import { agent, type AgentEventType } from "./core.js"
import type { DocumentSection } from "../lib/parseSections.js";
import { SYSTEM_DISCUSS_PROMPT } from "../prompts.js";
import { makeReadSection } from "../tools/readSection.js";


type RunDiscussType = {
  text: string
  documentSections: DocumentSection[]
  onEvent: (event: AgentEventType) => void
  ask: (prompt: string) => Promise<string>
}

export async function runDiscuss({ text, documentSections, ask, onEvent }: RunDiscussType) {

  const emit = onEvent ?? (() => {})

  const titles = documentSections.map((item) => {
    return `ID: ${item.id}; TITLE: ${item.title}`;
  }).join("\n")


  let messages: Anthropic.MessageParam[] = [];

  const readSection = makeReadSection({ sections: documentSections });

  while(true) {
    const userInput = (await ask("\n> ")).trim();

    if(userInput === '/exit') break;

    if(!userInput) continue;

    const agentResponse = await agent({ messages: [...messages, { role: "user", content: userInput }], system: `${SYSTEM_DISCUSS_PROMPT} \n Here is the tiles: \n ${titles} \n`, onEvent: emit, tools: [readSection], tool_choice: { type: "auto", disable_parallel_tool_use: true } })

    messages = agentResponse.messages;
  }



  return messages;
}