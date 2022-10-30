import { Coordinates } from 'contexts/GraphContext'
import cuid from 'cuid'
import { produce } from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import {
  Group,
  DraggableBlock,
  DraggableBlockType,
  BlockIndices,
  Typebot,
} from 'models'
import { SetTypebot } from '../TypebotContext'
import { cleanUpEdgeDraft } from './edges'
import { createBlockDraft, duplicateBlockDraft } from './blocks'

export type GroupsActions = {
  createGroup: (
    props: Coordinates & {
      id: string
      block: DraggableBlock | DraggableBlockType
      indices: BlockIndices
    }
  ) => void
  updateGroup: (groupIndex: number, updates: Partial<Omit<Group, 'id'>>) => void
  duplicateGroup: (groupIndex: number) => void
  deleteGroup: (groupIndex: number) => void
}

const groupsActions = (setTypebot: SetTypebot): GroupsActions => ({
  createGroup: ({
    id,
    block,
    indices,
    ...graphCoordinates
  }: Coordinates & {
    id: string
    block: DraggableBlock | DraggableBlockType
    indices: BlockIndices
  }) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        const newGroup: Group = {
          id,
          graphCoordinates,
          title: `Group #${typebot.groups.length}`,
          blocks: [],
        }
        typebot.groups.push(newGroup)
        createBlockDraft(typebot, block, newGroup.id, indices)
      })
    ),
  updateGroup: (groupIndex: number, updates: Partial<Omit<Group, 'id'>>) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        const block = typebot.groups[groupIndex]
        typebot.groups[groupIndex] = { ...block, ...updates }
      })
    ),
  duplicateGroup: (groupIndex: number) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        const group = typebot.groups[groupIndex]
        const id = cuid()
        const newGroup: Group = {
          ...group,
          title: `${group.title} copy`,
          id,
          blocks: group.blocks.map(duplicateBlockDraft(id)),
          graphCoordinates: {
            x: group.graphCoordinates.x + 200,
            y: group.graphCoordinates.y + 100,
          },
        }
        typebot.groups.splice(groupIndex + 1, 0, newGroup)
      })
    ),
  deleteGroup: (groupIndex: number) =>
    setTypebot((typebot) =>
      produce(typebot, (typebot) => {
        deleteGroupDraft(typebot)(groupIndex)
      })
    ),
})

const deleteGroupDraft =
  (typebot: WritableDraft<Typebot>) => (groupIndex: number) => {
    cleanUpEdgeDraft(typebot, typebot.groups[groupIndex].id)
    typebot.groups.splice(groupIndex, 1)
  }

const removeEmptyGroups = (typebot: WritableDraft<Typebot>) => {
  const emptyGroupsIndices = typebot.groups.reduce<number[]>(
    (arr, group, idx) => {
      group.blocks.length === 0 && arr.push(idx)
      return arr
    },
    []
  )
  emptyGroupsIndices.forEach(deleteGroupDraft(typebot))
}

export { groupsActions, removeEmptyGroups }
