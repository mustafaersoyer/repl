import { Stack, Flex, Text } from '@chakra-ui/react'
import { ContainerColors } from 'models'
import React from 'react'
import { ColorPicker } from '../GeneralSettings/ColorPicker'

type Props = {
  hostBubbles: ContainerColors
  onHostBubblesChange: (hostBubbles: ContainerColors) => void
}

export const HostBubbles = ({ hostBubbles, onHostBubblesChange }: Props) => {
  const handleBackgroundChange = (backgroundColor: string) =>
    onHostBubblesChange({ ...hostBubbles, backgroundColor })
  const handleTextChange = (color: string) =>
    onHostBubblesChange({ ...hostBubbles, color })

  return (
    <Stack data-testid="host-bubbles-theme">
      <Flex justify="space-between" align="center">
        <Text>Background:</Text>
        <ColorPicker
          initialColor={hostBubbles.backgroundColor}
          onColorChange={handleBackgroundChange}
        />
      </Flex>
      <Flex justify="space-between" align="center">
        <Text>Text:</Text>
        <ColorPicker
          initialColor={hostBubbles.color}
          onColorChange={handleTextChange}
        />
      </Flex>
    </Stack>
  )
}
