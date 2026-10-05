import Anthropic from "@anthropic-ai/sdk";

export const client = new Anthropic()

export type CallLLMType = {
  systemPrompt: string
  messages: Anthropic.MessageParam[]
  tools?: Anthropic.Tool[]
  model?: Anthropic.Messages.Model
  tool_choice?: Anthropic.ToolChoice
  maxTokens?: number
}

export default async function callLLM({systemPrompt, messages, maxTokens = 1024, model = 'claude-sonnet-4-6', tool_choice, tools  } : CallLLMType) {


  const response = await client.messages.create({
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: messages,
    model: model,
    ...(tools?.length ? { tools, tool_choice } : {}),
  });


  return response;
}