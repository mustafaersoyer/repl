import { Stack, Text, Box, Flex, Heading } from '@chakra-ui/react'
import { Header } from 'components/common/Header/Header'
import { SocialMetaTags } from 'components/common/SocialMetaTags'
import React from 'react'
import selfie from '../public/images/about/selfie.png'
import Image from 'next/image'
import { Footer } from 'components/common/Footer'
import { NextChakraLink } from 'components/common/nextChakraAdapters/NextChakraLink'

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden ">
      <Header />
      <SocialMetaTags currentUrl={`https://www.typebot.io/about`} />
      <Stack
        spacing={10}
        mx="auto"
        maxW="3xl"
        my="20"
        fontSize="17px"
        textAlign="justify"
      >
        <Flex w="full">
          <Heading as="h1">AutoRepl's story</Heading>
        </Flex>

        <Text>
          AutoRepl is a saas where anyone can create free chatbots that they can
          easily use and integrate into all platforms.
        </Text>

        <Text>
          AutoRepl team consists of young, dynamic and enthusiastic great
          software developers.
        </Text>

        <Text>
          AutoRepl has been built by leveraging the power of open source and
          continues to be developed.
        </Text>
        <Text>
          Besides the free plan, we also have some great paid plans for those
          who want more. Our great customer support applies to every package.
        </Text>
        <Text>
          Thanks to Baptiste Arnaud, this software is a variant of TypeBot
          software.
        </Text>

        <Text>
          If you have any questions, feel free to reach out to us at{' '}
          <NextChakraLink
            href={'mailto:getautorepl@gmail.com'}
            textDecor="underline"
          >
            getautorepl@gmail.com
          </NextChakraLink>
        </Text>
      </Stack>
      <Footer />
    </div>
  )
}

export default AboutPage
