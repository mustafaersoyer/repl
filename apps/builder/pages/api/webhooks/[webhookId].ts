import { withSentry } from '@sentry/nextjs'
import { CollaborationType } from 'db'
import prisma from 'libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAuthenticatedUser } from 'services/api/utils'
import {
  badRequest,
  forbidden,
  methodNotAllowed,
  notAuthenticated,
} from 'utils/api'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req)
  if (!user) return notAuthenticated(res)
  const webhookId = req.query.webhookId as string
  if (req.method === 'GET') {
    const webhook = await prisma.webhook.findFirst({
      where: {
        id: webhookId,
        typebot: {
          OR: [
            { workspace: { members: { some: { userId: user.id } } } },
            {
              collaborators: {
                some: {
                  userId: user.id,
                },
              },
            },
          ],
        },
      },
    })
    return res.send({ webhook })
  }
  if (req.method === 'PUT') {
    const data = req.body
    if (!('typebotId' in data)) return badRequest(res)
    const typebot = await prisma.typebot.findFirst({
      where: {
        OR: [
          {
            id: data.typebotId,
            workspace: { members: { some: { userId: user.id } } },
          },
          {
            collaborators: {
              some: {
                userId: user.id,
                type: CollaborationType.WRITE,
              },
            },
          },
        ],
      },
    })
    if (!typebot) return forbidden(res)
    const webhook = await prisma.webhook.upsert({
      where: {
        id: webhookId,
      },
      create: data,
      update: data,
    })
    return res.send({ webhook })
  }
  methodNotAllowed(res)
}

export default withSentry(handler)
