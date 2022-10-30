import {
  InputBlockOptions,
  IntegrationBlockOptions,
  Item,
  LogicBlockOptions,
} from '.'
import { BubbleBlock, bubbleBlockSchema } from './bubble'
import { InputBlock, inputBlockSchema } from './input'
import { IntegrationBlock, integrationBlockSchema } from './integration'
import { ConditionBlock, LogicBlock, logicBlockSchema } from './logic'
import { z } from 'zod'
import {
  BubbleBlockType,
  InputBlockType,
  IntegrationBlockType,
  LogicBlockType,
  blockBaseSchema,
} from './shared'

export type DraggableBlock =
  | BubbleBlock
  | InputBlock
  | LogicBlock
  | IntegrationBlock

export type BlockType =
  | 'start'
  | BubbleBlockType
  | InputBlockType
  | LogicBlockType
  | IntegrationBlockType

export type DraggableBlockType =
  | BubbleBlockType
  | InputBlockType
  | LogicBlockType
  | IntegrationBlockType

export type BlockWithOptions =
  | InputBlock
  | Exclude<LogicBlock, ConditionBlock>
  | IntegrationBlock

export type BlockWithOptionsType =
  | InputBlockType
  | Exclude<LogicBlockType, LogicBlockType.CONDITION>
  | IntegrationBlockType

export type BlockOptions =
  | InputBlockOptions
  | LogicBlockOptions
  | IntegrationBlockOptions

export type BlockWithItems = Omit<Block, 'items'> & { items: Item[] }

export type BlockBase = z.infer<typeof blockBaseSchema>

const startBlockSchema = blockBaseSchema.and(
  z.object({
    type: z.literal('start'),
    label: z.string(),
  })
)

export type StartBlock = z.infer<typeof startBlockSchema>

export type BlockIndices = {
  groupIndex: number
  blockIndex: number
}

export const blockSchema = startBlockSchema
  .or(bubbleBlockSchema)
  .or(inputBlockSchema)
  .or(logicBlockSchema)
  .or(integrationBlockSchema)

export type Block = z.infer<typeof blockSchema>
