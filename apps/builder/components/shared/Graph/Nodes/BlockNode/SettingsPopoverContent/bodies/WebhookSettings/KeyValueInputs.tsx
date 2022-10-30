import { Stack, FormControl, FormLabel } from '@chakra-ui/react'
import { Input } from 'components/shared/Textbox'
import { TableListItemProps } from 'components/shared/TableList'
import { KeyValue } from 'models'

export const QueryParamsInputs = (props: TableListItemProps<KeyValue>) => (
  <KeyValueInputs
    {...props}
    keyPlaceholder="e.g. email"
    valuePlaceholder="e.g. {{Email}}"
  />
)

export const HeadersInputs = (props: TableListItemProps<KeyValue>) => (
  <KeyValueInputs
    {...props}
    keyPlaceholder="e.g. Content-Type"
    valuePlaceholder="e.g. application/json"
  />
)

export const KeyValueInputs = ({
  item,
  onItemChange,
  keyPlaceholder,
  valuePlaceholder,
  debounceTimeout,
}: TableListItemProps<KeyValue> & {
  keyPlaceholder?: string
  valuePlaceholder?: string
}) => {
  const handleKeyChange = (key: string) => {
    if (key === item.key) return
    onItemChange({ ...item, key })
  }
  const handleValueChange = (value: string) => {
    if (value === item.value) return
    onItemChange({ ...item, value })
  }
  return (
    <Stack p="4" rounded="md" flex="1" borderWidth="1px">
      <FormControl>
        <FormLabel htmlFor={'key' + item.id}>Key:</FormLabel>
        <Input
          id={'key' + item.id}
          defaultValue={item.key ?? ''}
          onChange={handleKeyChange}
          placeholder={keyPlaceholder}
          debounceTimeout={debounceTimeout}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={'value' + item.id}>Value:</FormLabel>
        <Input
          id={'value' + item.id}
          defaultValue={item.value ?? ''}
          onChange={handleValueChange}
          placeholder={valuePlaceholder}
          debounceTimeout={debounceTimeout}
        />
      </FormControl>
    </Stack>
  )
}
