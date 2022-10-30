import test, { expect } from '@playwright/test'
import cuid from 'cuid'
import { CollaborationType, Plan, WorkspaceRole } from 'db'
import prisma from 'libs/prisma'
import { InputBlockType, defaultTextInputOptions } from 'models'
import { createFolder } from 'playwright/services/databaseActions'
import {
  createTypebots,
  injectFakeResults,
} from 'utils/playwright/databaseActions'
import { parseDefaultGroupWithBlock } from 'utils/playwright/databaseHelpers'
import { userId } from 'utils/playwright/databaseSetup'

test.describe('Typebot owner', () => {
  test('Can invite collaborators', async ({ page }) => {
    const typebotId = cuid()
    const guestWorkspaceId = cuid()
    await prisma.workspace.create({
      data: {
        id: guestWorkspaceId,
        name: 'Guest Workspace',
        plan: Plan.FREE,
        members: {
          createMany: {
            data: [{ role: WorkspaceRole.ADMIN, userId }],
          },
        },
      },
    })
    await createTypebots([
      {
        id: typebotId,
        name: 'Guest typebot',
        workspaceId: guestWorkspaceId,
        ...parseDefaultGroupWithBlock({
          type: InputBlockType.TEXT,
          options: defaultTextInputOptions,
        }),
      },
    ])
    await page.goto(`/typebots/${typebotId}/edit`)
    await page.click('button[aria-label="Show collaboration menu"]')
    await expect(page.locator('text=Free user')).toBeHidden()
    await page.fill(
      'input[placeholder="colleague@company.com"]',
      'guest@email.com'
    )
    await page.click('text=Can view')
    await page.click('text=Can edit')
    await page.click('text=Invite')
    await expect(page.locator('text=Pending')).toBeVisible()
    await expect(page.locator('text=Free user')).toBeHidden()
    await page.fill(
      'input[placeholder="colleague@company.com"]',
      'other-user@email.com'
    )
    await page.click('text=Can edit')
    await page.click('text=Can view')
    await page.click('text=Invite')
    await expect(page.locator('text=James Doe')).toBeVisible()
    await page.click('text="guest@email.com"')
    await page.click('text="Remove"')
    await expect(page.locator('text="guest@email.com"')).toBeHidden()
  })
})

test.describe('Guest', () => {
  test('should have shared typebots displayed', async ({ page }) => {
    const typebotId = cuid()
    const guestWorkspaceId = cuid()
    await prisma.workspace.create({
      data: {
        id: guestWorkspaceId,
        name: 'Guest Workspace #2',
        plan: Plan.FREE,
        members: {
          createMany: {
            data: [{ role: WorkspaceRole.GUEST, userId }],
          },
        },
      },
    })
    await createTypebots([
      {
        id: typebotId,
        name: 'Guest typebot',
        workspaceId: guestWorkspaceId,
        ...parseDefaultGroupWithBlock({
          type: InputBlockType.TEXT,
          options: defaultTextInputOptions,
        }),
      },
      {
        name: 'Another typebot',
        workspaceId: guestWorkspaceId,
      },
    ])
    await prisma.collaboratorsOnTypebots.create({
      data: {
        typebotId,
        userId,
        type: CollaborationType.READ,
      },
    })
    await createFolder(guestWorkspaceId, 'Guest folder')
    await injectFakeResults({ typebotId, count: 10 })
    await page.goto(`/typebots`)
    await page.click('text=Pro workspace')
    await page.click('text=Guest workspace #2')
    await expect(page.locator('text=Guest typebot')).toBeVisible()
    await expect(page.locator('text=Another typebot')).toBeHidden()
    await expect(page.locator('text=Guest folder')).toBeHidden()
    await page.click('text=Guest typebot')
    await page.click('button[aria-label="Show collaboration menu"]')
    await page.click('text=Everyone at Guest workspace')
    await expect(page.locator('text="Remove"')).toBeHidden()
    await expect(page.locator('text=John Doe')).toBeVisible()
    await page.click('text=Group #1', { force: true })
    await expect(page.locator('input[value="Group #1"]')).toBeHidden()
    await page.goto(`/typebots/${typebotId}/results`)
    await expect(page.locator('text="See logs" >> nth=9')).toBeVisible()
  })
})
