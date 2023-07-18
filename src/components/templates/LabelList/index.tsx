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

import type { LabelData } from './Helpers'
import { columns } from './Helpers'

interface Props {
  readonly data: ReadonlyArray<LabelData>
}

export const LabelList = ({ data }: Props) => {
  const updateLabelColumnWidth = (c: GridColDef<LabelData>[]) => {
    const newColumns = JSON.parse(JSON.stringify(c))
    let maxCharacterLength = 0
    data.map((item) => {
      maxCharacterLength =
        item.label.length > maxCharacterLength
          ? item.label.length
          : maxCharacterLength
    })

    newColumns.map((item: GridColDef<LabelData>, i: number) => {
      if ('renderCell' in columns[i]) item.renderCell = columns[i].renderCell
      if (item.field === 'label') item.minWidth = maxCharacterLength * 8
    })

    return newColumns
  }

  return (
    <Layout>
      <Box>
        <SectionTitle title="Label List" />
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
            '&.MuiDataGrid-root .MuiDataGrid-cell': {
              flexWrap: 'wrap',
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell.instance': {
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '5px 0 5px 0',
            },
          }}
          rows={data}
          columns={updateLabelColumnWidth(columns)}
          pagination
          getRowId={(row) => `${row.label}`}
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
