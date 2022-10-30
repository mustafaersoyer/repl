import { withSentry } from '@sentry/nextjs'
import prisma from 'libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { canReadTypebot } from 'services/api/dbRules'
import { getAuthenticatedUser } from 'services/api/utils'
import { methodNotAllowed, notAuthenticated, notFound } from 'utils/api'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req)
  if (!user) return notAuthenticated(res)
  if (req.method === 'GET') {
    const typebotId = req.query.typebotId as string
    const typebot = await prisma.typebot.findFirst({
      where: canReadTypebot(typebotId, user),
    })
    if (!typebot) return notFound(res)
    return res.send({ groups: typebot.groups })
  }
  methodNotAllowed(res)
}

export default withSentry(handler)
