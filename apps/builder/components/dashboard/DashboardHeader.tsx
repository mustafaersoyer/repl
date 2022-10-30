import React from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack,
  Flex,
  SkeletonCircle,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { TypebotLogo } from 'assets/logos'
import { NextChakraLink } from 'components/nextChakra/NextChakraLink'
import {
  ChevronLeftIcon,
  HardDriveIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
} from 'assets/icons'
import { signOut } from 'next-auth/react'
import { useUser } from 'contexts/UserContext'
import { useWorkspace } from 'contexts/WorkspaceContext'
import { EmojiOrImageIcon } from 'components/shared/EmojiOrImageIcon'
import { WorkspaceSettingsModal } from './WorkspaceSettingsModal'
import { isNotDefined } from 'utils'
import { PlanTag } from 'components/shared/PlanTag'

export const DashboardHeader = () => {
  const { user } = useUser()

  const { workspace, workspaces, switchWorkspace, createWorkspace } =
    useWorkspace()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogOut = () => {
    localStorage.removeItem('workspaceId')
    signOut()
  }

  const handleCreateNewWorkspace = () =>
    createWorkspace(user?.name ?? undefined)

  return (
    <Flex w="full" borderBottomWidth="1px" justify="center">
      <Flex
        justify="space-between"
        alignItems="center"
        h="16"
        maxW="1000px"
        flex="1"
      >
        <NextChakraLink
          className="w-24"
          href="/typebots"
          data-testid="typebot-logo"
        >
          <TypebotLogo w="30px" />
        </NextChakraLink>
        <HStack>
          {user && workspace && (
            <WorkspaceSettingsModal
              isOpen={isOpen}
              onClose={onClose}
              user={user}
              workspace={workspace}
            />
          )}
          <Button
            leftIcon={<SettingsIcon />}
            onClick={onOpen}
            isLoading={isNotDefined(workspace)}
          >
            Settings & Members
          </Button>
          <Menu placement="bottom-end">
            <MenuButton as={Button} variant="outline" px="2">
              <HStack>
                <SkeletonCircle
                  isLoaded={workspace !== undefined}
                  alignItems="center"
                  display="flex"
                  boxSize="20px"
                >
                  <EmojiOrImageIcon
                    boxSize="20px"
                    icon={workspace?.icon}
                    defaultIcon={HardDriveIcon}
                  />
                </SkeletonCircle>
                {workspace && (
                  <>
                    <Text noOfLines={1} maxW="200px">
                      {workspace.name}
                    </Text>
                    <PlanTag plan={workspace.plan} />
                  </>
                )}
                <ChevronLeftIcon transform="rotate(-90deg)" />
              </HStack>
            </MenuButton>
            <MenuList>
              {workspaces
                ?.filter((w) => w.id !== workspace?.id)
                .map((workspace) => (
                  <MenuItem
                    key={workspace.id}
                    onClick={() => switchWorkspace(workspace.id)}
                  >
                    <HStack>
                      <EmojiOrImageIcon
                        icon={workspace.icon}
                        boxSize="16px"
                        defaultIcon={HardDriveIcon}
                      />
                      <Text>{workspace.name}</Text>
                      <PlanTag plan={workspace.plan} />
                    </HStack>
                  </MenuItem>
                ))}
              <MenuItem onClick={handleCreateNewWorkspace} icon={<PlusIcon />}>
                New workspace
              </MenuItem>
              <MenuItem
                onClick={handleLogOut}
                icon={<LogOutIcon />}
                color="orange.500"
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Flex>
  )
}
