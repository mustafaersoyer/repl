import {
  GridProps,
  SimpleGrid,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { Stats } from 'models'
import React from 'react'

export const StatsCards = ({
  stats,
  ...props
}: { stats?: Stats } & GridProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" {...props}>
      <Stat bgColor="white" p="4" rounded="md" boxShadow="md">
        <StatLabel>Views</StatLabel>
        {stats ? (
          <StatNumber>{stats.totalViews}</StatNumber>
        ) : (
          <Skeleton w="50%" h="10px" mt="2" />
        )}
      </Stat>
      <Stat bgColor="white" p="4" rounded="md" boxShadow="md">
        <StatLabel>Starts</StatLabel>
        {stats ? (
          <StatNumber>{stats.totalStarts}</StatNumber>
        ) : (
          <Skeleton w="50%" h="10px" mt="2" />
        )}
      </Stat>
      <Stat bgColor="white" p="4" rounded="md" boxShadow="md">
        <StatLabel>Completion rate</StatLabel>
        {stats ? (
          <StatNumber>
            {Math.round((stats.totalCompleted / stats.totalStarts) * 100)}%
          </StatNumber>
        ) : (
          <Skeleton w="50%" h="10px" mt="2" />
        )}
      </Stat>
    </SimpleGrid>
  )
}
