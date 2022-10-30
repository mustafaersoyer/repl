import { z } from 'zod'
import { LogicBlockType, blockBaseSchema } from '../shared'

export const typebotLinkOptionsSchema = z.object({
  typebotId: z.string().optional(),
  groupId: z.string().optional(),
})

export const typebotLinkBlockSchema = blockBaseSchema.and(
  z.object({
    type: z.enum([LogicBlockType.TYPEBOT_LINK]),
    options: typebotLinkOptionsSchema,
  })
)

export const defaultTypebotLinkOptions: TypebotLinkOptions = {}

export type TypebotLinkBlock = z.infer<typeof typebotLinkBlockSchema>
export type TypebotLinkOptions = z.infer<typeof typebotLinkOptionsSchema>
