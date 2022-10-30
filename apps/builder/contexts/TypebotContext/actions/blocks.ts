import {
  Block,
  Typebot,
  DraggableBlock,
  DraggableBlockType,
  BlockIndices,
} from 'models'
import { parseNewBlock } from 'services/typebots/typebots'
import { removeEmptyGroups } from './groups'
import { WritableDraft } from 'immer/dist/types/types-external'
import { SetTypebot } from '../TypebotContext'
import produce from 'immer'
import { cleanUpEdgeDraft, deleteEdgeDraft } from './edges'
import cuid from 'cuid'
import { byId, isWebhookBlock, blockHasItems } from 'utils'
import { duplicateItemDraft } from './items'

export type BlocksActions = {
  createBlock: (
    groupId: string,
    block: DraggableBlock | DraggableBlockType,
    indices: BlockIndices
  ) => void
  updateBlock: (
    indices: BlockIndices,
    updates: Partial<Omit<Block, 'id' | 'type'>>
  ) => void
  duplicateBlock: (indices: BlockIndices) => void
  detachBlockFromGroup: (indices: BlockIndices) => void
  deleteBlock: (indices: BlockIndices) => void
}

const blocksAction = (setTypebot: SetTypebot): BlocksActions => ({
  createBlock: (
    groupId: string,
    block: DraggableBlock | DraggableBlockType,
    indices: BlockIndices
  ) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        createBlockDraft(typebot, block, groupId, indices)
      })
    ),
  updateBlock: (
    { groupIndex, blockIndex }: BlockIndices,
    updates: Partial<Omit<Block, 'id' | 'type'>>
  ) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        const block = typebot.groups[groupIndex].blocks[blockIndex]
        typebot.groups[groupIndex].blocks[blockIndex] = { ...block, ...updates }
      })
    ),
  duplicateBlock: ({ groupIndex, blockIndex }: BlockIndices) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        const block = { ...typebot.groups[groupIndex].blocks[blockIndex] }
        const newBlock = duplicateBlockDraft(block.groupId)(block)
        typebot.groups[groupIndex].blocks.splice(blockIndex + 1, 0, newBlock)
      })
    ),
  detachBlockFromGroup: (indices: BlockIndices) =>
    setTypebot((typebot) => produce(typebot, removeBlockFromGroup(indices))),
  deleteBlock: ({ groupIndex, blockIndex }: BlockIndices) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        const removingBlock = typebot.groups[groupIndex].blocks[blockIndex]
        removeBlockFromGroup({ groupIndex, blockIndex })(typebot)
        cleanUpEdgeDraft(typebot, removingBlock.id)
        removeEmptyGroups(typebot)
      })
    ),
})

const removeBlockFromGroup =
  ({ groupIndex, blockIndex }: BlockIndices) =>
  (typebot: WritableDraft<Typebot>) => {
    typebot.groups[groupIndex].blocks.splice(blockIndex, 1)
  }

const createBlockDraft = (
  typebot: WritableDraft<Typebot>,
  block: DraggableBlock | DraggableBlockType,
  groupId: string,
  { groupIndex, blockIndex }: BlockIndices
) => {
  const blocks = typebot.groups[groupIndex].blocks
  if (
    blockIndex === blocks.length &&
    blockIndex > 0 &&
    blocks[blockIndex - 1].outgoingEdgeId
  )
    deleteEdgeDraft(typebot, blocks[blockIndex - 1].outgoingEdgeId as string)
  typeof block === 'string'
    ? createNewBlock(typebot, block, groupId, { groupIndex, blockIndex })
    : moveBlockToGroup(typebot, block, groupId, { groupIndex, blockIndex })
  removeEmptyGroups(typebot)
}

const createNewBlock = async (
  typebot: WritableDraft<Typebot>,
  type: DraggableBlockType,
  groupId: string,
  { groupIndex, blockIndex }: BlockIndices
) => {
  const newBlock = parseNewBlock(type, groupId)
  typebot.groups[groupIndex].blocks.splice(blockIndex ?? 0, 0, newBlock)
}

const moveBlockToGroup = (
  typebot: WritableDraft<Typebot>,
  block: DraggableBlock,
  groupId: string,
  { groupIndex, blockIndex }: BlockIndices
) => {
  const newBlock = { ...block, groupId }
  const items = blockHasItems(block) ? block.items : []
  items.forEach((item) => {
    const edgeIndex = typebot.edges.findIndex(byId(item.outgoingEdgeId))
    if (edgeIndex === -1) return
    typebot.edges[edgeIndex].from.groupId = groupId
  })
  if (block.outgoingEdgeId) {
    if (typebot.groups[groupIndex].blocks.length > blockIndex ?? 0) {
      deleteEdgeDraft(typebot, block.outgoingEdgeId)
      newBlock.outgoingEdgeId = undefined
    } else {
      const edgeIndex = typebot.edges.findIndex(byId(block.outgoingEdgeId))
      edgeIndex !== -1
        ? (typebot.edges[edgeIndex].from.groupId = groupId)
        : (newBlock.outgoingEdgeId = undefined)
    }
  }
  typebot.groups[groupIndex].blocks.splice(blockIndex ?? 0, 0, newBlock)
}

const duplicateBlockDraft =
  (groupId: string) =>
  (block: Block): Block => {
    const blockId = cuid()
    if (blockHasItems(block))
      return {
        ...block,
        groupId,
        id: blockId,
        items: block.items.map(duplicateItemDraft(blockId)),
        outgoingEdgeId: undefined,
      } as Block
    if (isWebhookBlock(block))
      return {
        ...block,
        groupId,
        id: blockId,
        webhookId: cuid(),
        outgoingEdgeId: undefined,
      }
    return {
      ...block,
      groupId,
      id: blockId,
      outgoingEdgeId: undefined,
    }
  }

export { blocksAction, createBlockDraft, duplicateBlockDraft }
