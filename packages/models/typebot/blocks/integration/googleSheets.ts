import { z } from 'zod'
import { IntegrationBlockType, blockBaseSchema } from '../shared'

export enum GoogleSheetsAction {
  GET = 'Get data from sheet',
  INSERT_ROW = 'Insert a row',
  UPDATE_ROW = 'Update a row',
}

const cellSchema = z.object({
  column: z.string().optional(),
  value: z.string().optional(),
  id: z.string(),
})

const extractingCellSchema = z.object({
  column: z.string().optional(),
  id: z.string(),
  variableId: z.string().optional(),
})

const googleSheetsOptionsBaseSchema = z.object({
  credentialsId: z.string().optional(),
  sheetId: z.string().optional(),
  spreadsheetId: z.string().optional(),
})

const googleSheetsGetOptionsSchema = googleSheetsOptionsBaseSchema.and(
  z.object({
    action: z.enum([GoogleSheetsAction.GET]),
    referenceCell: cellSchema.optional(),
    cellsToExtract: z.array(extractingCellSchema),
  })
)

const googleSheetsInsertRowOptionsSchema = googleSheetsOptionsBaseSchema.and(
  z.object({
    action: z.enum([GoogleSheetsAction.INSERT_ROW]),
    cellsToInsert: z.array(cellSchema),
  })
)

const googleSheetsUpdateRowOptionsSchema = googleSheetsOptionsBaseSchema.and(
  z.object({
    action: z.enum([GoogleSheetsAction.UPDATE_ROW]),
    cellsToUpsert: z.array(cellSchema),
    referenceCell: cellSchema.optional(),
  })
)

export const googleSheetsOptionsSchema = googleSheetsOptionsBaseSchema
  .or(googleSheetsGetOptionsSchema)
  .or(googleSheetsInsertRowOptionsSchema)
  .or(googleSheetsUpdateRowOptionsSchema)

export const googleSheetsBlockSchema = blockBaseSchema.and(
  z.object({
    type: z.enum([IntegrationBlockType.GOOGLE_SHEETS]),
    options: googleSheetsOptionsSchema,
  })
)

export const defaultGoogleSheetsOptions: GoogleSheetsOptions = {}

export type GoogleSheetsBlock = z.infer<typeof googleSheetsBlockSchema>
export type GoogleSheetsOptions = z.infer<typeof googleSheetsOptionsSchema>
export type GoogleSheetsOptionsBase = z.infer<
  typeof googleSheetsOptionsBaseSchema
>
export type GoogleSheetsGetOptions = z.infer<
  typeof googleSheetsGetOptionsSchema
>
export type GoogleSheetsInsertRowOptions = z.infer<
  typeof googleSheetsInsertRowOptionsSchema
>
export type GoogleSheetsUpdateRowOptions = z.infer<
  typeof googleSheetsUpdateRowOptionsSchema
>
export type Cell = z.infer<typeof cellSchema>
export type ExtractingCell = z.infer<typeof extractingCellSchema>
