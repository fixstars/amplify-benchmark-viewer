/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { GridInputRowSelectionModel } from '@mui/x-data-grid'
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
      rowSelectionModel={selectedData as GridInputRowSelectionModel}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: sortedData.length,
          },
        },
      }}
      getRowHeight={() => 'auto'}
      getRowId={(row) => row.name}
      hideFooter
      disableColumnMenu
      checkboxSelection
      onRowSelectionModelChange={(item) =>
        typeof onSelected === 'function' &&
        onSelected(item as ReadonlyArray<string>)
      }
    />
  )
}
