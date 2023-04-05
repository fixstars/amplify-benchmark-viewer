/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'

import FilterAltIcon from '@mui/icons-material/FilterAlt'
import {
  Box,
  Collapse,
  Fab,
  IconButton,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import type { MasterData } from '@types'
import { SelectBox } from 'components/atoms'
import { SectionTitle } from 'components/atoms/SectionTitle'
import {
  Layout,
  MasterDataFiltering,
  MasterResultChart,
  MasterResultTable,
} from 'components/organisms'

import {
  createFilteringData,
  getChartOptionsByClients,
  getFilteringData,
  getProblemInstances,
} from './helpers'

const TableContainer = styled(Box)`
  flex: 1;
`

interface Props {
  readonly data: ReadonlyArray<MasterData>
}

export const Master = ({ data }: Props) => {
  const chartOptions = getChartOptionsByClients(data)
  const initChartType: { [key: string]: string } = {}
  for (const [key, item] of Object.entries(chartOptions)) {
    initChartType[key] = Array.from(item ?? new Set())[0] as string
  }
  const [chartType, setChartType] = useState(initChartType)
  const [showData, setShowData] = useState(false)

  const [problemClassFilter, setProblemClassFilter] = useState<
    ReadonlyArray<string>
  >([])
  const [clientNameFilter, setClientNameFilter] = useState<
    ReadonlyArray<string>
  >([])
  const [clientVersionFilter, setClientVersionFilter] = useState<
    ReadonlyArray<string>
  >([])
  const { problemClassData, clientNameData, clientVersionData } =
    createFilteringData(data)

  const filteredData = getFilteringData({
    data,
    problemClassFilter,
    clientNameFilter,
    clientVersionFilter,
  })
  const problemInstances = getProblemInstances(filteredData)
  const firstProblemInstance = problemInstances[0]
  const [problemInstance, setProblemInstance] = useState<string | undefined>(
    firstProblemInstance,
  )

  const [expanded, setExpanded] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    setProblemInstance(firstProblemInstance)
  }, [firstProblemInstance])

  return (
    <Layout>
      <Box>
        <SectionTitle
          title="Database"
          rightComponent={
            <IconButton
              onClick={() => {
                setShowFilter(true)
                setTimeout(() => {
                  setExpanded(true)
                })
              }}
            >
              <FilterAltIcon />
            </IconButton>
          }
        />
      </Box>
      {showFilter && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
            onClick={() => {
              setExpanded(false)
              setTimeout(() => setShowFilter(false), 400)
            }}
          />
          <Collapse
            in={expanded}
            timeout="auto"
            sx={{
              position: 'absolute',
              zIndex: 1,
              backgroundColor: '#FFF',
              width: 'calc(100% - 32px)',
              minWidth: '1280px',
              margin: '0 8px 0 8px',
              padding: '8px',
              borderRadius: '4px',
              top: '125px',
              boxShadow: 2,
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Graph options</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '8px',
                marginLeft: '8px',
              }}
            >
              {Object.entries(chartOptions).map(([key, options]) => (
                <Box key={key} sx={{ marginRight: '16px' }}>
                  <SelectBox
                    label={key}
                    options={Array.from(options ?? new Set())}
                    initValue={chartType[key]}
                    onChange={(option) => {
                      const newChartType = { ...chartType }
                      newChartType[key] = option
                      setChartType(newChartType)
                    }}
                  />
                </Box>
              ))}
            </Box>
            <Typography sx={{ fontWeight: 'bold' }}>
              Filtering option
            </Typography>
            <Box sx={{ marginBottom: '8px', marginLeft: '8px' }}>
              <MasterDataFiltering
                label="Problem Class Filter"
                data={problemClassData}
                selectedData={problemClassFilter}
                onSelected={setProblemClassFilter}
              />
              <MasterDataFiltering
                label="Client Name Filter"
                data={clientNameData}
                selectedData={clientNameFilter}
                onSelected={setClientNameFilter}
              />
              <MasterDataFiltering
                label="Client Version Filter"
                data={clientVersionData}
                selectedData={clientVersionFilter}
                onSelected={setClientVersionFilter}
              />
            </Box>
          </Collapse>
        </Box>
      )}
      {filteredData.length > 0 &&
        problemInstance != null &&
        problemInstances.includes(problemInstance) && (
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
              value={problemInstance}
              onChange={(_event, value) => setProblemInstance(value)}
            >
              {problemInstances.map((item) => (
                <Tab key={item} label={item} value={item} />
              ))}
            </Tabs>
          </Box>
        )}
      <Box sx={{ display: 'flex', flex: 1 }}>
        {filteredData.length > 0 && problemInstance != null && (
          <TableContainer sx={{ display: showData ? 'none' : 'initial' }}>
            <MasterResultChart
              problemInstance={problemInstance}
              data={filteredData}
              clientChartType={chartType}
            />
          </TableContainer>
        )}
        <TableContainer sx={{ display: showData ? 'initial' : 'none' }}>
          <MasterResultTable
            hideProblem
            data={getFilteringData({
              data,
              problemClassFilter,
              clientNameFilter,
              clientVersionFilter,
              problemInstanceFilter: problemInstance,
            })}
          />
        </TableContainer>
        <Fab
          color="primary"
          variant="extended"
          size="large"
          sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
          onClick={() => setShowData(!showData)}
        >
          {showData ? 'Chart' : 'Data'}
        </Fab>
      </Box>
    </Layout>
  )
}
