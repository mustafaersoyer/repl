import { blockBaseSchema, BubbleBlockType } from '../shared'
import { z } from 'zod'

export const embedBubbleContentSchema = z.object({
  url: z.string().optional(),
  height: z.number(),
})

export const embedBubbleBlockSchema = blockBaseSchema.and(
  z.object({
    type: z.enum([BubbleBlockType.EMBED]),
    content: embedBubbleContentSchema,
  })
)

export const defaultEmbedBubbleContent: EmbedBubbleContent = { height: 400 }

export type EmbedBubbleBlock = z.infer<typeof embedBubbleBlockSchema>
export type EmbedBubbleContent = z.infer<typeof embedBubbleContentSchema>
