import type { ToolFn } from '../../types'
import { openai } from '../ai'
import { z } from 'zod'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z
    .object({
      prompt: z
        .string()
        .describe(
          "prompt for the image. Be sure to consider the user's original message when making the prompt. If you are unsure, then ask the user to provide more details. Taking a photo is the same thing as generating an Images."
        ),
    })
    .describe('Generates an image and returns the url of the image.'),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  })

  const imageUrl = response.data[0].url!

  return imageUrl
}
