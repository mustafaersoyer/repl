import { FormLabel, HStack, Stack, Switch, Text } from '@chakra-ui/react'
import { CodeEditor } from 'components/shared/CodeEditor'
import { Textarea } from 'components/shared/Textbox'
import { VariableSearchInput } from 'components/shared/VariableSearchInput'
import { SetVariableOptions, Variable } from 'models'
import React from 'react'

type Props = {
  options: SetVariableOptions
  onOptionsChange: (options: SetVariableOptions) => void
}

export const SetVariableSettings = ({ options, onOptionsChange }: Props) => {
  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })
  const handleExpressionChange = (expressionToEvaluate: string) =>
    onOptionsChange({ ...options, expressionToEvaluate })
  const handleValueTypeChange = () =>
    onOptionsChange({
      ...options,
      isCode: options.isCode ? !options.isCode : true,
    })

  return (
    <Stack spacing={4}>
      <Stack>
        <FormLabel mb="0" htmlFor="variable-search">
          Search or create variable:
        </FormLabel>
        <VariableSearchInput
          onSelectVariable={handleVariableChange}
          initialVariableId={options.variableId}
          id="variable-search"
        />
      </Stack>
      <Stack>
        <HStack justify="space-between">
          <FormLabel mb="0" htmlFor="expression">
            Value:
          </FormLabel>
          <HStack>
            <Text fontSize="sm">Text</Text>
            <Switch
              size="sm"
              isChecked={options.isCode ?? false}
              onChange={handleValueTypeChange}
            />
            <Text fontSize="sm">Code</Text>
          </HStack>
        </HStack>

        {options.isCode ?? false ? (
          <CodeEditor
            value={options.expressionToEvaluate ?? ''}
            onChange={handleExpressionChange}
            lang="js"
          />
        ) : (
          <Textarea
            id="expression"
            defaultValue={options.expressionToEvaluate ?? ''}
            onChange={handleExpressionChange}
          />
        )}
      </Stack>
    </Stack>
  )
}
