import { FormLabel, Stack } from '@chakra-ui/react'
import { DropdownList } from 'components/shared/DropdownList'
import { SwitchWithLabel } from 'components/shared/SwitchWithLabel'
import { Input } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput'
import { RatingInputOptions, Variable } from 'models'
import React from 'react'

type RatingInputSettingsProps = {
  options: RatingInputOptions
  onOptionsChange: (options: RatingInputOptions) => void
}

export const RatingInputSettings = ({
  options,
  onOptionsChange,
}: RatingInputSettingsProps) => {
  const handleLengthChange = (length: number) =>
    onOptionsChange({ ...options, length })

  const handleTypeChange = (buttonType: 'Icons' | 'Numbers') =>
    onOptionsChange({ ...options, buttonType })

  const handleCustomIconCheck = (isEnabled: boolean) =>
    onOptionsChange({
      ...options,
      customIcon: { ...options.customIcon, isEnabled },
    })

  const handleIconSvgChange = (svg: string) =>
    onOptionsChange({ ...options, customIcon: { ...options.customIcon, svg } })

  const handleLeftLabelChange = (left: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, left } })

  const handleRightLabelChange = (right: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, right } })

  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options.labels, button } })

  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Maximum:
        </FormLabel>
        <DropdownList
          onItemSelect={handleLengthChange}
          items={[3, 4, 5, 6, 7, 8, 9, 10]}
          currentItem={options.length}
        />
      </Stack>

      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Type:
        </FormLabel>
        <DropdownList
          onItemSelect={handleTypeChange}
          items={['Icons', 'Numbers']}
          currentItem={options.buttonType}
        />
      </Stack>

      {options.buttonType === 'Icons' && (
        <SwitchWithLabel
          id="switch"
          label="Custom icon?"
          initialValue={options.customIcon.isEnabled}
          onCheckChange={handleCustomIconCheck}
        />
      )}
      {options.buttonType === 'Icons' && options.customIcon.isEnabled && (
        <Stack>
          <FormLabel mb="0" htmlFor="svg">
            Icon SVG:
          </FormLabel>
          <Input
            id="svg"
            defaultValue={options.customIcon.svg}
            onChange={handleIconSvgChange}
            placeholder="<svg>...</svg>"
          />
        </Stack>
      )}
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          {options.buttonType === 'Icons' ? '1' : '0'} label:
        </FormLabel>
        <Input
          id="button"
          defaultValue={options.labels.left}
          onChange={handleLeftLabelChange}
          placeholder="Not likely at all"
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          {options.length} label:
        </FormLabel>
        <Input
          id="button"
          defaultValue={options.labels.right}
          onChange={handleRightLabelChange}
          placeholder="Extremely likely"
        />
      </Stack>
      <Stack>
        <FormLabel mb="0" htmlFor="button">
          Button label:
        </FormLabel>
        <Input
          id="button"
          defaultValue={options.labels.button}
          onChange={handleButtonLabelChange}
        />
      </Stack>
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
