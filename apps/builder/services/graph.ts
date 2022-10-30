import { Edge, IdMap } from 'models'
import { AnchorsPositionProps } from 'components/shared/Graph/Edges/Edge'
import {
  stubLength,
  blockWidth,
  blockAnchorsOffset,
  Endpoint,
  Coordinates,
} from 'contexts/GraphContext'
import { roundCorners } from 'svg-round-corners'

const roundSize = 20

export const computeDropOffPath = (
  sourcePosition: Coordinates,
  sourceTop: number
) => {
  const sourceCoord = computeSourceCoordinates(sourcePosition, sourceTop)
  const segments = computeTwoSegments(sourceCoord, {
    x: sourceCoord.x + 20,
    y: sourceCoord.y + 80,
  })
  return roundCorners(
    `M${sourceCoord.x},${sourceCoord.y} ${segments}`,
    roundSize
  ).path
}

export const computeSourceCoordinates = (
  sourcePosition: Coordinates,
  sourceTop: number
) => ({
  x: sourcePosition.x + blockWidth,
  y: sourceTop,
})

const getSegments = ({
  sourcePosition,
  targetPosition,
  sourceType,
  totalSegments,
}: AnchorsPositionProps) => {
  switch (totalSegments) {
    case 2:
      return computeTwoSegments(sourcePosition, targetPosition)
    case 3:
      return computeThreeSegments(sourcePosition, targetPosition, sourceType)
    case 4:
      return computeFourSegments(sourcePosition, targetPosition, sourceType)
    default:
      return computeFiveSegments(sourcePosition, targetPosition, sourceType)
  }
}

const computeTwoSegments = (
  sourcePosition: Coordinates,
  targetPosition: Coordinates
) => {
  const segments = []
  segments.push(`L${targetPosition.x},${sourcePosition.y}`)
  segments.push(`L${targetPosition.x},${targetPosition.y}`)
  return segments.join(' ')
}

const computeThreeSegments = (
  sourcePosition: Coordinates,
  targetPosition: Coordinates,
  sourceType: 'right' | 'left'
) => {
  const segments = []
  const firstSegmentX =
    sourceType === 'right'
      ? sourcePosition.x + (targetPosition.x - sourcePosition.x) / 2
      : sourcePosition.x - (sourcePosition.x - targetPosition.x) / 2
  segments.push(`L${firstSegmentX},${sourcePosition.y}`)
  segments.push(`L${firstSegmentX},${targetPosition.y}`)
  segments.push(`L${targetPosition.x},${targetPosition.y}`)
  return segments.join(' ')
}

const computeFourSegments = (
  sourcePosition: Coordinates,
  targetPosition: Coordinates,
  sourceType: 'right' | 'left'
) => {
  const segments = []
  const firstSegmentX =
    sourcePosition.x + (sourceType === 'right' ? stubLength : -stubLength)
  segments.push(`L${firstSegmentX},${sourcePosition.y}`)
  const secondSegmentY =
    sourcePosition.y + (targetPosition.y - sourcePosition.y) / 2
  segments.push(`L${firstSegmentX},${secondSegmentY}`)

  segments.push(`L${targetPosition.x},${secondSegmentY}`)

  segments.push(`L${targetPosition.x},${targetPosition.y}`)
  return segments.join(' ')
}

const computeFiveSegments = (
  sourcePosition: Coordinates,
  targetPosition: Coordinates,
  sourceType: 'right' | 'left'
) => {
  const segments = []
  const firstSegmentX =
    sourcePosition.x + (sourceType === 'right' ? stubLength : -stubLength)
  segments.push(`L${firstSegmentX},${sourcePosition.y}`)
  const firstSegmentY =
    sourcePosition.y + (targetPosition.y - sourcePosition.y) / 2
  segments.push(
    `L${
      sourcePosition.x + (sourceType === 'right' ? stubLength : -stubLength)
    },${firstSegmentY}`
  )

  const secondSegmentX =
    targetPosition.x - (sourceType === 'right' ? stubLength : -stubLength)
  segments.push(`L${secondSegmentX},${firstSegmentY}`)

  segments.push(`L${secondSegmentX},${targetPosition.y}`)

  segments.push(`L${targetPosition.x},${targetPosition.y}`)
  return segments.join(' ')
}

type GetAnchorsPositionParams = {
  sourceGroupCoordinates: Coordinates
  targetGroupCoordinates: Coordinates
  sourceTop: number
  targetTop?: number
  graphScale: number
}
export const getAnchorsPosition = ({
  sourceGroupCoordinates,
  targetGroupCoordinates,
  sourceTop,
  targetTop,
}: GetAnchorsPositionParams): AnchorsPositionProps => {
  const sourcePosition = computeSourceCoordinates(
    sourceGroupCoordinates,
    sourceTop
  )
  let sourceType: 'right' | 'left' = 'right'
  if (sourceGroupCoordinates.x > targetGroupCoordinates.x) {
    sourcePosition.x = sourceGroupCoordinates.x
    sourceType = 'left'
  }

  const { targetPosition, totalSegments } = computeGroupTargetPosition(
    sourceGroupCoordinates,
    targetGroupCoordinates,
    sourcePosition.y,
    targetTop
  )
  return { sourcePosition, targetPosition, sourceType, totalSegments }
}

