import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from 'db'
import prisma from 'libs/prisma'
import { googleSheetsScopes } from './consent-url'
import { stringify } from 'querystring'
import { CredentialsType } from 'models'
import { badRequest, encrypt, notAuthenticated } from 'utils/api'
import { oauth2Client } from 'libs/google-sheets'
import { withSentry } from '@sentry/nextjs'
import { getAuthenticatedUser } from 'services/api/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getAuthenticatedUser(req)
  if (!user) return notAuthenticated(res)
  const state = req.query.state as string | undefined
  if (!state) return badRequest(res)
  const { redirectUrl, blockId, workspaceId } = JSON.parse(
    Buffer.from(state, 'base64').toString()
  )
  if (req.method === 'GET') {
    const code = req.query.code as string | undefined
    if (!workspaceId) return badRequest(res)
    if (!code)
      return res.status(400).send({ message: "Bad request, couldn't get code" })
    const { tokens } = await oauth2Client.getToken(code)
    if (!tokens?.access_token) {
      console.error('Error getting oAuth tokens:')
      throw new Error('ERROR')
    }
    oauth2Client.setCredentials(tokens)
    const { email, scopes } = await oauth2Client.getTokenInfo(
      tokens.access_token
    )
    if (!email)
      return res
        .status(400)
        .send({ message: "Couldn't get email from getTokenInfo" })
    if (googleSheetsScopes.some((scope) => !scopes.includes(scope)))
      return res
        .status(400)
        .send({ message: "User didn't accepted required scopes" })
    const { encryptedData, iv } = encrypt(tokens)
    const credentials = {
      name: email,
      type: CredentialsType.GOOGLE_SHEETS,
      workspaceId,
      data: encryptedData,
      iv,
    } as Prisma.CredentialsUncheckedCreateInput
    const { id: credentialsId } = await prisma.credentials.create({
      data: credentials,
    })
    const queryParams = stringify({ blockId, credentialsId })
    res.redirect(
      `${redirectUrl}?${queryParams}` ?? `${process.env.NEXTAUTH_URL}`
    )
  }
}

export default withSentry(handler)
