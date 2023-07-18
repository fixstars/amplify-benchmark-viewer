/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Box } from '@mui/material'
import type { GridColDef } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid'
import { SectionTitle } from 'components/atoms/SectionTitle'
import { Layout } from 'components/organisms'

import type { ClientInstances } from './Helpers'
import { columns } from './Helpers'

interface Props {
  readonly data: ReadonlyArray<ClientInstances>
}

export const ClientList = ({ data }: Props) => {
  const updateColumnWidth = (c: GridColDef<ClientInstances>[]) => {
    const newColumns = JSON.parse(JSON.stringify(c))
    let maxClientLength = 0
    let maxVersionLength = 0
    data.map((item) => {
      maxClientLength =
        item.client.length > maxClientLength
          ? item.client.length
          : maxClientLength
      maxVersionLength =
        item.version.length > maxVersionLength
          ? item.version.length
          : maxVersionLength
    })

    newColumns.map((item: GridColDef<ClientInstances>, i: number) => {
      if ('renderCell' in columns[i]) item.renderCell = columns[i].renderCell

      switch (item.field) {
        case 'client':
          item.minWidth = maxClientLength * 8
          break
        case 'version':
          item.minWidth = maxVersionLength * 8
          break
      }
    })

    return newColumns
  }

  return (
    <Layout>
      <Box>
        <SectionTitle title="Client List" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}
      >
        <DataGrid
          sx={{
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell.instance': {
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '5px 0 5px 0',
            },
          }}
          rows={data}
          columns={updateColumnWidth(columns)}
          pagination
          getRowId={(row) => `${row.client}_${row.version}`}
          disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: {
                // The DataGrid (MIT license) is limited to pages of up to 100 rows.
                // Reference: https://mui.com/x/react-data-grid/pagination/#size-of-the-page
                pageSize: 100,
              },
            },
          }}
          getRowHeight={() => 'auto'}
        />
      </Box>
    </Layout>
  )
}
