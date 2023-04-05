import type { GridInputSelectionModel } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import type { FilteringData } from '@types'

interface Props {
  readonly title: string
  readonly data: ReadonlyArray<FilteringData>
  readonly selectedData: ReadonlyArray<string>
  readonly onSelected?: (data: ReadonlyArray<string>) => void
}

export const FilteringTable = ({
  title,
  data,
  selectedData,
  onSelected,
}: Props) => {
  const columns = [
    {
      field: 'name',
      headerName: title,
      flex: 1,
      sortable: false,
    },
  ]
  const sortedData = [...data].sort((a, b) => {
    const prev = a.name.toLowerCase()
    const next = b.name.toLowerCase()
    return prev > next ? 1 : -1
  })

  return (
    <DataGrid
      sx={{
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
          cursor: 'pointer',
        },
        '&.MuiDataGrid-root .MuiDataGrid-cellContent': {
          cursor: 'pointer',
        },
      }}
      rows={sortedData}
      selectionModel={selectedData as GridInputSelectionModel}
      columns={columns}
      initialState={{
        pagination: {
          pageSize: sortedData.length,
        },
      }}
      getRowHeight={() => 'auto'}
      getRowId={(row) => row.name}
      hideFooter
      disableColumnMenu
      checkboxSelection
      onSelectionModelChange={(item) =>
        typeof onSelected === 'function' &&
        onSelected(item as ReadonlyArray<string>)
      }
    />
  )
}
