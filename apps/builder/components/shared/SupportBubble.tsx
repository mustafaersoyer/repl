import { useTypebot } from 'contexts/TypebotContext'
import { useUser } from 'contexts/UserContext'
import { useWorkspace } from 'contexts/WorkspaceContext'
import React, { useEffect, useState } from 'react'
import { isCloudProdInstance } from 'services/utils'
import { planToReadable } from 'services/workspace'
import { initBubble } from 'typebot-js'

export const SupportBubble = () => {
  const { typebot } = useTypebot()
  const { user } = useUser()
  const { workspace } = useWorkspace()
  const [localTypebotId, setLocalTypebotId] = useState(typebot?.id)
  const [localUserId, setLocalUserId] = useState(user?.id)

  useEffect(() => {
    if (
      isCloudProdInstance() &&
      (localTypebotId !== typebot?.id || localUserId !== user?.id)
    ) {
      setLocalTypebotId(typebot?.id)
      setLocalUserId(user?.id)
      initBubble({
        url: `https://viewer.typebot.io/typebot-support`,
        backgroundColor: '#ffffff',
        button: {
          color: '#0042DA',
        },
        hiddenVariables: {
          'User ID': user?.id,
          'First name': user?.name?.split(' ')[0] ?? undefined,
          Email: user?.email ?? undefined,
          'Typebot ID': typebot?.id,
          'Avatar URL': user?.image ?? undefined,
          Plan: planToReadable(workspace?.plan),
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, typebot])

  return <></>
}
