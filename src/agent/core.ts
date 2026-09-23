import Anthropic from "@anthropic-ai/sdk"
import callLLM from "../lib/callLLM.js"


type agentType = {
  system: string
  messages: Anthropic.MessageParam[]
  maxSteps?: number
  model?: Anthropic.Messages.Model 
  tools?: toolType[]
  tool_choice?: Anthropic.ToolChoice
}

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


export async function agent({ system, messages, model = 'claude-sonnet-4-6', maxSteps = 10, tools, tool_choice } : agentType): Promise<{ text: string; messages: Anthropic.MessageParam[]}> {

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
        console.log(block.text)
      }
    }


    if(response.stop_reason !== 'tool_use') {
    const finalText = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")

      console.log(`Stop reasoning: ${response.stop_reason}`);

      if(response.stop_reason === 'end_turn') {
        console.log(`Tokens. \n\n Input tokens: ${inputTokens}; \n Output tokens: ${outputTokens} \n\n`)
      }

      return { text: finalText, messages: history };
    }


    // tool calling
    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {

      if(block.type === 'tool_use') {
        const toolToUse = tools?.find((item) => item.name === block.name);

        if(!toolToUse) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: 'Unknown tool',
            is_error: true
          });

          continue;
        }

        try {
          const userAnswer = await toolToUse.run(block.input);

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: userAnswer
          })
        } catch (error) {
          const msg = error instanceof Error ? error.message : String(error)

          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: `Error from tool: ${msg}`,
            is_error: true
          })
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