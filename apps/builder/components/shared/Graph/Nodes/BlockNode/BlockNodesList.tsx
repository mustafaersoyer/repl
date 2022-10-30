import { useEventListener, Stack, Flex, Portal } from '@chakra-ui/react'
import { DraggableBlock, DraggableBlockType, Block } from 'models'
import {
  computeNearestPlaceholderIndex,
  useBlockDnd,
} from 'contexts/GraphDndContext'
import { Coordinates, useGraph } from 'contexts/GraphContext'
import { useEffect, useRef, useState } from 'react'
import { useTypebot } from 'contexts/TypebotContext'
import { BlockNode } from './BlockNode'
import { BlockNodeOverlay } from './BlockNodeOverlay'

type Props = {
  groupId: string
  blocks: Block[]
  groupIndex: number
  groupRef: React.MutableRefObject<HTMLDivElement | null>
  isStartGroup: boolean
}
export const BlockNodesList = ({
  groupId,
  blocks,
  groupIndex,
  groupRef,
  isStartGroup,
}: Props) => {
  const {
    draggedBlock,
    setDraggedBlock,
    draggedBlockType,
    mouseOverGroup,
    setDraggedBlockType,
  } = useBlockDnd()
  const { typebot, createBlock, detachBlockFromGroup } = useTypebot()
  const { isReadOnly, graphPosition } = useGraph()
  const [expandedPlaceholderIndex, setExpandedPlaceholderIndex] = useState<
    number | undefined
  >()
  const placeholderRefs = useRef<HTMLDivElement[]>([])
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })
  const [mousePositionInElement, setMousePositionInElement] = useState({
    x: 0,
    y: 0,
  })
  const isDraggingOnCurrentGroup =
    (draggedBlock || draggedBlockType) && mouseOverGroup?.id === groupId
  const showSortPlaceholders =
    !isStartGroup && (draggedBlock || draggedBlockType)

  useEffect(() => {
    if (mouseOverGroup?.id !== groupId) setExpandedPlaceholderIndex(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseOverGroup?.id])

  const handleMouseMoveGlobal = (event: MouseEvent) => {
    if (!draggedBlock || draggedBlock.groupId !== groupId) return
    const { clientX, clientY } = event
    setPosition({
      x: clientX - mousePositionInElement.x,
      y: clientY - mousePositionInElement.y,
    })
  }

  const handleMouseMoveOnGroup = (event: MouseEvent) => {
    if (!isDraggingOnCurrentGroup) return
    setExpandedPlaceholderIndex(
      computeNearestPlaceholderIndex(event.pageY, placeholderRefs)
    )
  }

  const handleMouseUpOnGroup = (e: MouseEvent) => {
    setExpandedPlaceholderIndex(undefined)
    if (!isDraggingOnCurrentGroup) return
    const blockIndex = computeNearestPlaceholderIndex(
      e.clientY,
      placeholderRefs
    )
    createBlock(
      groupId,
      (draggedBlock || draggedBlockType) as DraggableBlock | DraggableBlockType,
      {
        groupIndex,
        blockIndex,
      }
    )
    setDraggedBlock(undefined)
    setDraggedBlockType(undefined)
  }

  const handleBlockMouseDown =
    (blockIndex: number) =>
    (
      { absolute, relative }: { absolute: Coordinates; relative: Coordinates },
      block: DraggableBlock
    ) => {
      if (isReadOnly) return
      placeholderRefs.current.splice(blockIndex + 1, 1)
      detachBlockFromGroup({ groupIndex, blockIndex })
      setPosition(absolute)
      setMousePositionInElement(relative)
      setDraggedBlock(block)
    }

  const handlePushElementRef =
    (idx: number) => (elem: HTMLDivElement | null) => {
      elem && (placeholderRefs.current[idx] = elem)
    }

  useEventListener('mousemove', handleMouseMoveGlobal)
  useEventListener('mousemove', handleMouseMoveOnGroup, groupRef.current)
  useEventListener(
    'mouseup',
    handleMouseUpOnGroup,
    mouseOverGroup?.ref.current,
    {
      capture: true,
    }
  )
  return (
    <Stack
      spacing={1}
      transition="none"
      pointerEvents={isReadOnly || isStartGroup ? 'none' : 'auto'}
    >
      <Flex
        ref={handlePushElementRef(0)}
        h={
          showSortPlaceholders && expandedPlaceholderIndex === 0
            ? '50px'
            : '2px'
        }
        bgColor={'gray.300'}
        visibility={showSortPlaceholders ? 'visible' : 'hidden'}
        rounded="lg"
        transition={showSortPlaceholders ? 'height 200ms' : 'none'}
      />
      {typebot &&
        blocks.map((block, idx) => (
          <Stack key={block.id} spacing={1}>
            <BlockNode
              key={block.id}
              block={block}
              indices={{ groupIndex, blockIndex: idx }}
              isConnectable={blocks.length - 1 === idx}
              onMouseDown={handleBlockMouseDown(idx)}
            />
            <Flex
              ref={handlePushElementRef(idx + 1)}
              h={
                showSortPlaceholders && expandedPlaceholderIndex === idx + 1
                  ? '50px'
                  : '2px'
              }
              bgColor={'gray.300'}
              visibility={showSortPlaceholders ? 'visible' : 'hidden'}
              rounded="lg"
              transition={showSortPlaceholders ? 'height 200ms' : 'none'}
            />
          </Stack>
        ))}
      {draggedBlock && draggedBlock.groupId === groupId && (
        <Portal>
          <BlockNodeOverlay
            block={draggedBlock}
            indices={{ groupIndex, blockIndex: 0 }}
            pos="fixed"
            top="0"
            left="0"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(-2deg) scale(${graphPosition.scale})`,
            }}
            transformOrigin="0 0 0"
          />
        </Portal>
      )}
    </Stack>
  )
}
