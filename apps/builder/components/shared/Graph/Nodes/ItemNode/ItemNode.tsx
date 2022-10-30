import { Flex } from '@chakra-ui/react'
import { ContextMenu } from 'components/shared/ContextMenu'
import { Coordinates, useGraph } from 'contexts/GraphContext'
import { NodePosition, useDragDistance } from 'contexts/GraphDndContext'
import { useTypebot } from 'contexts/TypebotContext'
import {
  ButtonItem,
  ChoiceInputBlock,
  Item,
  ItemIndices,
  ItemType,
} from 'models'
import React, { useRef, useState } from 'react'
import { setMultipleRefs } from 'services/utils'
import { SourceEndpoint } from '../../Endpoints/SourceEndpoint'
import { ItemNodeContent } from './ItemNodeContent'
import { ItemNodeContextMenu } from './ItemNodeContextMenu'

type Props = {
  item: Item
  indices: ItemIndices
  isReadOnly: boolean
  onMouseDown?: (
    blockNodePosition: { absolute: Coordinates; relative: Coordinates },
    item: ButtonItem
  ) => void
}

export const ItemNode = ({ item, indices, isReadOnly, onMouseDown }: Props) => {
  const { typebot } = useTypebot()
  const { previewingEdge } = useGraph()
  const [isMouseOver, setIsMouseOver] = useState(false)
  const itemRef = useRef<HTMLDivElement | null>(null)
  const isPreviewing = previewingEdge?.from.itemId === item.id
  const isConnectable = !(
    typebot?.groups[indices.groupIndex].blocks[
      indices.blockIndex
    ] as ChoiceInputBlock
  )?.options?.isMultipleChoice
  const onDrag = (position: NodePosition) => {
    if (!onMouseDown || item.type !== ItemType.BUTTON) return
    onMouseDown(position, item)
  }
  useDragDistance({
    ref: itemRef,
    onDrag,
    isDisabled: !onMouseDown || item.type !== ItemType.BUTTON,
  })

  const handleMouseEnter = () => setIsMouseOver(true)
  const handleMouseLeave = () => setIsMouseOver(false)

  return (
    <ContextMenu<HTMLDivElement>
      renderMenu={() => <ItemNodeContextMenu indices={indices} />}
    >
      {(ref, isOpened) => (
        <Flex
          data-testid="item"
          pos="relative"
          ref={setMultipleRefs([ref, itemRef])}
        >
          <Flex
            align="center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            shadow="sm"
            _hover={isReadOnly ? {} : { shadow: 'md' }}
            transition="box-shadow 200ms, border-color 200ms"
            rounded="md"
            borderWidth={isOpened || isPreviewing ? '2px' : '1px'}
            borderColor={isOpened || isPreviewing ? 'blue.400' : 'gray.100'}
            margin={isOpened || isPreviewing ? '-1px' : 0}
            pointerEvents={isReadOnly ? 'none' : 'all'}
            bgColor="white"
            w="full"
          >
            <ItemNodeContent
              item={item}
              isMouseOver={isMouseOver}
              indices={indices}
            />
            {typebot && isConnectable && (
              <SourceEndpoint
                source={{
                  groupId: typebot.groups[indices.groupIndex].id,
                  blockId: item.blockId,
                  itemId: item.id,
                }}
                pos="absolute"
                right="-49px"
                pointerEvents="all"
              />
            )}
          </Flex>
        </Flex>
      )}
    </ContextMenu>
  )
}
