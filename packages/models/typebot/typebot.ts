import { z } from 'zod'
import { settingsSchema } from './settings'
import { blockSchema } from './blocks'
import { themeSchema } from './theme'
import { variableSchema } from './variable'

const groupSchema = z.object({
  id: z.string(),
  title: z.string(),
  graphCoordinates: z.object({
    x: z.number(),
    y: z.number(),
  }),
  blocks: z.array(blockSchema),
})

const sourceSchema = z.object({
  groupId: z.string(),
  blockId: z.string(),
  itemId: z.string().optional(),
})

const targetSchema = z.object({
  groupId: z.string(),
  blockId: z.string().optional(),
})

const edgeSchema = z.object({
  id: z.string(),
  from: sourceSchema,
  to: targetSchema,
})

const resultsTablePreferencesSchema = z.object({
  columnsOrder: z.array(z.string()),
  columnsVisibility: z.record(z.string(), z.boolean()),
  columnsWidth: z.record(z.string(), z.number()),
})

const typebotSchema = z.object({
  version: z.enum(['2']).optional(),
  id: z.string(),
  name: z.string(),
  groups: z.array(groupSchema),
  edges: z.array(edgeSchema),
  variables: z.array(variableSchema),
  theme: themeSchema,
  settings: settingsSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  icon: z.string().nullable(),
  publishedTypebotId: z.string().nullable(),
  folderId: z.string().nullable(),
  publicId: z.string().nullable(),
  customDomain: z.string().nullable(),
  workspaceId: z.string(),
  resultsTablePreferences: resultsTablePreferencesSchema.optional(),
  isArchived: z.boolean(),
  isClosed: z.boolean(),
})

export type Typebot = z.infer<typeof typebotSchema>
export type Target = z.infer<typeof targetSchema>
export type Source = z.infer<typeof sourceSchema>
export type Edge = z.infer<typeof edgeSchema>
export type Group = z.infer<typeof groupSchema>
export type ResultsTablePreferences = z.infer<
  typeof resultsTablePreferencesSchema
>
