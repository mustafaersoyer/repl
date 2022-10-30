import { withSentry } from '@sentry/nextjs'
import { DashboardFolder } from 'db'
import prisma from 'libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAuthenticatedUser } from 'services/api/utils'
import { methodNotAllowed, notAuthenticated } from 'utils/api'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req)
  if (!user) return notAuthenticated(res)

  const id = req.query.id as string
  if (req.method === 'GET') {
    const folder = await prisma.dashboardFolder.findFirst({
      where: {
        id,
        workspace: { members: { some: { userId: user.id } } },
      },
    })
    return res.send({ folder })
  }
  if (req.method === 'DELETE') {
    const folders = await prisma.dashboardFolder.deleteMany({
      where: { id, workspace: { members: { some: { userId: user.id } } } },
    })
    return res.send({ folders })
  }
  if (req.method === 'PATCH') {
    const data = (
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    ) as Partial<DashboardFolder>
    const folders = await prisma.dashboardFolder.updateMany({
      where: {
        id,
        workspace: { members: { some: { userId: user.id } } },
      },
      data,
    })
    return res.send({ typebots: folders })
  }
  return methodNotAllowed(res)
}

export default withSentry(handler)
