import { FormLabel, HStack, Stack } from '@chakra-ui/react'
import { SmartNumberInput } from 'components/shared/SmartNumberInput'
import { Input } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput'
import { NumberInputOptions, Variable } from 'models'
import React from 'react'
import { removeUndefinedFields } from 'services/utils'

type NumberInputSettingsBodyProps = {
  options: NumberInputOptions
  onOptionsChange: (options: NumberInputOptions) => void
}

export const NumberInputSettingsBody = ({
  options,
  onOptionsChange,
}: NumberInputSettingsBodyProps) => {
  const handlePlaceholderChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, placeholder } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })
  const handleMinChange = (min?: number) =>
    onOptionsChange(removeUndefinedFields({ ...options, min }))
  const handleMaxChange = (max?: number) =>
    onOptionsChange(removeUndefinedFields({ ...options, max }))
  const handleBlockChange = (block?: number) =>
    onOptionsChange(removeUndefinedFields({ ...options, block }))
  const handleVariableChange = (variable?: Variable) => {
    onOptionsChange({ ...options, variableId: variable?.id })
  }

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="placeholder">
          Placeholder:
        </FormLabel>
        <Input
          id="placeholder"
          defaultValue={options.labels.placeholder}
          onChange={handlePlaceholderChange}
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Button label:
        </FormLabel>
        <Input
          id="button"
          defaultValue={options?.labels?.button ?? 'Send'}
          onChange={handleButtonLabelChange}
        />
      </Stack>
      <HStack justifyContent="space-between">
        <FormLabel mb="0" htmlFor="min">
          Min:
        </FormLabel>
        <SmartNumberInput
          id="min"
          value={options.min}
          onValueChange={handleMinChange}
        />
      </HStack>
      <HStack justifyContent="space-between">
        <FormLabel mb="0" htmlFor="max">
          Max:
        </FormLabel>
        <SmartNumberInput
          id="max"
          value={options.max}
          onValueChange={handleMaxChange}
        />
      </HStack>
      <HStack justifyContent="space-between">
        <FormLabel mb="0" htmlFor="step">
          Step:
        </FormLabel>
        <SmartNumberInput
          id="step"
          value={options.step}
          onValueChange={handleBlockChange}
        />
      </HStack>
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          Save answer in a variable:
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
    </Stack>
  )
}
