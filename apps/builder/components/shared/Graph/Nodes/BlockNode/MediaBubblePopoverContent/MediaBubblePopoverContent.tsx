import {
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react'
import { ImageUploadContent } from 'components/shared/ImageUploadContent'
import {
  BubbleBlock,
  BubbleBlockContent,
  BubbleBlockType,
  TextBubbleBlock,
} from 'models'
import { useRef } from 'react'
import { EmbedUploadContent } from './EmbedUploadContent'
import { VideoUploadContent } from './VideoUploadContent'

type Props = {
  block: Exclude<BubbleBlock, TextBubbleBlock>
  onContentChange: (content: BubbleBlockContent) => void
}

export const MediaBubblePopoverContent = (props: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const handleMouseDown = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <Portal>
      <PopoverContent
        onMouseDown={handleMouseDown}
        w={props.block.type === BubbleBlockType.IMAGE ? '500px' : '400px'}
      >
        <PopoverArrow />
        <PopoverBody ref={ref} shadow="lg">
          <MediaBubbleContent {...props} />
        </PopoverBody>
      </PopoverContent>
    </Portal>
  )
}

export const MediaBubbleContent = ({ block, onContentChange }: Props) => {
  const handleImageUrlChange = (url: string) => onContentChange({ url })

  switch (block.type) {
    case BubbleBlockType.IMAGE: {
      return (
        <ImageUploadContent
          url={block.content?.url}
          onSubmit={handleImageUrlChange}
        />
      )
    }
    case BubbleBlockType.VIDEO: {
      return (
        <VideoUploadContent
          content={block.content}
          onSubmit={onContentChange}
        />
      )
    }
    case BubbleBlockType.EMBED: {
      return (
        <EmbedUploadContent
          content={block.content}
          onSubmit={onContentChange}
        />
      )
    }
  }
}
