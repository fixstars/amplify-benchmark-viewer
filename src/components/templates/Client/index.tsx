import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { SectionTitle } from 'components/atoms/SectionTitle'
import { Layout } from 'components/organisms'

import type { ClientData } from './Helpers'
import { columns } from './Helpers'

interface Props {
  readonly title: string
  readonly data: ReadonlyArray<ClientData>
}

export const Client = ({ title, data }: Props) => {
  return (
    <Layout>
      <Box>
        <SectionTitle title={title} />
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
            '&.MuiDataGrid-root .MuiDataGrid-cell.problemParameters': {
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '5px 0 5px 0',
            },
          }}
          rows={data}
          columns={columns}
          hideFooter
          getRowId={(row) => `${row.class}_${row.instance}_${row.version}`}
          disableColumnMenu
          initialState={{
            pagination: {
              pageSize: data.length,
            },
          }}
          getRowHeight={() => 'auto'}
        />
      </Box>
    </Layout>
  )
}
