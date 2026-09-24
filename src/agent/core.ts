import Anthropic from "@anthropic-ai/sdk"
import callLLM from "../lib/callLLM.js"


type agentType = {
  system: string
  messages: Anthropic.MessageParam[]
  maxSteps?: number
  model?: Anthropic.Messages.Model 
  tools?: toolType[]
  tool_choice?: Anthropic.ToolChoice
  onEvent?: (event: AgentEventType) => void
}

export type AgentEventType = 
  | { type: "text"; text: string }
  | { type: "tool_call"; name: string; input: unknown }
  | { type: "tool_result"; name: string; result: string; isError: boolean }
  | { type: "done"; stopReasoning: string | null; usage: { input: number; output: number }}

export type toolType = {
  name: string
  description: string
  input_schema: {
    type: "object"
    properties: Record<string, unknown>
    required?: string[]
  }
  run: (input: unknown) => Promise<string>
}


export async function agent({ system, messages, model = 'claude-sonnet-4-6', maxSteps = 10, tools, tool_choice, onEvent } : agentType): Promise<{ text: string; messages: Anthropic.MessageParam[]}> {

  const emit = onEvent ?? (() => {})

  const history = [...messages];

  const toolDefs = tools?.map(({ run, ...def }) => def)

  let inputTokens: number = 0;
  let outputTokens: number = 0;

  for(let i = 0; maxSteps > i; i++) {
    const response = await callLLM({
      systemPrompt: system,
      messages: history,
      model,
      ...((toolDefs?.length && tool_choice)? { tools: toolDefs, tool_choice } : {}),
    });

    // Assistant answer push in history
    history.push({
      role: 'assistant',
      content: response.content,
    })

    inputTokens += response.usage.input_tokens;
    outputTokens += response.usage.output_tokens;
    

    // show all text blocks
    for (const block of response.content) {
      if(block.type === 'text') {
        emit({ type: "text", text: block.text })
      }
    }


    if(response.stop_reason !== 'tool_use') {
    const finalText = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")

      emit({ type: "done", stopReasoning: response.stop_reason, usage: { input: inputTokens, output: outputTokens } })

      return { text: finalText, messages: history };
    }


    // tool calling
    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {

      if(block.type === 'tool_use') {
        const toolToUse = tools?.find((item) => item.name === block.name);

        emit({ type: "tool_call", name: block.name, input: block.input})

        if(!toolToUse) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: 'Unknown tool',
            is_error: true
          });

          emit({ type: "tool_result", name: block.name, result: 'Unknown tool', isError: true})

          continue;
        }

        try {
          const userAnswer = await toolToUse.run(block.input);

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: userAnswer
          })

          emit({ type: "tool_result", name: block.name, result: userAnswer, isError: false})

        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error)

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: `Error from tool: ${msg}`,
            is_error: true
          })

          emit({ type: "tool_result", name: block.name, result: `Error from tool: ${msg}`, isError: true})
        }
      }
    }

    // push tool result in main history
    history.push({
      role: 'user',
      content: toolResults,
    })
    
  }


  throw new Error('Agent reach maximum steps')
}