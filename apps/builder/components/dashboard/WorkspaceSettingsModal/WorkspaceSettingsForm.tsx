import {
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { ConfirmModal } from 'components/modals/ConfirmModal'
import { EditableEmojiOrImageIcon } from 'components/shared/EditableEmojiOrImageIcon'
import { Input } from 'components/shared/Textbox'
import { useWorkspace } from 'contexts/WorkspaceContext'
import React from 'react'

export const WorkspaceSettingsForm = ({ onClose }: { onClose: () => void }) => {
  const { workspace, workspaces, updateWorkspace, deleteCurrentWorkspace } =
    useWorkspace()

  const handleNameChange = (name: string) => {
    if (!workspace?.id) return
    updateWorkspace(workspace?.id, { name })
  }

  const handleChangeIcon = (icon: string) => {
    if (!workspace?.id) return
    updateWorkspace(workspace?.id, { icon })
  }

  const handleDeleteClick = async () => {
    await deleteCurrentWorkspace()
    onClose()
  }

  return (
    <Stack spacing="6" w="full">
      <FormControl>
        <FormLabel>Icon</FormLabel>
        <Flex>
          <EditableEmojiOrImageIcon
            icon={workspace?.icon}
            onChangeIcon={handleChangeIcon}
            boxSize="40px"
          />
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        {workspace && (
          <Input
            id="name"
            withVariableButton={false}
            defaultValue={workspace?.name}
            onChange={handleNameChange}
          />
        )}
      </FormControl>
      {workspace && workspaces && workspaces.length > 1 && (
        <DeleteWorkspaceButton
          onConfirm={handleDeleteClick}
          workspaceName={workspace?.name}
        />
      )}
    </Stack>
  )
}

const DeleteWorkspaceButton = ({
  workspaceName,
  onConfirm,
}: {
  workspaceName: string
  onConfirm: () => Promise<void>
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme="red" variant="outline" onClick={onOpen}>
        Delete workspace
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onConfirm={onConfirm}
        onClose={onClose}
        message={
          <Text>
            Are you sure you want to delete {workspaceName} workspace? All its
            folders, typebots and results will be deleted forever.'
          </Text>
        }
        confirmButtonLabel="Delete"
      />
    </>
  )
}
