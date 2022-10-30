import { Group, Edge, IdMap, Source, Block, Target } from 'models'
import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

export const stubLength = 20
export const blockWidth = 300
export const blockAnchorsOffset = {
  left: {
    x: 0,
    y: 20,
  },
  top: {
    x: blockWidth / 2,
    y: 0,
  },
  right: {
    x: blockWidth,
    y: 20,
  },
}

export type Coordinates = { x: number; y: number }

type Position = Coordinates & { scale: number }

export type Anchor = {
  coordinates: Coordinates
}

export type Node = Omit<Group, 'blocks'> & {
  blocks: (Block & {
    sourceAnchorsPosition: { left: Coordinates; right: Coordinates }
  })[]
}

export const graphPositionDefaultValue = { x: 400, y: 100, scale: 1 }

export type ConnectingIds = {
  source: Source
  target?: Target
}

type BlockId = string
type ButtonId = string
export type Endpoint = {
  id: BlockId | ButtonId
  ref: MutableRefObject<HTMLDivElement | null>
}

export type GroupsCoordinates = IdMap<Coordinates>

const groupsCoordinatesContext = createContext<{
  groupsCoordinates: GroupsCoordinates
  updateGroupCoordinates: (groupId: string, newCoord: Coordinates) => void
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
}>({})

const graphContext = createContext<{
  graphPosition: Position
  setGraphPosition: Dispatch<SetStateAction<Position>>
  connectingIds: ConnectingIds | null
  setConnectingIds: Dispatch<SetStateAction<ConnectingIds | null>>
  previewingEdge?: Edge
  setPreviewingEdge: Dispatch<SetStateAction<Edge | undefined>>
  sourceEndpoints: IdMap<Endpoint>
  addSourceEndpoint: (endpoint: Endpoint) => void
  targetEndpoints: IdMap<Endpoint>
  addTargetEndpoint: (endpoint: Endpoint) => void
  openedBlockId?: string
  setOpenedBlockId: Dispatch<SetStateAction<string | undefined>>
  isReadOnly: boolean
  focusedGroupId?: string
  setFocusedGroupId: Dispatch<SetStateAction<string | undefined>>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
}>({
  graphPosition: graphPositionDefaultValue,
  connectingIds: null,
})

export const GraphProvider = ({
  children,
  isReadOnly = false,
}: {
  children: ReactNode
  isReadOnly?: boolean
}) => {
  const [graphPosition, setGraphPosition] = useState(graphPositionDefaultValue)
  const [connectingIds, setConnectingIds] = useState<ConnectingIds | null>(null)
  const [previewingEdge, setPreviewingEdge] = useState<Edge>()
  const [sourceEndpoints, setSourceEndpoints] = useState<IdMap<Endpoint>>({})
  const [targetEndpoints, setTargetEndpoints] = useState<IdMap<Endpoint>>({})
  const [openedBlockId, setOpenedBlockId] = useState<string>()
  const [focusedGroupId, setFocusedGroupId] = useState<string>()

  const addSourceEndpoint = (endpoint: Endpoint) => {
    setSourceEndpoints((endpoints) => ({
      ...endpoints,
      [endpoint.id]: endpoint,
    }))
  }

  const addTargetEndpoint = (endpoint: Endpoint) => {
    setTargetEndpoints((endpoints) => ({
      ...endpoints,
      [endpoint.id]: endpoint,
    }))
  }

  return (
    <graphContext.Provider
      value={{
        graphPosition,
        setGraphPosition,
        connectingIds,
        setConnectingIds,
        previewingEdge,
        setPreviewingEdge,
        sourceEndpoints,
        targetEndpoints,
        addSourceEndpoint,
        addTargetEndpoint,
        openedBlockId,
        setOpenedBlockId,
        isReadOnly,
        focusedGroupId,
        setFocusedGroupId,
      }}
    >
      {children}
    </graphContext.Provider>
  )
}

export const useGraph = () => useContext(graphContext)

export const GroupsCoordinatesProvider = ({
  children,
  groups,
}: {
  children: ReactNode
  groups: Group[]
  isReadOnly?: boolean
}) => {
  const [groupsCoordinates, setGroupsCoordinates] = useState<GroupsCoordinates>(
    {}
  )

  useEffect(() => {
    setGroupsCoordinates(
      groups.reduce(
        (coords, block) => ({
          ...coords,
          [block.id]: block.graphCoordinates,
        }),
        {}
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups])

  const updateGroupCoordinates = (groupId: string, newCoord: Coordinates) =>
    setGroupsCoordinates((groupsCoordinates) => ({
      ...groupsCoordinates,
      [groupId]: newCoord,
    }))

  return (
    <groupsCoordinatesContext.Provider
      value={{ groupsCoordinates, updateGroupCoordinates }}
    >
      {children}
    </groupsCoordinatesContext.Provider>
  )
}

export const useGroupsCoordinates = () => useContext(groupsCoordinatesContext)
