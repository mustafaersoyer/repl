import { z } from 'zod'
import {
  blockBaseSchema,
  InputBlockType,
  defaultButtonLabel,
  optionBaseSchema,
} from '../shared'

export const dateInputOptionsSchema = optionBaseSchema.and(
  z.object({
    labels: z.object({
      button: z.string(),
      from: z.string(),
      to: z.string(),
    }),
    hasTime: z.boolean(),
    isRange: z.boolean(),
  })
)

export const dateInputSchema = blockBaseSchema.and(
  z.object({
    type: z.enum([InputBlockType.DATE]),
    options: dateInputOptionsSchema,
  })
)

export const defaultDateInputOptions: DateInputOptions = {
  hasTime: false,
  isRange: false,
  labels: { button: defaultButtonLabel, from: 'From:', to: 'To:' },
}

export type DateInputBlock = z.infer<typeof dateInputSchema>
export type DateInputOptions = z.infer<typeof dateInputOptionsSchema>
