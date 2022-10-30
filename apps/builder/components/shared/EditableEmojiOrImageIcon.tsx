import {
  Popover,
  Tooltip,
  chakra,
  PopoverTrigger,
  PopoverContent,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import { EmojiOrImageIcon } from './EmojiOrImageIcon'
import { ImageUploadContent } from './ImageUploadContent'

type Props = {
  icon?: string | null
  onChangeIcon: (icon: string) => void
  boxSize?: string
}

export const EditableEmojiOrImageIcon = ({
  icon,
  onChangeIcon,
  boxSize,
}: Props) => {
  return (
    <Popover isLazy>
      {({ onClose }) => (
        <>
          <Tooltip label="Change icon">
            <Flex
              cursor="pointer"
              p="2"
              rounded="md"
              _hover={{ bgColor: 'gray.100' }}
              transition="background-color 0.2s"
              data-testid="editable-icon"
            >
              <PopoverTrigger>
                <chakra.span>
                  <EmojiOrImageIcon
                    icon={icon}
                    emojiFontSize="2xl"
                    boxSize={boxSize}
                  />
                </chakra.span>
              </PopoverTrigger>
            </Flex>
          </Tooltip>
          <PopoverContent p="2">
            <ImageUploadContent
              url={icon ?? ''}
              onSubmit={onChangeIcon}
              isGiphyEnabled={false}
              isEmojiEnabled={true}
              onClose={onClose}
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  )
}
