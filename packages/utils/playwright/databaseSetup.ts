import { GraphNavigation, Plan, PrismaClient, WorkspaceRole } from 'db'
import { CredentialsType } from 'models'
import { encrypt } from '../api'

const prisma = new PrismaClient()

export const apiToken = 'jirowjgrwGREHE'

export const userId = 'userId'
export const otherUserId = 'otherUserId'

export const proWorkspaceId = 'proWorkspace'
export const freeWorkspaceId = 'freeWorkspace'
export const starterWorkspaceId = 'starterWorkspace'
export const lifetimeWorkspaceId = 'lifetimeWorkspaceId'

const setupWorkspaces = async () => {
  await prisma.workspace.create({
    data: {
      id: freeWorkspaceId,
      name: 'Free workspace',
      plan: Plan.FREE,
    },
  })
  await prisma.workspace.createMany({
    data: [
      {
        id: starterWorkspaceId,
        name: 'Starter workspace',
        stripeId: 'cus_LnPDugJfa18N41',
        plan: Plan.STARTER,
      },
      {
        id: proWorkspaceId,
        name: 'Pro workspace',
        plan: Plan.PRO,
      },
      {
        id: lifetimeWorkspaceId,
        name: 'Lifetime workspace',
        plan: Plan.LIFETIME,
      },
    ],
  })
}

export const setupUsers = async () => {
  await prisma.user.create({
    data: {
      id: userId,
      email: 'user@email.com',
      name: 'John Doe',
      graphNavigation: GraphNavigation.TRACKPAD,
      apiTokens: {
        createMany: {
          data: [
            {
              name: 'Token 1',
              token: apiToken,
              createdAt: new Date(2022, 1, 1),
            },
            {
              name: 'Github',
              token: 'jirowjgrwGREHEgdrgithub',
              createdAt: new Date(2022, 1, 2),
            },
            {
              name: 'N8n',
              token: 'jirowjgrwGREHrgwhrwn8n',
              createdAt: new Date(2022, 1, 3),
            },
          ],
        },
      },
    },
  })
  await prisma.user.create({
    data: { id: otherUserId, email: 'other-user@email.com', name: 'James Doe' },
  })
  return prisma.memberInWorkspace.createMany({
    data: [
      {
        role: WorkspaceRole.ADMIN,
        userId,
        workspaceId: freeWorkspaceId,
      },
      {
        role: WorkspaceRole.ADMIN,
        userId,
        workspaceId: starterWorkspaceId,
      },
      {
        role: WorkspaceRole.ADMIN,
        userId,
        workspaceId: proWorkspaceId,
      },
      {
        role: WorkspaceRole.ADMIN,
        userId,
        workspaceId: lifetimeWorkspaceId,
      },
    ],
  })
}

const setupCredentials = () => {
  const { encryptedData, iv } = encrypt({
    expiry_date: 1642441058842,
    access_token:
      'ya29.A0ARrdaM--PV_87ebjywDJpXKb77NBFJl16meVUapYdfNv6W6ZzqqC47fNaPaRjbDbOIIcp6f49cMaX5ndK9TAFnKwlVqz3nrK9nLKqgyDIhYsIq47smcAIZkK56SWPx3X3DwAFqRu2UPojpd2upWwo-3uJrod',
    // This token is linked to a test Google account (typebot.test.user@gmail.com)
    refresh_token:
      '1//039xWRt8YaYa3CgYIARAAGAMSNwF-L9Iru9FyuTrDSa7lkSceggPho83kJt2J29G69iEhT1C6XV1vmo6bQS9puL_R2t8FIwR3gek',
  })
  return prisma.credentials.createMany({
    data: [
      {
        name: 'pro-user@email.com',
        type: CredentialsType.GOOGLE_SHEETS,
        data: encryptedData,
        workspaceId: proWorkspaceId,
        iv,
      },
    ],
  })
}

export const setupDatabase = async () => {
  await setupWorkspaces()
  await setupUsers()
  return setupCredentials()
}

export const teardownDatabase = async () => {
  await prisma.workspace.deleteMany({
    where: {
      members: {
        some: { userId: { in: [userId, otherUserId] } },
      },
    },
  })
  await prisma.user.deleteMany({
    where: { id: { in: [userId, otherUserId] } },
  })
  return prisma.webhook.deleteMany()
}
