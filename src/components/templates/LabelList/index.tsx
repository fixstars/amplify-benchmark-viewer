/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { SectionTitle } from 'components/atoms/SectionTitle'
import { Layout } from 'components/organisms'

import type { LabelData } from './Helpers'
import { columns } from './Helpers'

interface Props {
  readonly data: ReadonlyArray<LabelData>
}

export const LabelList = ({ data }: Props) => {
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
          columns={columns}
          hideFooter
          getRowId={(row) => `${row.label}`}
          disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: data.length,
              },
            },
          }}
          getRowHeight={() => 'auto'}
        />
      </Box>
    </Layout>
  )
}
