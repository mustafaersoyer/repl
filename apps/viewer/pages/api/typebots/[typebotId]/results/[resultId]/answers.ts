import { withSentry } from '@sentry/nextjs'
import { Answer } from 'db'
import { got } from 'got'
import prisma from 'libs/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { isNotDefined } from 'utils'
import { methodNotAllowed } from 'utils/api'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { uploadedFiles, ...answer } = (
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    ) as Answer & { uploadedFiles?: boolean }
    let storageUsed = 0
    if (uploadedFiles && answer.content.includes('http')) {
      const fileUrls = answer.content.split(', ')
      const hasReachedStorageLimit = fileUrls[0] === null
      if (!hasReachedStorageLimit) {
        for (const url of fileUrls) {
          const { headers } = await got(url)
          const size = headers['content-length']
          if (isNotDefined(size)) return
          storageUsed += parseInt(size, 10)
        }
      }
    }
    const result = await prisma.answer.upsert({
      where: {
        resultId_blockId_groupId: {
          resultId: answer.resultId,
          groupId: answer.groupId,
          blockId: answer.blockId,
        },
      },
      create: { ...answer, storageUsed: storageUsed > 0 ? storageUsed : null },
      update: { ...answer, storageUsed: storageUsed > 0 ? storageUsed : null },
    })
    return res.send(result)
  }
  return methodNotAllowed(res)
}

export default withSentry(handler)
