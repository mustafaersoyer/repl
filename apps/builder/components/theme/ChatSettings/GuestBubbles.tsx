import { Stack, Flex, Text } from '@chakra-ui/react'
import { ContainerColors } from 'models'
import React from 'react'
import { ColorPicker } from '../GeneralSettings/ColorPicker'

type Props = {
  guestBubbles: ContainerColors
  onGuestBubblesChange: (hostBubbles: ContainerColors) => void
}

export const GuestBubbles = ({ guestBubbles, onGuestBubblesChange }: Props) => {
  const handleBackgroundChange = (backgroundColor: string) =>
    onGuestBubblesChange({ ...guestBubbles, backgroundColor })
  const handleTextChange = (color: string) =>
    onGuestBubblesChange({ ...guestBubbles, color })

  return (
    <Stack data-testid="guest-bubbles-theme">
      <Flex justify="space-between" align="center">
        <Text>Background:</Text>
        <ColorPicker
          initialColor={guestBubbles.backgroundColor}
          onColorChange={handleBackgroundChange}
        />
      </Flex>
      <Flex justify="space-between" align="center">
        <Text>Text:</Text>
        <ColorPicker
          initialColor={guestBubbles.color}
          onColorChange={handleTextChange}
        />
      </Flex>
    </Stack>
  )
}
