import NextAuth, { Account } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import GitlabProvider from 'next-auth/providers/gitlab'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import AzureADProvider from 'next-auth/providers/azure-ad'
import prisma from 'libs/prisma'
import { Provider } from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { CustomAdapter } from './adapter'
import { User } from 'db'
import { env, isNotEmpty } from 'utils'
import { mockedUser } from 'services/api/utils'

const providers: Provider[] = []

if (
  isNotEmpty(process.env.GITHUB_CLIENT_ID) &&
  isNotEmpty(process.env.GITHUB_CLIENT_SECRET)
)
  providers.push(
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  )

if (isNotEmpty(env('SMTP_FROM')) && process.env.SMTP_AUTH_DISABLED !== 'true')
  providers.push(
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 25,
        secure: process.env.SMTP_SECURE
          ? process.env.SMTP_SECURE === 'true'
          : false,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: env('SMTP_FROM'),
    })
  )

if (
  isNotEmpty(process.env.GOOGLE_CLIENT_ID) &&
  isNotEmpty(process.env.GOOGLE_CLIENT_SECRET)
)
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )

if (
  isNotEmpty(process.env.FACEBOOK_CLIENT_ID) &&
  isNotEmpty(process.env.FACEBOOK_CLIENT_SECRET)
)
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  )

if (
  isNotEmpty(process.env.GITLAB_CLIENT_ID) &&
  isNotEmpty(process.env.GITLAB_CLIENT_SECRET)
) {
  const BASE_URL = process.env.GITLAB_BASE_URL || 'https://gitlab.com'
  providers.push(
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
      authorization: `${BASE_URL}/oauth/authorize?scope=read_api`,
      token: `${BASE_URL}/oauth/token`,
      userinfo: `${BASE_URL}/api/v4/user`,
      name: process.env.GITLAB_NAME || 'GitLab',
    })
  )
}

if (
  isNotEmpty(process.env.AZURE_AD_CLIENT_ID) &&
  isNotEmpty(process.env.AZURE_AD_CLIENT_SECRET) &&
  isNotEmpty(process.env.AZURE_AD_TENANT_ID)
) {
  providers.push(
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    })
  )
}

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.method === 'GET' &&
    req.url === '/api/auth/session' &&
    env('E2E_TEST') === 'true'
  ) {
    res.send({ user: mockedUser })
    return
  }
  if (req.method === 'HEAD') {
    res.status(200)
    return
  }
  NextAuth(req, res, {
    adapter: CustomAdapter(prisma),
    secret: process.env.ENCRYPTION_SECRET,
    providers,
    session: {
      strategy: 'database',
    },
    callbacks: {
      session: async ({ session, user }) => {
        const userFromDb = user as User
        await updateLastActivityDate(userFromDb)
        return {
          ...session,
          user: userFromDb,
        }
      },
      signIn: async ({ account }) => {
        if (!account) return false
        const requiredGroups = getRequiredGroups(account.provider)
        if (requiredGroups.length > 0) {
          const userGroups = await getUserGroups(account)
          return checkHasGroups(userGroups, requiredGroups)
        }
        return true
      },
    },
  })
}

const updateLastActivityDate = async (user: User) => {
  const datesAreOnSameDay = (first: Date, second: Date) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()

  if (!datesAreOnSameDay(user.lastActivityAt, new Date()))
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActivityAt: new Date() },
    })
}

const getUserGroups = async (account: Account): Promise<string[]> => {
  switch (account.provider) {
    case 'gitlab': {
      const getGitlabGroups = async (
        accessToken: string,
        page = 1
      ): Promise<{ full_path: string }[]> => {
        const res = await fetch(
          `${
            process.env.GITLAB_BASE_URL || 'https://gitlab.com'
          }/api/v4/groups?per_page=100&page=${page}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        )
        const groups: { full_path: string }[] = await res.json()
        const nextPage = parseInt(res.headers.get('X-Next-Page') || '')
        if (nextPage)
          groups.push(...(await getGitlabGroups(accessToken, nextPage)))
        return groups
      }
      const groups = await getGitlabGroups(account.access_token as string)
      return groups.map((group) => group.full_path)
    }
    default:
      return []
  }
}

const getRequiredGroups = (provider: string): string[] => {
  switch (provider) {
    case 'gitlab':
      return process.env.GITLAB_REQUIRED_GROUPS?.split(',') || []
    default:
      return []
  }
}

const checkHasGroups = (userGroups: string[], requiredGroups: string[]) =>
  userGroups?.some((userGroup) => requiredGroups?.includes(userGroup))

export default withSentry(handler)
