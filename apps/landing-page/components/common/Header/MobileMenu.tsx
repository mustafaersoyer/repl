import { Collapse, Stack, Button } from '@chakra-ui/react'
import { NextChakraLink } from '../nextChakraAdapters/NextChakraLink'

type Props = { isOpen: boolean }

export const MobileMenu = ({ isOpen }: Props) => (
  <Collapse in={isOpen}>
    <Stack
      pos="absolute"
      insetX={0}
      bgGradient="linear(to-b, gray.900, gray.800)"
      px="6"
      py="10"
      spacing={4}
    >
      <Button
        as={NextChakraLink}
        href="https://app.autorepl.com/signin"
        colorScheme="blue"
        variant="outline"
        fontWeight={700}
      >
        Sign in
      </Button>
      <Button
        as={NextChakraLink}
        href="https://app.autorepl.com/register"
        colorScheme="orange"
        fontWeight={700}
      >
        Create a AutoRepl Bot
      </Button>
      <Button
        as={NextChakraLink}
        href="/pricing"
        variant="outline"
        colorScheme="gray"
        fontWeight={700}
      >
        Pricing
      </Button>
      <Button
        as={NextChakraLink}
        href="https://docs.autorepl.com"
        variant="outline"
        colorScheme="gray"
        fontWeight={700}
      >
        Documentation
      </Button>
    </Stack>
  </Collapse>
)
