import test, { expect } from '@playwright/test'
import {
  defaultSettings,
  defaultTextInputOptions,
  InputBlockType,
  Metadata,
} from 'models'
import cuid from 'cuid'
import { createTypebots } from 'utils/playwright/databaseActions'
import { parseDefaultGroupWithBlock } from 'utils/playwright/databaseHelpers'
import { typebotViewer } from 'utils/playwright/testHelpers'

test('Should correctly parse metadata', async ({ page }) => {
  const typebotId = cuid()
  const customMetadata: Metadata = {
    description: 'My custom description',
    title: 'Custom title',
    favIconUrl: 'https://www.baptistearno.com/favicon.png',
    imageUrl: 'https://www.baptistearno.com/images/site-preview.png',
  }
  await createTypebots([
    {
      id: typebotId,
      settings: {
        ...defaultSettings,
        metadata: customMetadata,
      },
      ...parseDefaultGroupWithBlock({
        type: InputBlockType.TEXT,
        options: defaultTextInputOptions,
      }),
    },
  ])
  await page.goto(`/${typebotId}-public`)
  expect(
    await page.evaluate(`document.querySelector('title').textContent`)
  ).toBe(customMetadata.title)
  expect(
    await page.evaluate(
      () => (document.querySelector('meta[name="description"]') as any).content
    )
  ).toBe(customMetadata.description)
  expect(
    await page.evaluate(
      () => (document.querySelector('meta[property="og:image"]') as any).content
    )
  ).toBe(customMetadata.imageUrl)
  expect(
    await page.evaluate(() =>
      (document.querySelector('link[rel="icon"]') as any).getAttribute('href')
    )
  ).toBe(customMetadata.favIconUrl)
  await expect(
    typebotViewer(page).locator(
      `input[placeholder="${defaultTextInputOptions.labels.placeholder}"]`
    )
  ).toBeVisible()
})
