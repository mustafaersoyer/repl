import test, { expect } from '@playwright/test'
import path from 'path'
import { userId } from 'utils/playwright/databaseSetup'

test.describe.configure({ mode: 'parallel' })

test('should display user info properly', async ({ page }) => {
  await page.goto('/typebots')
  await page.click('text=Settings & Members')
  const saveButton = page.locator('button:has-text("Save")')
  await expect(saveButton).toBeHidden()
  expect(
    page.locator('input[type="email"]').getAttribute('disabled')
  ).toBeDefined()
  await page.fill('#name', 'John Doe')
  expect(saveButton).toBeVisible()
  await page.setInputFiles(
    'input[type="file"]',
    path.join(__dirname, '../fixtures/avatar.jpg')
  )
  await expect(page.locator('img >> nth=1')).toHaveAttribute(
    'src',
    new RegExp(
      `http://localhost:9000/typebot/public/users/${userId}/avatar`,
      'gm'
    )
  )
  await page.click('text="Preferences"')
  await expect(page.locator('text=Trackpad')).toBeVisible()
})

test('should be able to create and delete api tokens', async ({ page }) => {
  await page.goto('/typebots')
  await page.click('text=Settings & Members')
  await expect(page.locator('text=Github')).toBeVisible()
  await page.click('text="Create"')
  await expect(page.locator('button >> text="Create token"')).toBeDisabled()
  await page.fill('[placeholder="I.e. Zapier, Github, Make.com"]', 'CLI')
  await expect(page.locator('button >> text="Create token"')).toBeEnabled()
  await page.click('button >> text="Create token"')
  await expect(page.locator('text=Please copy your token')).toBeVisible()
  await expect(page.locator('button >> text="Copy"')).toBeVisible()
  await page.click('button >> text="Done"')
  await expect(page.locator('text=CLI')).toBeVisible()
  await page.click('text="Delete" >> nth=2')
  await expect(page.locator('strong >> text="Github"')).toBeVisible()
  await page.click('button >> text="Delete" >> nth=-1')
  await expect(page.locator('button >> text="Delete" >> nth=-1')).toBeEnabled()
  await expect(page.locator('text="Github"')).toBeHidden()
})
