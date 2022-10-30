import {
  Box,
  Button,
  chakra,
  Checkbox,
  Flex,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { AlignLeftTextIcon, CalendarIcon, CodeIcon } from 'assets/icons'
import { ResultHeaderCell, ResultsTablePreferences } from 'models'
import React, { useEffect, useRef, useState } from 'react'
import { LoadingRows } from './LoadingRows'
import {
  useReactTable,
  getCoreRowModel,
  ColumnOrderState,
  ColumnDef,
} from '@tanstack/react-table'
import { BlockIcon } from 'components/editor/BlocksSideBar/BlockIcon'
import { ColumnSettingsButton } from './ColumnsSettingsButton'
import { useTypebot } from 'contexts/TypebotContext'
import { useDebounce } from 'use-debounce'
import { ResultsActionButtons } from './ResultsActionButtons'
import { Row } from './Row'
import { HeaderRow } from './HeaderRow'
import { CellValueType, TableData } from 'services/typebots/results'

type ResultsTableProps = {
  resultHeader: ResultHeaderCell[]
  data: TableData[]
  hasMore?: boolean
  preferences?: ResultsTablePreferences
  onScrollToBottom: () => void
  onLogOpenIndex: (index: number) => () => void
  onResultExpandIndex: (index: number) => () => void
}

export const ResultsTable = ({
  resultHeader,
  data,
  hasMore,
  preferences,
  onScrollToBottom,
  onLogOpenIndex,
  onResultExpandIndex,
}: ResultsTableProps) => {
  const { updateTypebot } = useTypebot()
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [columnsVisibility, setColumnsVisibility] = useState<
    Record<string, boolean>
  >(preferences?.columnsVisibility || {})
  const [columnsWidth, setColumnsWidth] = useState<Record<string, number>>(
    preferences?.columnsWidth || {}
  )
  const [debouncedColumnsWidth] = useDebounce(columnsWidth, 500)
  const [columnsOrder, setColumnsOrder] = useState<ColumnOrderState>([
    'select',
    ...(preferences?.columnsOrder
      ? resultHeader
          .map((h) => h.id)
          .sort(
            (a, b) =>
              preferences?.columnsOrder.indexOf(a) -
              preferences?.columnsOrder.indexOf(b)
          )
      : resultHeader.map((h) => h.id)),
    'logs',
  ])

  useEffect(() => {
    updateTypebot({
      resultsTablePreferences: {
        columnsVisibility,
        columnsOrder,
        columnsWidth: debouncedColumnsWidth,
      },
    })
  }, [columnsOrder, columnsVisibility, debouncedColumnsWidth, updateTypebot])

  const bottomElement = useRef<HTMLDivElement | null>(null)
  const tableWrapper = useRef<HTMLDivElement | null>(null)

  const columns = React.useMemo<ColumnDef<TableData>[]>(
    () => [
      {
        id: 'select',
        enableResizing: false,
        maxSize: 40,
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      ...resultHeader.map<ColumnDef<TableData>>((header) => ({
        id: header.id,
        accessorKey: header.label,
        size: header.isLong ? 400 : 200,
        header: () => (
          <HStack overflow="hidden" data-testid={`${header.label} header`}>
            <HeaderIcon header={header} />
            <Text>{header.label}</Text>
          </HStack>
        ),
        cell: (info) => {
          try {
            const value = info?.getValue() as CellValueType | undefined
            if (!value) return
            return value.element || value.plainText || ''
          } catch (err) {
            console.error(err)
            return
          }
        },
      })),
      {
        id: 'logs',
        enableResizing: false,
        maxSize: 110,
        header: () => (
          <HStack>
            <AlignLeftTextIcon />
            <Text>Logs</Text>
          </HStack>
        ),
        cell: ({ row }) => (
          <Button size="sm" onClick={onLogOpenIndex(row.index)}>
            See logs
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resultHeader]
  )

  const instance = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnVisibility: columnsVisibility,
      columnOrder: columnsOrder,
      columnSizing: columnsWidth,
    },
    getRowId: (row) => row.id.plainText,
    columnResizeMode: 'onChange',
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnsVisibility,
    onColumnSizingChange: setColumnsWidth,
    onColumnOrderChange: setColumnsOrder,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    if (!bottomElement.current) return
    const options: IntersectionObserverInit = {
      root: tableWrapper.current,
      threshold: 0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    if (bottomElement.current) observer.observe(bottomElement.current)
    return () => {
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomElement.current])

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0]
    if (target.isIntersecting) onScrollToBottom()
  }

  return (
    <Stack
      maxW="1600px"
      px="4"
      overflow="scroll"
      spacing={6}
      ref={tableWrapper}
    >
      <Flex w="full" justifyContent="flex-end">
        <ResultsActionButtons
          selectedResultsId={Object.keys(rowSelection)}
          onClearSelection={() => setRowSelection({})}
          mr="2"
        />
        <ColumnSettingsButton
          resultHeader={resultHeader}
          columnVisibility={columnsVisibility}
          setColumnVisibility={setColumnsVisibility}
          columnOrder={columnsOrder}
          onColumnOrderChange={instance.setColumnOrder}
        />
      </Flex>
      <Box className="table-wrapper" overflow="scroll" rounded="md">
        <chakra.table rounded="md">
          <thead>
            {instance.getHeaderGroups().map((headerGroup) => (
              <HeaderRow key={headerGroup.id} headerGroup={headerGroup} />
            ))}
          </thead>

          <tbody>
            {instance.getRowModel().rows.map((row, rowIndex) => (
              <Row
                row={row}
                key={row.id}
                bottomElement={
                  rowIndex === data.length - 10 ? bottomElement : undefined
                }
                isSelected={row.getIsSelected()}
                onExpandButtonClick={onResultExpandIndex(rowIndex)}
              />
            ))}
            {hasMore === true && (
              <LoadingRows totalColumns={columns.length - 1} />
            )}
          </tbody>
        </chakra.table>
      </Box>
    </Stack>
  )
}

const IndeterminateCheckbox = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ indeterminate, checked, ...rest }: any, ref) => {
    const defaultRef = React.useRef()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resolvedRef: any = ref || defaultRef

    return (
      <Flex justify="center" data-testid="checkbox">
        <Checkbox
          ref={resolvedRef}
          {...rest}
          isIndeterminate={indeterminate}
          isChecked={checked}
        />
      </Flex>
    )
  }
)

export const HeaderIcon = ({ header }: { header: ResultHeaderCell }) =>
  header.blockType ? (
    <BlockIcon type={header.blockType} />
  ) : header.variableId ? (
    <CodeIcon />
  ) : (
    <CalendarIcon />
  )
