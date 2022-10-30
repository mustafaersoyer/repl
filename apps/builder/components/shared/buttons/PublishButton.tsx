import {
  Button,
  HStack,
  IconButton,
  Stack,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  ButtonProps,
} from '@chakra-ui/react'
import {
  ChevronLeftIcon,
  CloudOffIcon,
  LockedIcon,
  UnlockedIcon,
} from 'assets/icons'
import { useTypebot } from 'contexts/TypebotContext/TypebotContext'
import { useWorkspace } from 'contexts/WorkspaceContext'
import { InputBlockType } from 'models'
import { useRouter } from 'next/router'
import { timeSince } from 'services/utils'
import { isFreePlan } from 'services/workspace'
import { isNotDefined } from 'utils'
import { LimitReached, ChangePlanModal } from '../modals/ChangePlanModal'

export const PublishButton = (props: ButtonProps) => {
  const { workspace } = useWorkspace()
  const { push, query } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isPublishing,
    isPublished,
    publishTypebot,
    publishedTypebot,
    restorePublishedTypebot,
    typebot,
    isSavingLoading,
    updateTypebot,
    unpublishTypebot,
    save,
  } = useTypebot()

  const hasInputFile = typebot?.groups
    .flatMap((g) => g.blocks)
    .some((b) => b.type === InputBlockType.FILE)

  const handlePublishClick = () => {
    if (isFreePlan(workspace) && hasInputFile) return onOpen()
    publishTypebot()
    if (!publishedTypebot) push(`/typebots/${query.typebotId}/share`)
  }

  const closeTypebot = async () => {
    updateTypebot({ isClosed: true })
    await save()
  }

  const openTypebot = async () => {
    updateTypebot({ isClosed: false })
    await save()
  }

  return (
    <HStack spacing="1px">
      <ChangePlanModal
        isOpen={isOpen}
        onClose={onClose}
        type={LimitReached.FILE_INPUT}
      />
      <Tooltip
        borderRadius="md"
        hasArrow
        placement="bottom-end"
        label={
          <Stack>
            <Text>There are non published changes.</Text>
            <Text fontStyle="italic">
              Published version from{' '}
              {publishedTypebot &&
                timeSince(publishedTypebot.updatedAt.toString())}{' '}
              ago
            </Text>
          </Stack>
        }
        isDisabled={isNotDefined(publishedTypebot) || isPublished}
      >
        <Button
          colorScheme="blue"
          isLoading={isPublishing || isSavingLoading}
          isDisabled={isPublished}
          onClick={handlePublishClick}
          borderRightRadius={publishedTypebot ? 0 : undefined}
          {...props}
        >
          {isPublished
            ? typebot?.isClosed
              ? 'Closed'
              : 'Published'
            : 'Publish'}
        </Button>
      </Tooltip>

      {publishedTypebot && (
        <Menu>
          <MenuButton
            as={IconButton}
            colorScheme={'blue'}
            borderLeftRadius={0}
            icon={<ChevronLeftIcon transform="rotate(-90deg)" />}
            aria-label="Show published typebot menu"
            size="sm"
            isDisabled={isPublishing || isSavingLoading}
          />
          <MenuList>
            {!isPublished && (
              <MenuItem onClick={restorePublishedTypebot}>
                Restore published version
              </MenuItem>
            )}
            {!typebot?.isClosed ? (
              <MenuItem onClick={closeTypebot} icon={<LockedIcon />}>
                Close typebot to new responses
              </MenuItem>
            ) : (
              <MenuItem onClick={openTypebot} icon={<UnlockedIcon />}>
                Reopen typebot to new responses
              </MenuItem>
            )}
            <MenuItem onClick={unpublishTypebot} icon={<CloudOffIcon />}>
              Unpublish typebot
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </HStack>
  )
}
