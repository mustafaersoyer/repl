import { Heading, Stack } from '@chakra-ui/react'
import { AvatarProps, ChatTheme, ContainerColors, InputColors } from 'models'
import React from 'react'
import { AvatarForm } from './AvatarForm'
import { ButtonsTheme } from './ButtonsTheme'
import { GuestBubbles } from './GuestBubbles'
import { HostBubbles } from './HostBubbles'
import { InputsTheme } from './InputsTheme'

type Props = {
  chatTheme: ChatTheme
  onChatThemeChange: (chatTheme: ChatTheme) => void
}

export const ChatThemeSettings = ({ chatTheme, onChatThemeChange }: Props) => {
  const handleHostBubblesChange = (hostBubbles: ContainerColors) =>
    onChatThemeChange({ ...chatTheme, hostBubbles })
  const handleGuestBubblesChange = (guestBubbles: ContainerColors) =>
    onChatThemeChange({ ...chatTheme, guestBubbles })
  const handleButtonsChange = (buttons: ContainerColors) =>
    onChatThemeChange({ ...chatTheme, buttons })
  const handleInputsChange = (inputs: InputColors) =>
    onChatThemeChange({ ...chatTheme, inputs })

  const handleHostAvatarChange = (hostAvatar: AvatarProps) =>
    onChatThemeChange({ ...chatTheme, hostAvatar })
  const handleGuestAvatarChange = (guestAvatar: AvatarProps) =>
    onChatThemeChange({ ...chatTheme, guestAvatar })

  return (
    <Stack spacing={6}>
      <AvatarForm
        title="Bot avatar"
        avatarProps={chatTheme.hostAvatar}
        isDefaultCheck
        onAvatarChange={handleHostAvatarChange}
      />
      <AvatarForm
        title="User avatar"
        avatarProps={chatTheme.guestAvatar}
        onAvatarChange={handleGuestAvatarChange}
      />
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">Bot bubbles</Heading>
        <HostBubbles
          hostBubbles={chatTheme.hostBubbles}
          onHostBubblesChange={handleHostBubblesChange}
        />
      </Stack>
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">User bubbles</Heading>
        <GuestBubbles
          guestBubbles={chatTheme.guestBubbles}
          onGuestBubblesChange={handleGuestBubblesChange}
        />
      </Stack>
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">Buttons</Heading>
        <ButtonsTheme
          buttons={chatTheme.buttons}
          onButtonsChange={handleButtonsChange}
        />
      </Stack>
      <Stack borderWidth={1} rounded="md" p="4" spacing={4}>
        <Heading fontSize="lg">Inputs</Heading>
        <InputsTheme
          inputs={chatTheme.inputs}
          onInputsChange={handleInputsChange}
        />
      </Stack>
    </Stack>
  )
}
