import { Flex, Stack, useOutsideClick } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import {
  Plate,
  PlateProvider,
  selectEditor,
  TElement,
  usePlateEditorRef,
} from '@udecode/plate-core'
import { editorStyle, platePlugins } from 'libs/plate'
import { BaseEditor, BaseSelection, Transforms } from 'slate'
import { ToolBar } from './ToolBar'
import { parseHtmlStringToPlainText } from 'services/utils'
import { defaultTextBubbleContent, TextBubbleContent, Variable } from 'models'
import { VariableSearchInput } from 'components/shared/VariableSearchInput'
import { ReactEditor } from 'slate-react'
import { serializeHtml } from '@udecode/plate-serializer-html'

type TextBubbleEditorContentProps = {
  id: string
  textEditorValue: TElement[]
  onClose: (newContent: TextBubbleContent) => void
}

const TextBubbleEditorContent = ({
  id,
  textEditorValue,
  onClose,
}: TextBubbleEditorContentProps) => {
  const editor = usePlateEditorRef()
  const varDropdownRef = useRef<HTMLDivElement | null>(null)
  const rememberedSelection = useRef<BaseSelection | null>(null)
  const [isVariableDropdownOpen, setIsVariableDropdownOpen] = useState(false)

  const textEditorRef = useRef<HTMLDivElement>(null)

  const closeEditor = () => onClose(convertValueToBlockContent(textEditorValue))

  useOutsideClick({
    ref: textEditorRef,
    handler: closeEditor,
  })

  useEffect(() => {
    if (!isVariableDropdownOpen) return
    const el = varDropdownRef.current
    if (!el) return
    const { top, left } = computeTargetCoord()
    el.style.top = `${top}px`
    el.style.left = `${left}px`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVariableDropdownOpen])

  const computeTargetCoord = () => {
    const selection = window.getSelection()
    const relativeParent = textEditorRef.current
    if (!selection || !relativeParent) return { top: 0, left: 0 }
    const range = selection.getRangeAt(0)
    const selectionBoundingRect = range.getBoundingClientRect()
    const relativeRect = relativeParent.getBoundingClientRect()
    return {
      top: selectionBoundingRect.bottom - relativeRect.top,
      left: selectionBoundingRect.left - relativeRect.left,
    }
  }

  const convertValueToBlockContent = (value: TElement[]): TextBubbleContent => {
    if (value.length === 0) defaultTextBubbleContent
    const html = serializeHtml(editor, {
      nodes: value,
    })
    return {
      html,
      richText: value,
      plainText: parseHtmlStringToPlainText(html),
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleVariableSelected = (variable?: Variable) => {
    setIsVariableDropdownOpen(false)
    if (!rememberedSelection.current || !variable) return
    Transforms.select(editor as BaseEditor, rememberedSelection.current)
    Transforms.insertText(editor as BaseEditor, '{{' + variable.name + '}}')
    ReactEditor.focus(editor as unknown as ReactEditor)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.shiftKey) return
    if (e.key === 'Enter') closeEditor()
  }

  return (
    <Stack
      flex="1"
      ref={textEditorRef}
      borderWidth="2px"
      borderColor="blue.400"
      rounded="md"
      onMouseDown={handleMouseDown}
      pos="relative"
      spacing={0}
      cursor="text"
    >
      <ToolBar onVariablesButtonClick={() => setIsVariableDropdownOpen(true)} />
      <Plate
        id={id}
        editableProps={{
          style: editorStyle,
          autoFocus: true,
          onFocus: () => {
            if (editor.children.length === 0) return
            selectEditor(editor, {
              edge: 'end',
            })
          },
          'aria-label': 'Text editor',
          onBlur: () => {
            rememberedSelection.current = editor.selection
          },
          onKeyDown: handleKeyDown,
        }}
      />
      {isVariableDropdownOpen && (
        <Flex
          pos="absolute"
          ref={varDropdownRef}
          shadow="lg"
          rounded="md"
          bgColor="white"
          w="250px"
          zIndex={10}
        >
          <VariableSearchInput
            onSelectVariable={handleVariableSelected}
            placeholder="Search for a variable"
            isDefaultOpen
          />
        </Flex>
      )}
    </Stack>
  )
}

type TextBubbleEditorProps = {
  id: string
  initialValue: TElement[]
  onClose: (newContent: TextBubbleContent) => void
}

export const TextBubbleEditor = ({
  id,
  initialValue,
  onClose,
}: TextBubbleEditorProps) => {
  const [textEditorValue, setTextEditorValue] = useState(initialValue)

  return (
    <PlateProvider
      id={id}
      plugins={platePlugins}
      initialValue={
        initialValue.length === 0
          ? [{ type: 'p', children: [{ text: '' }] }]
          : initialValue
      }
      onChange={setTextEditorValue}
    >
      <TextBubbleEditorContent
        id={id}
        textEditorValue={textEditorValue}
        onClose={onClose}
      />
    </PlateProvider>
  )
}
