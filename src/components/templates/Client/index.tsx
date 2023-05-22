import { useState } from 'react'

import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { SelectBox } from 'components/atoms'
import { SectionTitle } from 'components/atoms/SectionTitle'
import { Layout } from 'components/organisms'

import type { ClientData } from './Helpers'
import { columns } from './Helpers'

interface Props {
  readonly title: string
  readonly labels: ReadonlyArray<string>
  readonly data: ReadonlyArray<ClientData>
}

export const Client = ({ title, labels, data }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState(labels[0])
  const filterKeyword = selectedLabel === 'all' ? '' : selectedLabel
  const filteredData = data.filter((item) => item.label === filterKeyword)
  return (
    <Layout>
      <Box>
        <SectionTitle title={title} />
      </Box>
      <Box sx={{ marginBottom: '16px' }}>
        <SelectBox
          label="Label"
          options={labels}
          onChange={(value) => setSelectedLabel(value)}
        />
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
          rows={filteredData}
          columns={columns}
          hideFooter
          getRowId={(row) =>
            `${row.benchmarkID}_${row.class}_${row.instance}_${row.version}_${row.label}_${row.specified_time}`
          }
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
