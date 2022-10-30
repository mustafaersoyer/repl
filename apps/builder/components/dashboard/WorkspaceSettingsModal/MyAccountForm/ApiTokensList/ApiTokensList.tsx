import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Text,
  Heading,
  Checkbox,
  Skeleton,
  Stack,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import { ConfirmModal } from 'components/modals/ConfirmModal'
import { useToast } from 'components/shared/hooks/useToast'
import { User } from 'db'
import React, { useState } from 'react'
import {
  ApiTokenFromServer,
  deleteApiToken,
  useApiTokens,
} from 'services/user/apiTokens'
import { timeSince } from 'services/utils'
import { byId, isDefined } from 'utils'
import { CreateTokenModal } from './CreateTokenModal'

type Props = { user: User }

export const ApiTokensList = ({ user }: Props) => {
  const { showToast } = useToast()
  const { apiTokens, isLoading, mutate } = useApiTokens({
    userId: user.id,
    onError: (e) =>
      showToast({ title: 'Failed to fetch tokens', description: e.message }),
  })
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()
  const [deletingId, setDeletingId] = useState<string>()

  const refreshListWithNewToken = (token: ApiTokenFromServer) => {
    if (!apiTokens) return
    mutate({ apiTokens: [token, ...apiTokens] })
  }

  const deleteToken = async (tokenId?: string) => {
    if (!apiTokens || !tokenId) return
    const { error } = await deleteApiToken({ userId: user.id, tokenId })
    if (!error) mutate({ apiTokens: apiTokens.filter((t) => t.id !== tokenId) })
  }

  return (
    <Stack spacing={4}>
      <Heading fontSize="2xl">API tokens</Heading>
      <Text>
        These tokens allow other apps to control your whole account and
        typebots. Be careful!
      </Text>
      <Flex justifyContent="flex-end">
        <Button onClick={onCreateOpen}>Create</Button>
        <CreateTokenModal
          userId={user.id}
          isOpen={isCreateOpen}
          onNewToken={refreshListWithNewToken}
          onClose={onCreateClose}
        />
      </Flex>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th w="130px">Created</Th>
              <Th w="0" />
            </Tr>
          </Thead>
          <Tbody>
            {apiTokens?.map((token) => (
              <Tr key={token.id}>
                <Td>{token.name}</Td>
                <Td>{timeSince(token.createdAt)} ago</Td>
                <Td>
                  <Button
                    size="xs"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => setDeletingId(token.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
            {isLoading &&
              Array.from({ length: 3 }).map((_, idx) => (
                <Tr key={idx}>
                  <Td>
                    <Checkbox isDisabled />
                  </Td>
                  <Td>
                    <Skeleton h="5px" />
                  </Td>
                  <Td>
                    <Skeleton h="5px" />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ConfirmModal
        isOpen={isDefined(deletingId)}
        onConfirm={() => deleteToken(deletingId)}
        onClose={() => setDeletingId(undefined)}
        message={
          <Text>
            The token <strong>{apiTokens?.find(byId(deletingId))?.name}</strong>{' '}
            will be permanently deleted, are you sure you want to continue?
          </Text>
        }
        confirmButtonLabel="Delete"
      />
    </Stack>
  )
}
