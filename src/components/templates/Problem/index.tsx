import { useState } from 'react'

import { Box, Fab, Tab, Tabs } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import type { ReportData } from '@types'
import { SelectBox } from 'components/atoms'
import { SectionTitle } from 'components/atoms/SectionTitle'
import {
  Layout,
  PlotFeasibleRate,
  PlotReachBestRate,
  PlotTTS,
  PlotTargetEnergy,
} from 'components/organisms'

import type { ProblemData } from './Helpers'
import { columns } from './Helpers'

interface Props {
  readonly className: string
  readonly instance: string
  readonly labels: ReadonlyArray<string>
  readonly data: ReadonlyArray<ProblemData>
  readonly reportData: ReportData
}

export const Problem = ({
  className,
  instance,
  labels,
  data,
  reportData,
}: Props) => {
  const chartTabs = ['TTS', 'Target energy', 'Feasible rate', 'Reach best rate']
  const [currentChartTab, setCurrentChartTab] = useState(chartTabs[0])
  const [selectedLabel, setSelectedLabel] = useState(labels[0])
  const [showData, setShowData] = useState(false)

  const filteredData =
    selectedLabel === 'all'
      ? data
      : data.filter((item) => item.label === selectedLabel)

  return (
    <Layout>
      <Box>
        <SectionTitle title={`${className}/${instance}`} />
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
          borderBottom: 1,
          borderColor: 'divider',
          marginBottom: '8px',
        }}
      >
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={currentChartTab}
          onChange={(_event, value) => setCurrentChartTab(value)}
        >
          {chartTabs.map((item) => (
            <Tab key={item} label={item} value={item} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ flex: 1, display: showData ? 'none' : 'initial' }}>
        {currentChartTab === 'TTS' && (
          <PlotTTS
            data={reportData}
            instance={instance}
            useHistory
            xtype="log"
            ytype="log"
            label={selectedLabel === 'all' ? '' : selectedLabel}
          />
        )}
        {currentChartTab === 'Target energy' && (
          <PlotTargetEnergy
            data={reportData}
            instance={instance}
            useHistory
            label={selectedLabel === 'all' ? '' : selectedLabel}
          />
        )}
        {currentChartTab === 'Feasible rate' && (
          <PlotFeasibleRate
            data={reportData}
            instance={instance}
            useHistory
            xtype="log"
            label={selectedLabel === 'all' ? '' : selectedLabel}
          />
        )}
        {currentChartTab === 'Reach best rate' && (
          <PlotReachBestRate
            data={reportData}
            instance={instance}
            useHistory
            xtype="log"
            label={selectedLabel === 'all' ? '' : selectedLabel}
          />
        )}
        <Fab
          color="primary"
          variant="extended"
          size="large"
          sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
          onClick={() => setShowData(true)}
        >
          Data
        </Fab>
      </Box>
      <Box sx={{ flex: 1, display: showData ? 'initial' : 'none' }}>
        <DataGrid
          sx={{
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
            '&.MuiDataGrid-root .MuiDataGrid-cell.parameters': {
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '5px 0 5px 0',
            },
          }}
          rows={filteredData}
          columns={columns}
          hideFooter
          getRowId={(row) => `${row.client}_${row.version}_${row.label}`}
          disableColumnMenu
          initialState={{
            pagination: {
              pageSize: data.length,
            },
          }}
          getRowHeight={() => 'auto'}
        />
        <Fab
          color="primary"
          variant="extended"
          size="large"
          sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
          onClick={() => setShowData(false)}
        >
          Chart
        </Fab>
      </Box>
    </Layout>
  )
}