const computeGroupTargetPosition = (
  sourceGroupPosition: Coordinates,
  targetGroupPosition: Coordinates,
  sourceOffsetY: number,
  targetOffsetY?: number
): { targetPosition: Coordinates; totalSegments: number } => {
  const isTargetGroupBelow =
    targetGroupPosition.y > sourceOffsetY &&
    targetGroupPosition.x < sourceGroupPosition.x + blockWidth + stubLength &&
    targetGroupPosition.x > sourceGroupPosition.x - blockWidth - stubLength
  const isTargetGroupToTheRight = targetGroupPosition.x < sourceGroupPosition.x
  const isTargettingGroup = !targetOffsetY

  if (isTargetGroupBelow && isTargettingGroup) {
    const isExterior =
      targetGroupPosition.x <
        sourceGroupPosition.x - blockWidth / 2 - stubLength ||
      targetGroupPosition.x >
        sourceGroupPosition.x + blockWidth / 2 + stubLength
    const targetPosition = parseGroupAnchorPosition(targetGroupPosition, 'top')
    return { totalSegments: isExterior ? 2 : 4, targetPosition }
  } else {
    const isExterior =
      targetGroupPosition.x < sourceGroupPosition.x - blockWidth ||
      targetGroupPosition.x > sourceGroupPosition.x + blockWidth
    const targetPosition = parseGroupAnchorPosition(
      targetGroupPosition,
      isTargetGroupToTheRight ? 'right' : 'left',
      targetOffsetY
    )
    return { totalSegments: isExterior ? 3 : 5, targetPosition }
  }
}

const parseGroupAnchorPosition = (
  blockPosition: Coordinates,
  anchor: 'left' | 'top' | 'right',
  targetOffsetY?: number
): Coordinates => {
  switch (anchor) {
    case 'left':
      return {
        x: blockPosition.x + blockAnchorsOffset.left.x,
        y: targetOffsetY ?? blockPosition.y + blockAnchorsOffset.left.y,
      }
    case 'top':
      return {
        x: blockPosition.x + blockAnchorsOffset.top.x,
        y: blockPosition.y + blockAnchorsOffset.top.y,
      }
    case 'right':
      return {
        x: blockPosition.x + blockAnchorsOffset.right.x,
        y: targetOffsetY ?? blockPosition.y + blockAnchorsOffset.right.y,
      }
  }
}

export const computeEdgePath = ({
  sourcePosition,
  targetPosition,
  sourceType,
  totalSegments,
}: AnchorsPositionProps) => {
  const segments = getSegments({
    sourcePosition,
    targetPosition,
    sourceType,
    totalSegments,
  })
  return roundCorners(
    `M${sourcePosition.x},${sourcePosition.y} ${segments}`,
    roundSize
  ).path
}

export const computeConnectingEdgePath = ({
  sourceGroupCoordinates,
  targetGroupCoordinates,
  sourceTop,
  targetTop,
  graphScale,
}: GetAnchorsPositionParams) => {
  const anchorsPosition = getAnchorsPosition({
    sourceGroupCoordinates,
    targetGroupCoordinates,
    sourceTop,
    targetTop,
    graphScale,
  })
  return computeEdgePath(anchorsPosition)
}

export const computeEdgePathToMouse = ({
  sourceGroupCoordinates,
  mousePosition,
  sourceTop,
}: {
  sourceGroupCoordinates: Coordinates
  mousePosition: Coordinates
  sourceTop: number
}): string => {
  const sourcePosition = {
    x:
      mousePosition.x - sourceGroupCoordinates.x > blockWidth / 2
        ? sourceGroupCoordinates.x + blockWidth
        : sourceGroupCoordinates.x,
    y: sourceTop,
  }
  const sourceType =
    mousePosition.x - sourceGroupCoordinates.x > blockWidth / 2
      ? 'right'
      : 'left'
  const segments = computeThreeSegments(
    sourcePosition,
    mousePosition,
    sourceType
  )
  return roundCorners(
    `M${sourcePosition.x},${sourcePosition.y} ${segments}`,
    roundSize
  ).path
}

export const getEndpointTopOffset = ({
  endpoints,
  graphOffsetY,
  endpointId,
  graphScale,
}: {
  endpoints: IdMap<Endpoint>
  graphOffsetY: number
  endpointId?: string
  graphScale: number
}): number | undefined => {
  if (!endpointId) return
  const endpointRef = endpoints[endpointId]?.ref
  if (!endpointRef?.current) return
  const endpointHeight = 28 * graphScale
  return (
    (endpointRef.current.getBoundingClientRect().y +
      endpointHeight / 2 -
      graphOffsetY) /
    graphScale
  )
}

export const getSourceEndpointId = (edge?: Edge) =>
  edge?.from.itemId ?? edge?.from.blockId
