import {
  Stack,
  Heading,
  chakra,
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import { ChevronLeftIcon } from 'assets/icons'
import { useWorkspace } from 'contexts/WorkspaceContext'
import { Plan } from 'db'
import { useEffect, useState } from 'react'
import {
  chatsLimit,
  getChatsLimit,
  getStorageLimit,
  storageLimit,
  parseNumberWithCommas,
  computePrice,
  formatPrice,
} from 'utils'
import { MoreInfoTooltip } from '../MoreInfoTooltip'
import { FeaturesList } from './components/FeaturesList'

type StarterPlanContentProps = {
  initialChatsLimitIndex?: number
  initialStorageLimitIndex?: number
  onPayClick: (props: {
    selectedChatsLimitIndex: number
    selectedStorageLimitIndex: number
  }) => Promise<void>
}

export const StarterPlanContent = ({
  initialChatsLimitIndex,
  initialStorageLimitIndex,
  onPayClick,
}: StarterPlanContentProps) => {
  const { workspace } = useWorkspace()
  const [selectedChatsLimitIndex, setSelectedChatsLimitIndex] =
    useState<number>()
  const [selectedStorageLimitIndex, setSelectedStorageLimitIndex] =
    useState<number>()
  const [isPaying, setIsPaying] = useState(false)

  useEffect(() => {
    if (
      selectedChatsLimitIndex === undefined &&
      initialChatsLimitIndex !== undefined
    )
      setSelectedChatsLimitIndex(initialChatsLimitIndex)
    if (
      selectedStorageLimitIndex === undefined &&
      initialStorageLimitIndex !== undefined
    )
      setSelectedStorageLimitIndex(initialStorageLimitIndex)
  }, [
    initialChatsLimitIndex,
    initialStorageLimitIndex,
    selectedChatsLimitIndex,
    selectedStorageLimitIndex,
  ])

  const workspaceChatsLimit = workspace ? getChatsLimit(workspace) : undefined
  const workspaceStorageLimit = workspace
    ? getStorageLimit(workspace)
    : undefined

  const isCurrentPlan =
    chatsLimit[Plan.STARTER].totalIncluded +
      chatsLimit[Plan.STARTER].increaseStep.amount *
        (selectedChatsLimitIndex ?? 0) ===
      workspaceChatsLimit &&
    storageLimit[Plan.STARTER].totalIncluded +
      storageLimit[Plan.STARTER].increaseStep.amount *
        (selectedStorageLimitIndex ?? 0) ===
      workspaceStorageLimit

  const getButtonLabel = () => {
    if (
      selectedChatsLimitIndex === undefined ||
      selectedStorageLimitIndex === undefined
    )
      return ''
    if (workspace?.plan === Plan.PRO) return 'Downgrade'
    if (workspace?.plan === Plan.STARTER) {
      if (isCurrentPlan) return 'Your current plan'

      if (
        selectedChatsLimitIndex !== initialChatsLimitIndex ||
        selectedStorageLimitIndex !== initialStorageLimitIndex
      )
        return 'Update'
    }
    return 'Upgrade'
  }

  const handlePayClick = async () => {
    if (
      selectedChatsLimitIndex === undefined ||
      selectedStorageLimitIndex === undefined
    )
      return
    setIsPaying(true)
    await onPayClick({
      selectedChatsLimitIndex,
      selectedStorageLimitIndex,
    })
    setIsPaying(false)
  }

  return (
    <Stack spacing={6} p="6" rounded="lg" borderWidth="1px" flex="1" h="full">
      <Stack spacing="4">
        <Heading fontSize="2xl">
          Upgrade to <chakra.span color="orange.400">Starter</chakra.span>
        </Heading>
        <Text>For individuals & small businesses.</Text>
        <Heading>
          {formatPrice(
            computePrice(
              Plan.STARTER,
              selectedChatsLimitIndex ?? 0,
              selectedStorageLimitIndex ?? 0
            ) ?? NaN
          )}
          <chakra.span fontSize="md">/ month</chakra.span>
        </Heading>
        <FeaturesList
          features={[
            '2 seats included',
            <HStack key="test">
              <Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronLeftIcon transform="rotate(-90deg)" />}
                    size="sm"
                    isLoading={selectedChatsLimitIndex === undefined}
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
                        {parseNumberWithCommas(
                          chatsLimit.STARTER.totalIncluded
                        )}
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
              <MoreInfoTooltip>
                A chat is counted whenever a user starts a discussion. It is
                independant of the number of messages he sends and receives.
              </MoreInfoTooltip>
            </HStack>,
            <HStack key="test">
              <Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronLeftIcon transform="rotate(-90deg)" />}
                    size="sm"
                    isLoading={selectedStorageLimitIndex === undefined}
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
              <MoreInfoTooltip>
                You accumulate storage for every file that your user upload into
                your bot. If you delete the result, it will free up the space.
              </MoreInfoTooltip>
            </HStack>,
            'Branding removed',
            'File upload input block',
            'Create folders',
          ]}
        />
      </Stack>
      <Button
        colorScheme="orange"
        variant="outline"
        onClick={handlePayClick}
        isLoading={isPaying}
        isDisabled={isCurrentPlan}
      >
        {getButtonLabel()}
      </Button>
    </Stack>
  )
}
