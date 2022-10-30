import test, { expect } from '@playwright/test'
import cuid from 'cuid'
import { Plan } from 'db'
import { addSubscriptionToWorkspace } from 'playwright/services/databaseActions'
import {
  createTypebots,
  createWorkspaces,
  deleteWorkspaces,
  injectFakeResults,
} from 'utils/playwright/databaseActions'

const usageWorkspaceId = cuid()
const usageTypebotId = cuid()
const planChangeWorkspaceId = cuid()

test.beforeAll(async () => {
  await createWorkspaces([
    {
      id: usageWorkspaceId,
      name: 'Usage Workspace',
      plan: Plan.STARTER,
    },
    {
      id: planChangeWorkspaceId,
      name: 'Plan Change Workspace',
    },
  ])
  await createTypebots([{ id: usageTypebotId, workspaceId: usageWorkspaceId }])
})

test.afterAll(async () => {
  await deleteWorkspaces([usageWorkspaceId, planChangeWorkspaceId])
})

test('should display valid usage', async ({ page }) => {
  await page.goto('/typebots')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await expect(page.locator('text="/ 10,000"')).toBeVisible()
  await expect(page.locator('text="/ 10 GB"')).toBeVisible()
  await page.click('text=Pro workspace', { force: true })

  await page.click('text=Pro workspace')
  await page.click('text="Free workspace"')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await expect(page.locator('text="/ 300"')).toBeVisible()
  await expect(page.locator('text="Storage"')).toBeHidden()
  await page.click('text=Free workspace', { force: true })

  await injectFakeResults({
    count: 10,
    typebotId: usageTypebotId,
    fakeStorage: 1100 * 1024 * 1024,
  })
  await page.click('text=Free workspace')
  await page.click('text="Usage Workspace"')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await expect(page.locator('text="/ 2,000"')).toBeVisible()
  await expect(page.locator('text="/ 2 GB"')).toBeVisible()
  await expect(page.locator('text="10" >> nth=0')).toBeVisible()
  await expect(page.locator('[role="progressbar"] >> nth=0')).toHaveAttribute(
    'aria-valuenow',
    '1'
  )
  await expect(page.locator('text="1.07 GB"')).toBeVisible()
  await expect(page.locator('[role="progressbar"] >> nth=1')).toHaveAttribute(
    'aria-valuenow',
    '54'
  )

  await injectFakeResults({
    typebotId: usageTypebotId,
    count: 1090,
    fakeStorage: 1200 * 1024 * 1024,
  })
  await page.click('text="Settings"')
  await page.click('text="Billing & Usage"')
  await expect(page.locator('text="/ 2,000"')).toBeVisible()
  await expect(page.locator('text="1,100"')).toBeVisible()
  await expect(page.locator('text="/ 2 GB"')).toBeVisible()
  await expect(page.locator('text="2.25 GB"')).toBeVisible()
  await expect(page.locator('[aria-valuenow="55"]')).toBeVisible()
  await expect(page.locator('[aria-valuenow="112"]')).toBeVisible()
})

test('plan changes should work', async ({ page }) => {
  test.setTimeout(80000)
  // Upgrade to STARTER
  await page.goto('/typebots')
  await page.click('text=Pro workspace')
  await page.click('text=Plan Change Workspace')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await page.click('button >> text="2,000"')
  await page.click('button >> text="3,500"')
  await page.click('button >> text="2"')
  await page.click('button >> text="4"')
  await expect(page.locator('text="$73"')).toBeVisible()
  await page.click('button >> text=Upgrade >> nth=0')
  await page.waitForNavigation()
  expect(page.url()).toContain('https://checkout.stripe.com')
  await expect(page.locator('text=$73.00 >> nth=0')).toBeVisible()
  await expect(page.locator('text=$30.00 >> nth=0')).toBeVisible()
  await expect(page.locator('text=$4.00 >> nth=0')).toBeVisible()
  await expect(page.locator('text=user@email.com')).toBeVisible()
  await addSubscriptionToWorkspace(
    planChangeWorkspaceId,
    [
      {
        price: process.env.STRIPE_STARTER_PRICE_ID,
        quantity: 1,
      },
    ],
    { plan: Plan.STARTER, additionalChatsIndex: 0, additionalStorageIndex: 0 }
  )

  // Update plan with additional quotas
  await page.goto('/typebots')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await expect(page.locator('text="/ 2,000"')).toBeVisible()
  await expect(page.locator('text="/ 2 GB"')).toBeVisible()
  await expect(page.locator('button >> text="2,000"')).toBeVisible()
  await expect(page.locator('button >> text="2"')).toBeVisible()
  await page.click('button >> text="2,000"')
  await page.click('button >> text="3,500"')
  await page.click('button >> text="2"')
  await page.click('button >> text="4"')
  await expect(page.locator('text="$73"')).toBeVisible()
  await page.click('button >> text=Update')
  await expect(
    page.locator(
      'text="Workspace STARTER plan successfully updated 🎉" >> nth=0'
    )
  ).toBeVisible()
  await page.click('text="Members"')
  await page.click('text="Billing & Usage"')
  await expect(page.locator('text="$73"')).toBeVisible()
  await expect(page.locator('text="/ 3,500"')).toBeVisible()
  await expect(page.locator('text="/ 4 GB"')).toBeVisible()
  await expect(page.locator('button >> text="3,500"')).toBeVisible()
  await expect(page.locator('button >> text="4"')).toBeVisible()

  // Upgrade to PRO
  await page.click('button >> text="10,000"')
  await page.click('button >> text="14,000"')
  await page.click('button >> text="10"')
  await page.click('button >> text="12"')
  await expect(page.locator('text="$133"')).toBeVisible()
  await page.click('button >> text=Upgrade')
  await expect(
    page.locator('text="Workspace PRO plan successfully updated 🎉" >> nth=0')
  ).toBeVisible()

  // Go to customer portal
  await Promise.all([
    page.waitForNavigation(),
    page.click('text="Billing Portal"'),
  ])
  await expect(page.locator('text="Add payment method"')).toBeVisible()

  // Cancel subscription
  await page.goto('/typebots')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await expect(page.locator('[data-testid="current-subscription"]')).toHaveText(
    'Current workspace subscription: ProCancel my subscription'
  )
  await page.click('button >> text="Cancel my subscription"')
  await expect(page.locator('[data-testid="current-subscription"]')).toHaveText(
    'Current workspace subscription: Free'
  )
})

test('should display invoices', async ({ page }) => {
  await page.goto('/typebots')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await expect(page.locator('text="Invoices"')).toBeHidden()
  await page.click('text=Pro workspace', { force: true })

  await page.click('text=Pro workspace')
  await page.click('text=Plan Change Workspace')
  await page.click('text=Settings & Members')
  await page.click('text=Billing & Usage')
  await expect(page.locator('text="Invoices"')).toBeVisible()
  await expect(page.locator('tr')).toHaveCount(2)
  await expect(page.locator('text="€39.00"')).toBeVisible()
})
