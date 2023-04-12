import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import {
  createFilteringData,
  getFilteringData,
  getChartOptionsByClients,
  getProblemInstances,
} from './index'

describe('Master template component helpers', () => {
  it('createFilteringData', () => {
    const filteringData = createFilteringData(
      mockData as ReadonlyArray<MasterData>,
    )

    expect(filteringData.problemClassData).toEqual([
      { name: 'Tsp' },
      { name: 'abc' },
    ])
    expect(filteringData.clientNameData).toEqual([
      { name: 'a_client' },
      { name: 'AClient' },
    ])
    expect(filteringData.clientVersionData).toEqual([
      { name: 'v1.0.0' },
      { name: 'v1.0.1' },
    ])
  })

  it('getFilteringData', () => {
    let filteringData = getFilteringData({
      data: mockData as ReadonlyArray<MasterData>,
      problemClassFilter: ['Tsp'],
      clientNameFilter: ['a_client'],
      clientVersionFilter: ['v1.0.0'],
    })
    expect(filteringData).toEqual([mockData[0]])

    filteringData = getFilteringData({
      data: mockData as ReadonlyArray<MasterData>,
      problemClassFilter: ['Tsp'],
      clientNameFilter: ['AClient'],
      clientVersionFilter: ['v1.0.0'],
    })
    expect(filteringData).toEqual([])
  })

  it('getChartOptionsByClients', () => {
    const chartOptions = getChartOptionsByClients(
      mockData as ReadonlyArray<MasterData>,
    )

    expect(chartOptions).toEqual({
      a_client: new Set(['box', 'max-min', '3q-1q', 'median']),
      AClient: new Set(['box']),
    })
  })

  it('getProblemInstances', () => {
    const problemInstances = getProblemInstances(
      mockData as ReadonlyArray<MasterData>,
    )

    expect(problemInstances).toEqual(['pr136', 'pr124'])
  })
})
