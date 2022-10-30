import test, { expect } from '@playwright/test'
import cuid from 'cuid'
import path from 'path'
import { importTypebotInDatabase } from 'utils/playwright/databaseActions'
import { starterWorkspaceId } from 'utils/playwright/databaseSetup'

test('analytics are not available for non-pro workspaces', async ({ page }) => {
  const typebotId = cuid()
  await importTypebotInDatabase(
    path.join(__dirname, '../fixtures/typebots/results/submissionHeader.json'),
    {
      id: typebotId,
      workspaceId: starterWorkspaceId,
    }
  )
  await page.goto(`/typebots/${typebotId}/results/analytics`)
  const firstDropoffBox = page.locator('text="%" >> nth=0')
  await firstDropoffBox.hover()
  await expect(
    page.locator('text="Unlock Drop-off rate by upgrading to Pro plan"')
  ).toBeVisible()
  await firstDropoffBox.click()
  await expect(
    page.locator(
      'text="You need to upgrade your plan in order to unlock in-depth analytics"'
    )
  ).toBeVisible()
})
