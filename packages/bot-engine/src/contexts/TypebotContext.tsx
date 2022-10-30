import { TypebotViewerProps } from 'components/TypebotViewer'
import { Log } from 'db'
import { Edge, PublicTypebot, Typebot } from 'models'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { safeStringify } from 'services/variable'

export type LinkedTypebot = Pick<
  PublicTypebot | Typebot,
  'id' | 'groups' | 'variables' | 'edges'
>

export type LinkedTypebotQueue = {
  typebotId: string
  edgeId: string
}[]

const typebotContext = createContext<{
  currentTypebotId: string
  typebot: TypebotViewerProps['typebot']
  linkedTypebots: LinkedTypebot[]
  apiHost: string
  isPreview: boolean
  linkedBotQueue: LinkedTypebotQueue
  isLoading: boolean
  setCurrentTypebotId: (id: string) => void
  updateVariableValue: (variableId: string, value: unknown) => void
  createEdge: (edge: Edge) => void
  injectLinkedTypebot: (typebot: Typebot | PublicTypebot) => LinkedTypebot
  popEdgeIdFromLinkedTypebotQueue: () => void
  pushEdgeIdInLinkedTypebotQueue: (bot: {
    typebotId: string
    edgeId: string
  }) => void
  onNewLog: (log: Omit<Log, 'id' | 'createdAt' | 'resultId'>) => void
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
}>({})

export const TypebotContext = ({
  children,
  typebot,
  apiHost,
  isPreview,
  isLoading,
  onNewLog,
}: {
  children: ReactNode
  typebot: TypebotViewerProps['typebot']
  apiHost: string
  isLoading: boolean
  isPreview: boolean
  onNewLog: (log: Omit<Log, 'id' | 'createdAt' | 'resultId'>) => void
}) => {
  const [localTypebot, setLocalTypebot] =
    useState<TypebotViewerProps['typebot']>(typebot)
  const [linkedTypebots, setLinkedTypebots] = useState<LinkedTypebot[]>([])
  const [currentTypebotId, setCurrentTypebotId] = useState(typebot.typebotId)
  const [linkedBotQueue, setLinkedBotQueue] = useState<LinkedTypebotQueue>([])

  useEffect(() => {
    setLocalTypebot((localTypebot) => ({
      ...localTypebot,
      theme: typebot.theme,
      settings: typebot.settings,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typebot.theme, typebot.settings])

  const updateVariableValue = (variableId: string, value: unknown) => {
    const formattedValue = safeStringify(value)

    setLocalTypebot((typebot) => ({
      ...typebot,
      variables: typebot.variables.map((v) =>
        v.id === variableId ? { ...v, value: formattedValue } : v
      ),
    }))
  }

  const createEdge = (edge: Edge) => {
    setLocalTypebot((typebot) => ({
      ...typebot,
      edges: [...typebot.edges, edge],
    }))
  }

  const injectLinkedTypebot = (typebot: Typebot | PublicTypebot) => {
    const typebotToInject = {
      id: 'typebotId' in typebot ? typebot.typebotId : typebot.id,
      groups: typebot.groups,
      edges: typebot.edges,
      variables: typebot.variables,
    }
    setLinkedTypebots((typebots) => [...typebots, typebotToInject])
    const updatedTypebot = {
      ...localTypebot,
      groups: [...localTypebot.groups, ...typebotToInject.groups],
      variables: [...localTypebot.variables, ...typebotToInject.variables],
      edges: [...localTypebot.edges, ...typebotToInject.edges],
    }
    setLocalTypebot(updatedTypebot)
    return typebotToInject
  }

  const pushEdgeIdInLinkedTypebotQueue = (bot: {
    typebotId: string
    edgeId: string
  }) => setLinkedBotQueue((queue) => [...queue, bot])

  const popEdgeIdFromLinkedTypebotQueue = () => {
    setLinkedBotQueue((queue) => queue.slice(1))
    setCurrentTypebotId(linkedBotQueue[0].typebotId)
  }

  return (
    <typebotContext.Provider
      value={{
        typebot: localTypebot,
        linkedTypebots,
        apiHost,
        isPreview,
        updateVariableValue,
        createEdge,
        injectLinkedTypebot,
        onNewLog,
        linkedBotQueue,
        isLoading,
        pushEdgeIdInLinkedTypebotQueue,
        popEdgeIdFromLinkedTypebotQueue,
        currentTypebotId,
        setCurrentTypebotId,
      }}
    >
      {children}
    </typebotContext.Provider>
  )
}

export const useTypebot = () => useContext(typebotContext)
