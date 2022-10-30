import test, { expect } from '@playwright/test'
import { createTypebots } from 'utils/playwright/databaseActions'
import { parseDefaultGroupWithBlock } from 'utils/playwright/databaseHelpers'
import { defaultTextInputOptions, InputBlockType } from 'models'
import { typebotViewer } from 'utils/playwright/testHelpers'
import cuid from 'cuid'

test.describe.parallel('Text input block', () => {
  test('options should work', async ({ page }) => {
    const typebotId = cuid()
    await createTypebots([
      {
        id: typebotId,
        ...parseDefaultGroupWithBlock({
          type: InputBlockType.TEXT,
          options: defaultTextInputOptions,
        }),
      },
    ])

    await page.goto(`/typebots/${typebotId}/edit`)

    await page.click('text=Preview')
    await expect(
      typebotViewer(page).locator(
        `input[placeholder="${defaultTextInputOptions.labels.placeholder}"]`
      )
    ).toHaveAttribute('type', 'text')
    await expect(typebotViewer(page).locator(`button`)).toBeDisabled()

    await page.click(`text=${defaultTextInputOptions.labels.placeholder}`)
    await page.fill('#placeholder', 'Your name...')
    await page.fill('#button', 'Go')
    await page.click('text=Long text?')

    await page.click('text=Restart')
    await expect(
      typebotViewer(page).locator(`textarea[placeholder="Your name..."]`)
    ).toBeVisible()
    await expect(typebotViewer(page).locator(`text=Go`)).toBeVisible()
  })
})
