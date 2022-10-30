import React, { useEffect, useRef, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { AvatarSideContainer } from './AvatarSideContainer'
import { LinkedTypebot, useTypebot } from '../../contexts/TypebotContext'
import {
  isBubbleBlock,
  isBubbleBlockType,
  isChoiceInput,
  isDefined,
  isInputBlock,
  isIntegrationBlock,
  isLogicBlock,
  byId,
} from 'utils'
import { executeLogic } from 'services/logic'
import { executeIntegration } from 'services/integration'
import { parseRetryBlock, blockCanBeRetried } from 'services/inputs'
import { parseVariables } from '../../services/variable'
import { useAnswers } from 'contexts/AnswersContext'
import {
  BubbleBlock,
  InputBlock,
  LogicBlockType,
  PublicTypebot,
  Block,
} from 'models'
import { useChat } from 'contexts/ChatContext'
import { getLastChatBlockType } from 'services/chat'
import { HostBubble } from './ChatBlock/bubbles/HostBubble'
import { InputChatBlock, InputSubmitContent } from './ChatBlock/InputChatBlock'

type ChatGroupProps = {
  blocks: Block[]
  startBlockIndex: number
  groupTitle: string
  keepShowingHostAvatar: boolean
  onGroupEnd: ({
    edgeId,
    updatedTypebot,
  }: {
    edgeId?: string
    updatedTypebot?: PublicTypebot | LinkedTypebot
  }) => void
}

type ChatDisplayChunk = { bubbles: BubbleBlock[]; input?: InputBlock }

export const ChatGroup = ({
  blocks,
  startBlockIndex,
  groupTitle,
  onGroupEnd,
  keepShowingHostAvatar,
}: ChatGroupProps) => {
  const {
    currentTypebotId,
    typebot,
    updateVariableValue,
    createEdge,
    apiHost,
    isPreview,
    onNewLog,
    injectLinkedTypebot,
    linkedTypebots,
    setCurrentTypebotId,
    pushEdgeIdInLinkedTypebotQueue,
  } = useTypebot()
  const { resultValues, updateVariables, resultId } = useAnswers()
  const { scroll } = useChat()
  const [processedBlocks, setProcessedBlocks] = useState<Block[]>([])
  const [displayedChunks, setDisplayedChunks] = useState<ChatDisplayChunk[]>([])

  const insertBlockInStack = (nextBlock: Block) => {
    setProcessedBlocks([...processedBlocks, nextBlock])
    if (isBubbleBlock(nextBlock)) {
      const lastBlockType = getLastChatBlockType(processedBlocks)
      lastBlockType && isBubbleBlockType(lastBlockType)
        ? setDisplayedChunks(
            displayedChunks.map((c, idx) =>
              idx === displayedChunks.length - 1
                ? { bubbles: [...c.bubbles, nextBlock] }
                : c
            )
          )
        : setDisplayedChunks([...displayedChunks, { bubbles: [nextBlock] }])
    }
    if (isInputBlock(nextBlock)) {
      displayedChunks.length === 0 ||
      isDefined(displayedChunks[displayedChunks.length - 1].input)
        ? setDisplayedChunks([
            ...displayedChunks,
            { bubbles: [], input: nextBlock },
          ])
        : setDisplayedChunks(
            displayedChunks.map((c, idx) =>
              idx === displayedChunks.length - 1
                ? { ...c, input: nextBlock }
                : c
            )
          )
    }
  }

  useEffect(() => {
    const nextBlock = blocks[startBlockIndex]
    if (nextBlock) insertBlockInStack(nextBlock)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scroll()
    onNewBlockDisplayed()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedBlocks])

  const onNewBlockDisplayed = async () => {
    const currentBlock = [...processedBlocks].pop()
    if (!currentBlock) return
    if (isLogicBlock(currentBlock)) {
      const { nextEdgeId, linkedTypebot } = await executeLogic(currentBlock, {
        isPreview,
        apiHost,
        typebot,
        linkedTypebots,
        updateVariableValue,
        updateVariables,
        injectLinkedTypebot,
        onNewLog,
        createEdge,
        setCurrentTypebotId,
        pushEdgeIdInLinkedTypebotQueue,
        currentTypebotId,
      })
      const isRedirecting =
        currentBlock.type === LogicBlockType.REDIRECT &&
        currentBlock.options.isNewTab === false
      if (isRedirecting) return
      nextEdgeId
        ? onGroupEnd({ edgeId: nextEdgeId, updatedTypebot: linkedTypebot })
        : displayNextBlock()
    }
    if (isIntegrationBlock(currentBlock)) {
      const nextEdgeId = await executeIntegration({
        block: currentBlock,
        context: {
          apiHost,
          typebotId: currentTypebotId,
          groupId: currentBlock.groupId,
          blockId: currentBlock.id,
          variables: typebot.variables,
          isPreview,
          updateVariableValue,
          updateVariables,
          resultValues,
          groups: typebot.groups,
          onNewLog,
          resultId,
        },
      })
      nextEdgeId ? onGroupEnd({ edgeId: nextEdgeId }) : displayNextBlock()
    }
    if (currentBlock.type === 'start')
      onGroupEnd({ edgeId: currentBlock.outgoingEdgeId })
  }

  const displayNextBlock = (
    answerContent?: InputSubmitContent,
    isRetry?: boolean
  ) => {
    scroll()
    const currentBlock = [...processedBlocks].pop()
    if (currentBlock) {
      if (isRetry && blockCanBeRetried(currentBlock))
        return insertBlockInStack(
          parseRetryBlock(currentBlock, typebot.variables, createEdge)
        )
      if (
        isInputBlock(currentBlock) &&
        currentBlock.options?.variableId &&
        answerContent
      ) {
        updateVariableValue(
          currentBlock.options.variableId,
          answerContent.value
        )
      }
      const isSingleChoiceBlock =
        isChoiceInput(currentBlock) && !currentBlock.options.isMultipleChoice
      if (isSingleChoiceBlock) {
        const nextEdgeId = currentBlock.items.find(
          byId(answerContent?.itemId)
        )?.outgoingEdgeId
        if (nextEdgeId) return onGroupEnd({ edgeId: nextEdgeId })
      }

      if (
        currentBlock?.outgoingEdgeId ||
        processedBlocks.length === blocks.length
      )
        return onGroupEnd({ edgeId: currentBlock.outgoingEdgeId })
    }
    const nextBlock = blocks[processedBlocks.length + startBlockIndex]
    nextBlock ? insertBlockInStack(nextBlock) : onGroupEnd({})
  }

  const avatarSrc = typebot.theme.chat.hostAvatar?.url

  return (
    <div className="flex w-full" data-group-name={groupTitle}>
      <div className="flex flex-col w-full min-w-0">
        {displayedChunks.map((chunk, idx) => (
          <ChatChunks
            key={idx}
            displayChunk={chunk}
            hostAvatar={{
              isEnabled: typebot.theme.chat.hostAvatar?.isEnabled ?? true,
              src: avatarSrc && parseVariables(typebot.variables)(avatarSrc),
            }}
            hasGuestAvatar={typebot.theme.chat.guestAvatar?.isEnabled ?? false}
            onDisplayNextBlock={displayNextBlock}
            keepShowingHostAvatar={keepShowingHostAvatar}
          />
        ))}
      </div>
    </div>
  )
}

type Props = {
  displayChunk: ChatDisplayChunk
  hostAvatar: { isEnabled: boolean; src?: string }
  hasGuestAvatar: boolean
  keepShowingHostAvatar: boolean
  onDisplayNextBlock: (
    answerContent?: InputSubmitContent,
    isRetry?: boolean
  ) => void
}
const ChatChunks = ({
  displayChunk: { bubbles, input },
  hostAvatar,
  hasGuestAvatar,
  keepShowingHostAvatar,
  onDisplayNextBlock,
}: Props) => {
  const [isSkipped, setIsSkipped] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const avatarSideContainerRef = useRef<any>()

  useEffect(() => {
    refreshTopOffset()
  })

  const skipInput = () => {
    onDisplayNextBlock()
    setIsSkipped(true)
  }

  const refreshTopOffset = () =>
    avatarSideContainerRef.current?.refreshTopOffset()

  return (
    <>
      <div className="flex">
        {hostAvatar.isEnabled && bubbles.length > 0 && (
          <AvatarSideContainer
            ref={avatarSideContainerRef}
            hostAvatarSrc={hostAvatar.src}
            keepShowing={
              (keepShowingHostAvatar || isDefined(input)) && !isSkipped
            }
          />
        )}
        <div
          className="flex-1"
          style={{ marginRight: hasGuestAvatar ? '50px' : '0.5rem' }}
        >
          <TransitionGroup>
            {bubbles.map((block) => (
              <CSSTransition
                key={block.id}
                classNames="bubble"
                timeout={500}
                unmountOnExit
              >
                <HostBubble
                  block={block}
                  onTransitionEnd={() => {
                    onDisplayNextBlock()
                    refreshTopOffset()
                  }}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      {!isSkipped && (
        <CSSTransition
          classNames="bubble"
          timeout={500}
          unmountOnExit
          in={isDefined(input)}
        >
          {input && (
            <InputChatBlock
              block={input}
              onTransitionEnd={onDisplayNextBlock}
              onSkip={skipInput}
              hasAvatar={hostAvatar.isEnabled}
              hasGuestAvatar={hasGuestAvatar}
            />
          )}
        </CSSTransition>
      )}
    </>
  )
}
