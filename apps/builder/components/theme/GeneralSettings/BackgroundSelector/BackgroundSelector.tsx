import { Stack, Text } from '@chakra-ui/react'
import { Background, BackgroundType } from 'models'
import React from 'react'
import { BackgroundContent } from './BackgroundContent'
import { BackgroundTypeRadioButtons } from './BackgroundTypeRadioButtons'

type Props = {
  background?: Background
  onBackgroundChange: (newBackground: Background) => void
}

const defaultBackgroundType = BackgroundType.NONE

export const BackgroundSelector = ({
  background,
  onBackgroundChange,
}: Props) => {
  const handleBackgroundTypeChange = (type: BackgroundType) =>
    background && onBackgroundChange({ ...background, type })

  const handleBackgroundContentChange = (content: string) =>
    background && onBackgroundChange({ ...background, content })

  return (
    <Stack spacing={4}>
      <Text>Background</Text>
      <BackgroundTypeRadioButtons
        backgroundType={background?.type ?? defaultBackgroundType}
        onBackgroundTypeChange={handleBackgroundTypeChange}
      />
      <BackgroundContent
        background={background}
        onBackgroundContentChange={handleBackgroundContentChange}
      />
    </Stack>
  )
}
