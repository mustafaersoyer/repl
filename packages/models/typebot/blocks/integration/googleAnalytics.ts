import { z } from 'zod'
import { IntegrationBlockType, blockBaseSchema } from '../shared'

export const googleAnalyticsOptionsSchema = z.object({
  trackingId: z.string().optional(),
  category: z.string().optional(),
  action: z.string().optional(),
  label: z.string().optional(),
  value: z.number().optional(),
})

export const googleAnalyticsBlockSchema = blockBaseSchema.and(
  z.object({
    type: z.enum([IntegrationBlockType.GOOGLE_ANALYTICS]),
    options: googleAnalyticsOptionsSchema,
  })
)

export const defaultGoogleAnalyticsOptions: GoogleAnalyticsOptions = {}

export type GoogleAnalyticsBlock = z.infer<typeof googleAnalyticsBlockSchema>
export type GoogleAnalyticsOptions = z.infer<
  typeof googleAnalyticsOptionsSchema
>
