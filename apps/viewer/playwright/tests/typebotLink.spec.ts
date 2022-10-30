import test, { expect } from '@playwright/test'
import path from 'path'
import { importTypebotInDatabase } from 'utils/playwright/databaseActions'
import { typebotViewer } from 'utils/playwright/testHelpers'

test('should work as expected', async ({ page }) => {
  const typebotId = 'cl0ibhi7s0018n21aarlmg0cm'
  const linkedTypebotId = 'cl0ibhv8d0130n21aw8doxhj5'
  await importTypebotInDatabase(
    path.join(__dirname, '../fixtures/typebots/linkTypebots/1.json'),
    { id: typebotId, publicId: `${typebotId}-public` }
  )
  await importTypebotInDatabase(
    path.join(__dirname, '../fixtures/typebots/linkTypebots/2.json'),
    { id: linkedTypebotId, publicId: `${linkedTypebotId}-public` }
  )

  await page.goto(`/${typebotId}-public`)
  await typebotViewer(page).locator('input').fill('Hello there!')
  await Promise.all([
    page.waitForResponse(
      (resp) =>
        resp.request().url().includes(`/api/typebots/t/results`) &&
        resp.status() === 200 &&
        resp.request().method() === 'PUT'
    ),
    typebotViewer(page).locator('input').press('Enter'),
  ])
  await page.goto(`${process.env.BUILDER_URL}/typebots/${typebotId}/results`)
  await expect(page.locator('text=Hello there!')).toBeVisible()
})
