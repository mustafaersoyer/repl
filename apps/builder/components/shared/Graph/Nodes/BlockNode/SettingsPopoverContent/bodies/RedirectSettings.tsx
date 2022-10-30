import { FormLabel, Stack } from '@chakra-ui/react'
import { SwitchWithLabel } from 'components/shared/SwitchWithLabel'
import { Input } from 'components/shared/Textbox'
import { RedirectOptions } from 'models'
import React from 'react'

type Props = {
  options: RedirectOptions
  onOptionsChange: (options: RedirectOptions) => void
}

export const RedirectSettings = ({ options, onOptionsChange }: Props) => {
  const handleUrlChange = (url?: string) => onOptionsChange({ ...options, url })

  const handleIsNewTabChange = (isNewTab: boolean) =>
    onOptionsChange({ ...options, isNewTab })

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="tracking-id">
          Url:
        </FormLabel>
        <Input
          id="tracking-id"
          defaultValue={options.url ?? ''}
          placeholder="Type a URL..."
          onChange={handleUrlChange}
        />
      </Stack>
      <SwitchWithLabel
        id="new-tab"
        label="Open in new tab?"
        initialValue={options.isNewTab}
        onCheckChange={handleIsNewTabChange}
      />
    </Stack>
  )
}
