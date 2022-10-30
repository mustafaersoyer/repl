import { Text } from '@chakra-ui/react'
import { EmbedBubbleBlock } from 'models'

export const EmbedBubbleContent = ({ block }: { block: EmbedBubbleBlock }) => {
  if (!block.content?.url) return <Text color="gray.500">Click to edit...</Text>
  return <Text>Show embed</Text>
}
