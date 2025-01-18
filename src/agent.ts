import type { AIMessage } from '../types'
import { runLLM } from './llm'
import { z } from 'zod'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { showLoader, logMessage } from './ui'
import { runTool } from './toolRunner'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('🤔')

  const history = await getMessages()

  const response = await runLLM({ messages: history, tools })
  await addMessages([response])

  logMessage(response)

  // Handle tool execution flow:
  // 1. If the LLM responds with tool_calls, it needs more information to answer
  // 2. If it responds with content instead, it has enough info to provide a final answer
  // This block handles the tool execution cycle:
  // - Takes the first tool call from the response
  // - Executes the requested tool
  // - Saves the tool's response to be used in the next LLM call
  if (response.tool_calls) {
    const toolCall = response.tool_calls[0]
    loader.update(`executing: ${toolCall.function.name} `)

    const toolResponse = await runTool(toolCall, userMessage)
    await saveToolResponse(toolCall.id, toolResponse)

    loader.update(`executed: ${toolCall.function.name} `)
  }

  // logMessage(response)
  loader.stop()
  return getMessages()
}
