import {
  InputBlock,
  InputBlockType,
  LogicBlockType,
  PublicTypebot,
  ResultHeaderCell,
  Block,
  Typebot,
  TypebotLinkBlock,
} from 'models'
import { isInputBlock, byId, parseResultHeader, isNotDefined } from 'utils'

export const parseSampleResult =
  (
    typebot: Pick<Typebot | PublicTypebot, 'groups' | 'variables' | 'edges'>,
    linkedTypebots: (Typebot | PublicTypebot)[]
  ) =>
  async (
    currentGroupId: string
  ): Promise<Record<string, string | boolean | undefined>> => {
    const header = parseResultHeader({
      groups: [...typebot.groups, ...linkedTypebots.flatMap((t) => t.groups)],
      variables: [
        ...typebot.variables,
        ...linkedTypebots.flatMap((t) => t.variables),
      ],
    })
    const linkedInputBlocks = await extractLinkedInputBlocks(
      typebot,
      linkedTypebots
    )(currentGroupId)

    return {
      message: 'This is a sample result, it has been generated ⬇️',
      'Submitted at': new Date().toISOString(),
      ...parseGroupsResultSample(linkedInputBlocks, header),
    }
  }

const extractLinkedInputBlocks =
  (
    typebot: Pick<Typebot | PublicTypebot, 'groups' | 'variables' | 'edges'>,
    linkedTypebots: (Typebot | PublicTypebot)[]
  ) =>
  async (
    currentGroupId?: string,
    direction: 'backward' | 'forward' = 'backward'
  ): Promise<InputBlock[]> => {
    const previousLinkedTypebotBlocks = walkEdgesAndExtract(
      'linkedBot',
      direction,
      typebot
    )({
      groupId: currentGroupId,
    }) as TypebotLinkBlock[]

    const linkedBotInputs =
      previousLinkedTypebotBlocks.length > 0
        ? await Promise.all(
            previousLinkedTypebotBlocks.map((linkedBot) =>
              extractLinkedInputBlocks(
                linkedTypebots.find((t) =>
                  'typebotId' in t
                    ? t.typebotId === linkedBot.options.typebotId
                    : t.id === linkedBot.options.typebotId
                ) as Typebot | PublicTypebot,
                linkedTypebots
              )(linkedBot.options.groupId, 'forward')
            )
          )
        : []

    return (
      walkEdgesAndExtract(
        'input',
        direction,
        typebot
      )({
        groupId: currentGroupId,
      }) as InputBlock[]
    ).concat(linkedBotInputs.flatMap((l) => l))
  }

const parseGroupsResultSample = (
  inputBlocks: InputBlock[],
  header: ResultHeaderCell[]
) =>
  header.reduce<Record<string, string | boolean | undefined>>(
    (blocks, cell) => {
      const inputBlock = inputBlocks.find((block) => block.id === cell.blockId)
      if (isNotDefined(inputBlock)) {
        if (cell.variableId)
          return {
            ...blocks,
            [cell.label]: 'content',
          }
        return blocks
      }
      const value = getSampleValue(inputBlock)
      return {
        ...blocks,
        [cell.label]: value,
      }
    },
    {}
  )

const getSampleValue = (block: InputBlock) => {
  switch (block.type) {
    case InputBlockType.CHOICE:
      return block.options.isMultipleChoice
        ? block.items.map((i) => i.content).join(', ')
        : block.items[0]?.content ?? 'Item'
    case InputBlockType.DATE:
      return new Date().toUTCString()
    case InputBlockType.EMAIL:
      return 'test@email.com'
    case InputBlockType.NUMBER:
      return '20'
    case InputBlockType.PHONE:
      return '+33665566773'
    case InputBlockType.TEXT:
      return 'answer value'
    case InputBlockType.URL:
      return 'https://test.com'
  }
}

const walkEdgesAndExtract =
  (
    type: 'input' | 'linkedBot',
    direction: 'backward' | 'forward',
    typebot: Pick<Typebot | PublicTypebot, 'groups' | 'variables' | 'edges'>
  ) =>
  ({ groupId }: { groupId?: string }): Block[] => {
    const currentGroupId =
      groupId ??
      (typebot.groups.find((b) => b.blocks[0].type === 'start')?.id as string)
    const blocksInGroup = extractBlocksInGroup(
      type,
      typebot
    )({
      groupId: currentGroupId,
    })
    const otherGroupIds = getGroupIds(typebot, direction)(currentGroupId)
    return [
      ...blocksInGroup,
      ...otherGroupIds.flatMap((groupId) =>
        extractBlocksInGroup(type, typebot)({ groupId })
      ),
    ]
  }

const getGroupIds =
  (
    typebot: Pick<Typebot | PublicTypebot, 'groups' | 'variables' | 'edges'>,
    direction: 'backward' | 'forward',
    existingGroupIds?: string[]
  ) =>
  (groupId: string): string[] => {
    const groups = typebot.edges.reduce<string[]>((groupIds, edge) => {
      if (direction === 'forward')
        return (!existingGroupIds ||
          !existingGroupIds?.includes(edge.to.groupId)) &&
          edge.from.groupId === groupId
          ? [...groupIds, edge.to.groupId]
          : groupIds
      return (!existingGroupIds ||
        !existingGroupIds.includes(edge.from.groupId)) &&
        edge.to.groupId === groupId
        ? [...groupIds, edge.from.groupId]
        : groupIds
    }, [])
    const newGroups = [...(existingGroupIds ?? []), ...groups]
    return groups.concat(
      groups.flatMap(getGroupIds(typebot, direction, newGroups))
    )
  }

const extractBlocksInGroup =
  (
    type: 'input' | 'linkedBot',
    typebot: Pick<Typebot | PublicTypebot, 'groups' | 'variables' | 'edges'>
  ) =>
  ({ groupId, blockId }: { groupId: string; blockId?: string }) => {
    const currentGroup = typebot.groups.find(byId(groupId))
    if (!currentGroup) return []
    const blocks: Block[] = []
    for (const block of currentGroup.blocks) {
      if (block.id === blockId) break
      if (type === 'input' && isInputBlock(block)) blocks.push(block)
      if (type === 'linkedBot' && block.type === LogicBlockType.TYPEBOT_LINK)
        blocks.push(block)
    }
    return blocks
  }
