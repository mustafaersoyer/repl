import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { WorkspaceRole } from 'db'
import React from 'react'
import { convertWorkspaceRoleToReadable } from './AddMemberForm'

type Props = {
  image?: string
  name?: string
  email: string
  role: WorkspaceRole
  isGuest?: boolean
  isMe?: boolean
  canEdit: boolean
  onDeleteClick: () => void
  onSelectNewRole: (role: WorkspaceRole) => void
}

export const MemberItem = ({
  email,
  name,
  image,
  role,
  isGuest = false,
  isMe = false,
  canEdit,
  onDeleteClick,
  onSelectNewRole,
}: Props) => {
  const handleAdminClick = () => onSelectNewRole(WorkspaceRole.ADMIN)
  const handleMemberClick = () => onSelectNewRole(WorkspaceRole.MEMBER)
  return (
    <Menu placement="bottom-end" isLazy>
      <MenuButton _hover={{ backgroundColor: 'gray.100' }} borderRadius="md">
        <MemberIdentityContent
          email={email}
          name={name}
          image={image}
          isGuest={isGuest}
          tag={convertWorkspaceRoleToReadable(role)}
        />
      </MenuButton>
      {!isMe && canEdit && (
        <MenuList shadow="lg">
          <MenuItem onClick={handleAdminClick}>
            {convertWorkspaceRoleToReadable(WorkspaceRole.ADMIN)}
          </MenuItem>
          <MenuItem onClick={handleMemberClick}>
            {convertWorkspaceRoleToReadable(WorkspaceRole.MEMBER)}
          </MenuItem>
          <MenuItem color="red.500" onClick={onDeleteClick}>
            Remove
          </MenuItem>
        </MenuList>
      )}
    </Menu>
  )
}

export const MemberIdentityContent = ({
  name,
  tag,
  isGuest = false,
  image,
  email,
}: {
  name?: string
  tag?: string
  image?: string
  isGuest?: boolean
  email: string
}) => (
  <HStack justifyContent="space-between" maxW="full" p="2">
    <HStack minW={0} spacing="4">
      <Avatar name={name} src={image} size="sm" />
      <Stack spacing={0} minW="0">
        {name && (
          <Text textAlign="left" fontSize="15px">
            {name}
          </Text>
        )}
        <Text
          color="gray.500"
          fontSize={name ? '14px' : 'inherit'}
          noOfLines={1}
        >
          {email}
        </Text>
      </Stack>
    </HStack>
    <HStack flexShrink={0}>
      {isGuest && (
        <Tag color="gray.400" data-testid="tag">
          Pending
        </Tag>
      )}
      <Tag data-testid="tag">{tag}</Tag>
    </HStack>
  </HStack>
)
