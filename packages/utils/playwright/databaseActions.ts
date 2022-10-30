import { Plan, PrismaClient, User, Workspace, WorkspaceRole } from 'db'
import cuid from 'cuid'
import { Typebot, Webhook } from 'models'
import { readFileSync } from 'fs'
import { proWorkspaceId, userId } from './databaseSetup'
import {
  parseTestTypebot,
  parseTypebotToPublicTypebot,
} from './databaseHelpers'

const prisma = new PrismaClient()

type CreateFakeResultsProps = {
  typebotId: string
  count: number
  customResultIdPrefix?: string
  isChronological?: boolean
  fakeStorage?: number
}

export const injectFakeResults = async ({
  count,
  customResultIdPrefix,
  typebotId,
  isChronological,
  fakeStorage,
}: CreateFakeResultsProps) => {
  const resultIdPrefix = customResultIdPrefix ?? cuid()
  await prisma.result.createMany({
    data: [
      ...Array.from(Array(count)).map((_, idx) => {
        const today = new Date()
        const rand = Math.random()
        return {
          id: `${resultIdPrefix}-result${idx}`,
          typebotId,
          createdAt: isChronological
            ? new Date(
                today.setTime(today.getTime() + 1000 * 60 * 60 * 24 * idx)
              )
            : new Date(),
          isCompleted: rand > 0.5,
          hasStarted: true,
        }
      }),
    ],
  })
  return createAnswers({ fakeStorage, resultIdPrefix, count })
}

const createAnswers = ({
  count,
  resultIdPrefix,
  fakeStorage,
}: { resultIdPrefix: string } & Pick<
  CreateFakeResultsProps,
  'fakeStorage' | 'count'
>) => {
  return prisma.answer.createMany({
    data: [
      ...Array.from(Array(count)).map((_, idx) => ({
        resultId: `${resultIdPrefix}-result${idx}`,
        content: `content${idx}`,
        blockId: 'block1',
        groupId: 'block1',
        storageUsed: fakeStorage ? Math.round(fakeStorage / count) : null,
      })),
    ],
  })
}

export const importTypebotInDatabase = async (
  path: string,
  updates?: Partial<Typebot>
) => {
  const typebot: Typebot = {
    ...JSON.parse(readFileSync(path).toString()),
    workspaceId: proWorkspaceId,
    ...updates,
  }
  await prisma.typebot.create({
    data: typebot,
  })
  return prisma.publicTypebot.create({
    data: parseTypebotToPublicTypebot(
      updates?.id ? `${updates?.id}-public` : 'publicBot',
      typebot
    ),
  })
}

export const deleteWorkspaces = async (workspaceIds: string[]) => {
  await prisma.workspace.deleteMany({
    where: { id: { in: workspaceIds } },
  })
}

export const createWorkspaces = async (workspaces: Partial<Workspace>[]) => {
  const workspaceIds = workspaces.map((workspace) => workspace.id ?? cuid())
  await prisma.workspace.createMany({
    data: workspaces.map((workspace, index) => ({
      id: workspaceIds[index],
      name: 'Free workspace',
      plan: Plan.FREE,
      ...workspace,
    })),
  })
  await prisma.memberInWorkspace.createMany({
    data: workspaces.map((_, index) => ({
      userId,
      workspaceId: workspaceIds[index],
      role: WorkspaceRole.ADMIN,
    })),
  })
  return workspaceIds
}

export const updateUser = (data: Partial<User>) =>
  prisma.user.update({
    data,
    where: {
      id: userId,
    },
  })

export const createWebhook = async (
  typebotId: string,
  webhookProps?: Partial<Webhook>
) => {
  try {
    await prisma.webhook.delete({ where: { id: 'webhook1' } })
  } catch {}
  return prisma.webhook.create({
    data: { method: 'GET', typebotId, id: 'webhook1', ...webhookProps },
  })
}

export const createTypebots = async (partialTypebots: Partial<Typebot>[]) => {
  const typebotsWithId = partialTypebots.map((typebot) => {
    const typebotId = typebot.id ?? cuid()
    return {
      ...typebot,
      id: typebotId,
      publicId: typebotId + '-public',
    }
  })
  await prisma.typebot.createMany({
    data: typebotsWithId.map(parseTestTypebot),
  })
  return prisma.publicTypebot.createMany({
    data: typebotsWithId.map((t) =>
      parseTypebotToPublicTypebot(t.id + '-public', parseTestTypebot(t))
    ),
  })
}

export const updateTypebot = async (
  partialTypebot: Partial<Typebot> & { id: string }
) => {
  await prisma.typebot.updateMany({
    where: { id: partialTypebot.id },
    data: partialTypebot,
  })
  return prisma.publicTypebot.updateMany({
    where: { typebotId: partialTypebot.id },
    data: partialTypebot,
  })
}
