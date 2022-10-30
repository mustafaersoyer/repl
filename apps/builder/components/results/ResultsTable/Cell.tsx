import { chakra, Fade, Button } from '@chakra-ui/react'
import { Cell as CellProps, flexRender } from '@tanstack/react-table'
import { ExpandIcon } from 'assets/icons'
import { memo } from 'react'
import { TableData } from 'services/typebots/results'

type Props = {
  cell: CellProps<TableData, unknown>
  size: number
  isExpandButtonVisible: boolean
  cellIndex: number
  onExpandButtonClick: () => void
}

const Cell = ({
  cell,
  size,
  isExpandButtonVisible,
  cellIndex,
  onExpandButtonClick,
}: Props) => {
  return (
    <chakra.td
      key={cell.id}
      px="4"
      py="2"
      border="1px"
      borderColor="gray.200"
      whiteSpace="nowrap"
      wordBreak="normal"
      overflow="hidden"
      pos="relative"
      style={{
        minWidth: size,
        maxWidth: size,
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
      <chakra.span
        pos="absolute"
        top="0"
        right={2}
        h="full"
        display="inline-flex"
        alignItems="center"
      >
        <Fade unmountOnExit in={isExpandButtonVisible && cellIndex === 1}>
          <Button
            leftIcon={<ExpandIcon />}
            shadow="lg"
            size="xs"
            onClick={onExpandButtonClick}
          >
            Open
          </Button>
        </Fade>
      </chakra.span>
    </chakra.td>
  )
}

export default memo(
  Cell,
  (prev, next) =>
    prev.size === next.size &&
    prev.isExpandButtonVisible === next.isExpandButtonVisible
)
