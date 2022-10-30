import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorModeValue as mode,
  useDisclosure,
  Box,
  Img,
} from '@chakra-ui/react'
import { HamburgerIcon } from 'assets/icons'
import { CloseIcon } from 'assets/icons/CloseIcon'
import Image from 'next/image'
import * as React from 'react'
import { NextChakraLink } from '../nextChakraAdapters/NextChakraLink'
import { MobileMenu } from './MobileMenu'

export const Header = () => {
  const { isOpen: isMobileMenuOpen, onToggle: onMobileMenuToggle } =
    useDisclosure()

  return (
    <Flex pos="relative" zIndex={10} w="full">
      <HStack
        as="header"
        aria-label="Main navigation"
        maxW="7xl"
        w="full"
        mx="auto"
        px={{ base: '6', md: '8' }}
        py="4"
        justify="space-between"
      >
        <Flex
          align="center"
          justify="space-between"
          className="nav-content__mobile"
          color={mode('white', 'white')}
        >
          <HStack as={NextChakraLink} href="/" rel="home" ml="2">
            <Image src="/images/logo.png" width="60rem" height="60rem" />
            <Heading as="p" fontSize="3xl">
              AutoRepl.
            </Heading>
          </HStack>
        </Flex>
        <Box display={['block', 'block', 'none']}>
          <IconButton
            aria-label={'Open menu'}
            icon={
              isMobileMenuOpen ? (
                <CloseIcon boxSize="20px" />
              ) : (
                <HamburgerIcon boxSize="20px" />
              )
            }
            variant="ghost"
            colorScheme="gray"
            onClick={onMobileMenuToggle}
          />
          <MobileMenu isOpen={isMobileMenuOpen} />
        </Box>
        <HStack as="nav" spacing={4} display={['none', 'none', 'flex']}>
          <Button
            as={NextChakraLink}
            href="https://docs.autorepl.com"
            variant="ghost"
            colorScheme="gray"
            fontWeight={700}
          >
            Documentation
          </Button>
          <Button
            as={NextChakraLink}
            href="/pricing"
            variant="ghost"
            colorScheme="gray"
            fontWeight={700}
          >
            Pricing
          </Button>
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
        </HStack>
      </HStack>
    </Flex>
  )
}
