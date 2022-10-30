import {
  chakra,
  Tooltip,
  Text,
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ChevronDownIcon } from 'assets/icons/ChevronDownIcon'
import { HelpCircleIcon } from 'assets/icons/HelpCircleIcon'
import { NextChakraLink } from 'components/common/nextChakraAdapters/NextChakraLink'
import { Plan } from 'db'
import React, { useEffect, useState } from 'react'
import {
  chatsLimit,
  computePrice,
  formatPrice,
  parseNumberWithCommas,
  storageLimit,
} from 'utils'
import { PricingCard } from './PricingCard'
import { ActionButton } from './PricingCard/ActionButton'

export const StarterPlanCard = () => {
  const [price, setPrice] = useState('39$')

  const [selectedChatsLimitIndex, setSelectedChatsLimitIndex] =
    useState<number>(0)
  const [selectedStorageLimitIndex, setSelectedStorageLimitIndex] =
    useState<number>(0)

  useEffect(() => {
    setPrice(
      formatPrice(
        computePrice(
          Plan.STARTER,
          selectedChatsLimitIndex ?? 0,
          selectedStorageLimitIndex ?? 0
        ) ?? NaN
      )
    )
  }, [selectedChatsLimitIndex, selectedStorageLimitIndex])

  return (
    <PricingCard
      data={{
        price,
        name: 'Starter',
        featureLabel: 'Everything in Personal, plus:',
        features: [
          <Text key="seats">
            <chakra.span fontWeight="bold">2 seats</chakra.span> included
          </Text>,
          <HStack key="chats">
            <Text>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  size="sm"
                  variant="outline"
                  isLoading={selectedChatsLimitIndex === undefined}
                  colorScheme="orange"
                >
                  {selectedChatsLimitIndex !== undefined
                    ? parseNumberWithCommas(
                        chatsLimit.STARTER.totalIncluded +
                          chatsLimit.STARTER.increaseStep.amount *
                            selectedChatsLimitIndex
                      )
                    : undefined}
                </MenuButton>
                <MenuList>
                  {selectedChatsLimitIndex !== 0 && (
                    <MenuItem onClick={() => setSelectedChatsLimitIndex(0)}>
                      {parseNumberWithCommas(chatsLimit.STARTER.totalIncluded)}
                    </MenuItem>
                  )}
                  {selectedChatsLimitIndex !== 1 && (
                    <MenuItem onClick={() => setSelectedChatsLimitIndex(1)}>
                      {parseNumberWithCommas(
                        chatsLimit.STARTER.totalIncluded +
                          chatsLimit.STARTER.increaseStep.amount
                      )}
                    </MenuItem>
                  )}
                  {selectedChatsLimitIndex !== 2 && (
                    <MenuItem onClick={() => setSelectedChatsLimitIndex(2)}>
                      {parseNumberWithCommas(
                        chatsLimit.STARTER.totalIncluded +
                          chatsLimit.STARTER.increaseStep.amount * 2
                      )}
                    </MenuItem>
                  )}
                  {selectedChatsLimitIndex !== 3 && (
                    <MenuItem onClick={() => setSelectedChatsLimitIndex(3)}>
                      {parseNumberWithCommas(
                        chatsLimit.STARTER.totalIncluded +
                          chatsLimit.STARTER.increaseStep.amount * 3
                      )}
                    </MenuItem>
                  )}
                  {selectedChatsLimitIndex !== 4 && (
                    <MenuItem onClick={() => setSelectedChatsLimitIndex(4)}>
                      {parseNumberWithCommas(
                        chatsLimit.STARTER.totalIncluded +
                          chatsLimit.STARTER.increaseStep.amount * 4
                      )}
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>{' '}
              chats/mo
            </Text>
            <Tooltip
              hasArrow
              placement="top"
              label="A chat is counted whenever a user starts a discussion. It is
    independant of the number of messages he sends and receives."
            >
              <chakra.span cursor="pointer" h="7">
                <HelpCircleIcon />
              </chakra.span>
            </Tooltip>
          </HStack>,
          <HStack key="test">
            <Text>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  size="sm"
                  variant="outline"
                  isLoading={selectedStorageLimitIndex === undefined}
                  colorScheme="orange"
                >
                  {selectedStorageLimitIndex !== undefined
                    ? parseNumberWithCommas(
                        storageLimit.STARTER.totalIncluded +
                          storageLimit.STARTER.increaseStep.amount *
                            selectedStorageLimitIndex
                      )
                    : undefined}
                </MenuButton>
                <MenuList>
                  {selectedStorageLimitIndex !== 0 && (
                    <MenuItem onClick={() => setSelectedStorageLimitIndex(0)}>
                      {parseNumberWithCommas(
                        storageLimit.STARTER.totalIncluded
                      )}
                    </MenuItem>
                  )}
                  {selectedStorageLimitIndex !== 1 && (
                    <MenuItem onClick={() => setSelectedStorageLimitIndex(1)}>
                      {parseNumberWithCommas(
                        storageLimit.STARTER.totalIncluded +
                          storageLimit.STARTER.increaseStep.amount
                      )}
                    </MenuItem>
                  )}
                  {selectedStorageLimitIndex !== 2 && (
                    <MenuItem onClick={() => setSelectedStorageLimitIndex(2)}>
                      {parseNumberWithCommas(
                        storageLimit.STARTER.totalIncluded +
                          storageLimit.STARTER.increaseStep.amount * 2
                      )}
                    </MenuItem>
                  )}
                  {selectedStorageLimitIndex !== 3 && (
                    <MenuItem onClick={() => setSelectedStorageLimitIndex(3)}>
                      {parseNumberWithCommas(
                        storageLimit.STARTER.totalIncluded +
                          storageLimit.STARTER.increaseStep.amount * 3
                      )}
                    </MenuItem>
                  )}
                  {selectedStorageLimitIndex !== 4 && (
                    <MenuItem onClick={() => setSelectedStorageLimitIndex(4)}>
                      {parseNumberWithCommas(
                        storageLimit.STARTER.totalIncluded +
                          storageLimit.STARTER.increaseStep.amount * 4
                      )}
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>{' '}
              GB of storage
            </Text>
            <Tooltip
              hasArrow
              placement="top"
              label="You accumulate storage for every file that your user upload
        into your bot. If you delete the result, it will free up the
        space."
            >
              <chakra.span cursor="pointer" h="7">
                <HelpCircleIcon />
              </chakra.span>
            </Tooltip>
          </HStack>,
          'Branding removed',
          'Collect files from users',
          'Create folders',
        ],
      }}
      borderWidth="1px"
      borderColor="orange.200"
      button={
        <NextChakraLink
          href={`https://app.autorepl.com/register?subscribePlan=${Plan.STARTER}&chats=${selectedChatsLimitIndex}&storage=${selectedStorageLimitIndex}`}
          _hover={{ textDecor: 'none' }}
        >
          <ActionButton>Subscribe now</ActionButton>
        </NextChakraLink>
      }
    />
  )
}
