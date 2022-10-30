import prisma from 'libs/prisma'
import { Typebot } from 'models'
import { NextApiRequest, NextApiResponse } from 'next'
import { authenticateUser, getLinkedTypebots } from 'services/api/utils'
import { parseSampleResult } from 'services/api/webhooks'
import { methodNotAllowed } from 'utils/api'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await authenticateUser(req)
  if (!user) return res.status(401).json({ message: 'Not authenticated' })
  if (req.method === 'GET') {
    const typebotId = req.query.typebotId as string
    const groupId = req.query.groupId as string
    const typebot = (await prisma.typebot.findFirst({
      where: {
        id: typebotId,
        workspace: { members: { some: { userId: user.id } } },
      },
    })) as unknown as Typebot | undefined
    if (!typebot) return res.status(400).send({ message: 'Typebot not found' })
    const linkedTypebots = await getLinkedTypebots(typebot, user)
    return res.send(await parseSampleResult(typebot, linkedTypebots)(groupId))
  }
  methodNotAllowed(res)
}

export default handler
