import { Edge, Group } from 'models'
import React, { memo } from 'react'
import { AnswersCount } from 'services/analytics'
import { Edges } from './Edges'
import { GroupNode } from './Nodes/GroupNode'

type Props = {
  edges: Edge[]
  groups: Group[]
  answersCounts?: AnswersCount[]
  onUnlockProPlanClick?: () => void
}
const GroupNodes = ({
  edges,
  groups,
  answersCounts,
  onUnlockProPlanClick,
}: Props) => {
  return (
    <>
      <Edges
        edges={edges}
        answersCounts={answersCounts}
        onUnlockProPlanClick={onUnlockProPlanClick}
      />
      {groups.map((group, idx) => (
        <GroupNode group={group} groupIndex={idx} key={group.id} />
      ))}
    </>
  )
}

export default memo(GroupNodes)
