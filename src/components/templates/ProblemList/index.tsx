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

import { columns } from './helpers'
import type { ProblemClients } from './helpers'

interface Props {
  readonly data: ReadonlyArray<ProblemClients>
}

export const ProblemList = ({ data }: Props) => {
  return (
    <Layout>
      <Box>
        <SectionTitle title="Problem List" />
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
          }}
          rows={data}
          columns={columns}
          getRowId={(row) => `${row.class}_${row.instance}`}
          hideFooter
          disableColumnMenu
          initialState={{
            pagination: {
              pageSize: data.length,
            },
          }}
        />
      </Box>
    </Layout>
  )
}
