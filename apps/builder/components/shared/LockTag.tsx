import { Tag, TagProps } from '@chakra-ui/react'
import { LockedIcon } from 'assets/icons'
import { Plan } from 'db'
import { planColorSchemes } from './PlanTag'

export const LockTag = ({ plan, ...props }: { plan?: Plan } & TagProps) => (
  <Tag
    colorScheme={plan ? planColorSchemes[plan] : 'gray'}
    data-testid={`${plan?.toLowerCase()}-lock-tag`}
    {...props}
  >
    <LockedIcon />
  </Tag>
)
