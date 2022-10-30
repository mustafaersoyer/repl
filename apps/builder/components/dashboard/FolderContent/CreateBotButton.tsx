import { Button, ButtonProps, Text, VStack } from '@chakra-ui/react'
import { PlusIcon } from 'assets/icons'
import { useRouter } from 'next/router'
import { stringify } from 'qs'
import React from 'react'

export const CreateBotButton = ({
  folderId,
  isFirstBot,
  ...props
}: { folderId?: string; isFirstBot: boolean } & ButtonProps) => {
  const router = useRouter()

  const handleClick = () =>
    router.push(
      `/typebots/create?${stringify({
        isFirstBot: !isFirstBot ? undefined : isFirstBot,
        folderId,
      })}`
    )

  return (
    <Button
      mr={{ sm: 6 }}
      mb={6}
      style={{ width: '225px', height: '270px' }}
      onClick={handleClick}
      paddingX={6}
      whiteSpace={'normal'}
      colorScheme="blue"
      {...props}
    >
      <VStack spacing="6">
        <PlusIcon fontSize="40px" />
        <Text
          fontSize={18}
          fontWeight="medium"
          maxW={40}
          textAlign="center"
          mt="6"
        >
          Create a typebot
        </Text>
      </VStack>
    </Button>
  )
}
