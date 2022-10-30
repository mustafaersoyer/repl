import { Flex, FlexProps, useEventListener } from '@chakra-ui/react'
import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import {
  blockWidth,
  Coordinates,
  graphPositionDefaultValue,
  useGraph,
  useGroupsCoordinates,
} from 'contexts/GraphContext'
import { useBlockDnd } from 'contexts/GraphDndContext'
import { useTypebot } from 'contexts/TypebotContext/TypebotContext'
import { DraggableBlockType, PublicTypebot, Typebot } from 'models'
import { AnswersCount } from 'services/analytics'
import { useDebounce } from 'use-debounce'
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'
import GraphElements from './GraphElements'
import cuid from 'cuid'
import { headerHeight } from '../TypebotHeader'
import { useUser } from 'contexts/UserContext'
import { GraphNavigation } from 'db'
import { ZoomButtons } from './ZoomButtons'

const maxScale = 1.5
const minScale = 0.1
const zoomButtonsScaleBlock = 0.2

export const Graph = ({
  typebot,
  answersCounts,
  onUnlockProPlanClick,
  ...props
}: {
  typebot: Typebot | PublicTypebot
  answersCounts?: AnswersCount[]
  onUnlockProPlanClick?: () => void
} & FlexProps) => {
  const {
    draggedBlockType,
    setDraggedBlockType,
    draggedBlock,
    setDraggedBlock,
    draggedItem,
    setDraggedItem,
  } = useBlockDnd()
  const graphContainerRef = useRef<HTMLDivElement | null>(null)
  const editorContainerRef = useRef<HTMLDivElement | null>(null)
  const { createGroup } = useTypebot()
  const {
    setGraphPosition: setGlobalGraphPosition,
    setOpenedBlockId,
    setPreviewingEdge,
    connectingIds,
  } = useGraph()
  const { updateGroupCoordinates } = useGroupsCoordinates()
  const [graphPosition, setGraphPosition] = useState(graphPositionDefaultValue)
  const [debouncedGraphPosition] = useDebounce(graphPosition, 200)
  const transform = useMemo(
    () =>
      `translate(${graphPosition.x}px, ${graphPosition.y}px) scale(${graphPosition.scale})`,
    [graphPosition]
  )
  const { user } = useUser()

  const [autoMoveDirection, setAutoMoveDirection] = useState<
    'top' | 'right' | 'bottom' | 'left' | undefined
  >()
  useAutoMoveBoard(autoMoveDirection, setGraphPosition)

  useEffect(() => {
    editorContainerRef.current = document.getElementById(
      'editor-container'
    ) as HTMLDivElement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!graphContainerRef.current) return
    const { top, left } = graphContainerRef.current.getBoundingClientRect()
    setGlobalGraphPosition({
      x: left + debouncedGraphPosition.x,
      y: top + debouncedGraphPosition.y,
      scale: debouncedGraphPosition.scale,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedGraphPosition])

  const handleMouseWheel = (e: WheelEvent) => {
    e.preventDefault()
    const isPinchingTrackpad = e.ctrlKey
    user?.graphNavigation === GraphNavigation.MOUSE
      ? zoom(-e.deltaY * 0.001, { x: e.clientX, y: e.clientY })
      : isPinchingTrackpad
      ? zoom(-e.deltaY * 0.01, { x: e.clientX, y: e.clientY })
      : setGraphPosition({
          ...graphPosition,
          x: graphPosition.x - e.deltaX,
          y: graphPosition.y - e.deltaY,
        })
  }

  const handleMouseUp = (e: MouseEvent) => {
    if (!typebot) return
    if (draggedItem) setDraggedItem(undefined)
    if (!draggedBlock && !draggedBlockType) return

    const coordinates = projectMouse(
      { x: e.clientX, y: e.clientY },
      graphPosition
    )
    const id = cuid()
    updateGroupCoordinates(id, coordinates)
    createGroup({
      id,
      ...coordinates,
      block: draggedBlock ?? (draggedBlockType as DraggableBlockType),
      indices: { groupIndex: typebot.groups.length, blockIndex: 0 },
    })
    setDraggedBlock(undefined)
    setDraggedBlockType(undefined)
  }

  const handleCaptureMouseDown = (e: MouseEvent) => {
    const isRightClick = e.button === 2
    if (isRightClick) e.stopPropagation()
  }

  const handleClick = () => {
    setOpenedBlockId(undefined)
    setPreviewingEdge(undefined)
  }

  const onDrag = (_: DraggableEvent, draggableData: DraggableData) => {
    const { deltaX, deltaY } = draggableData
    setGraphPosition({
      ...graphPosition,
      x: graphPosition.x + deltaX,
      y: graphPosition.y + deltaY,
    })
  }

  const zoom = (delta = zoomButtonsScaleBlock, mousePosition?: Coordinates) => {
    const { x: mouseX, y } = mousePosition ?? { x: 0, y: 0 }
    const mouseY = y - headerHeight
    let scale = graphPosition.scale + delta
    if (
      (scale >= maxScale && graphPosition.scale === maxScale) ||
      (scale <= minScale && graphPosition.scale === minScale)
    )
      return
    scale = scale >= maxScale ? maxScale : scale <= minScale ? minScale : scale

    const xs = (mouseX - graphPosition.x) / graphPosition.scale
    const ys = (mouseY - graphPosition.y) / graphPosition.scale
    setGraphPosition({
      ...graphPosition,
      x: mouseX - xs * scale,
      y: mouseY - ys * scale,
      scale,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!connectingIds)
      return autoMoveDirection ? setAutoMoveDirection(undefined) : undefined
    if (e.clientX <= 50) return setAutoMoveDirection('left')
    if (e.clientY <= 50 + headerHeight) return setAutoMoveDirection('top')
    if (e.clientX >= window.innerWidth - 50)
      return setAutoMoveDirection('right')
    if (e.clientY >= window.innerHeight - 50)
      return setAutoMoveDirection('bottom')
    setAutoMoveDirection(undefined)
  }

  useEventListener('wheel', handleMouseWheel, graphContainerRef.current)
  useEventListener('mousedown', handleCaptureMouseDown, undefined, {
    capture: true,
  })
  useEventListener('mouseup', handleMouseUp, graphContainerRef.current)
  useEventListener('click', handleClick, editorContainerRef.current)
  useEventListener('mousemove', handleMouseMove)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const zoomIn = useCallback(() => zoom(zoomButtonsScaleBlock), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const zoomOut = useCallback(() => zoom(-zoomButtonsScaleBlock), [])

  return (
    <DraggableCore onDrag={onDrag} enableUserSelectHack={false}>
      <Flex ref={graphContainerRef} position="relative" {...props}>
        <ZoomButtons onZoomIn={zoomIn} onZoomOut={zoomOut} />
        <Flex
          flex="1"
          w="full"
          h="full"
          position="absolute"
          style={{
            transform,
          }}
          willChange="transform"
          transformOrigin="0px 0px 0px"
        >
          <GraphElements
            edges={typebot.edges}
            groups={typebot.groups}
            answersCounts={answersCounts}
            onUnlockProPlanClick={onUnlockProPlanClick}
          />
        </Flex>
      </Flex>
    </DraggableCore>
  )
}

const projectMouse = (
  mouseCoordinates: Coordinates,
  graphPosition: Coordinates & { scale: number }
) => {
  return {
    x:
      (mouseCoordinates.x -
        graphPosition.x -
        blockWidth / (3 / graphPosition.scale)) /
      graphPosition.scale,
    y:
      (mouseCoordinates.y -
        graphPosition.y -
        (headerHeight + 20 * graphPosition.scale)) /
      graphPosition.scale,
  }
}

const useAutoMoveBoard = (
  autoMoveDirection: 'top' | 'right' | 'bottom' | 'left' | undefined,
  setGraphPosition: React.Dispatch<
    React.SetStateAction<{
      x: number
      y: number
      scale: number
    }>
  >
) =>
  useEffect(() => {
    if (!autoMoveDirection) return
    const interval = setInterval(() => {
      setGraphPosition((prev) => ({
        ...prev,
        x:
          autoMoveDirection === 'right'
            ? prev.x - 5
            : autoMoveDirection === 'left'
            ? prev.x + 5
            : prev.x,
        y:
          autoMoveDirection === 'bottom'
            ? prev.y - 5
            : autoMoveDirection === 'top'
            ? prev.y + 5
            : prev.y,
      }))
    }, 5)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoMoveDirection])
