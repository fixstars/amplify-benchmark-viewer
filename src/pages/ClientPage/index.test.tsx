import { render } from '@testing-library/react'
import type { ReportData } from '@types'
import { AxiosError } from 'axios'
import { createMemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { mockClient, mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { ClientPage } from '.'

let mockResponse: {
  readonly data: ReportData | undefined
  readonly isLoading: boolean
  readonly isFetching: boolean
  readonly isError: boolean
  readonly error: AxiosError | null
} = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isError: false,
  error: null,
}
jest.mock('api', () => ({
  useGetReportData: () => mockResponse,
}))

describe('<ClientPage />', () => {
  beforeEach(() => {
    mockResponse = {
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      error: null,
    }
  })

  it('rendered well with data', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
    }

    const history = createMemoryHistory({
      initialEntries: ['/clients/a_client'],
    })

    const { container } = render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/clients/:clientName" element={<ClientPage />} />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockClient.mock.calls.length).toBe(1)
    expect(mockClient.mock.calls[0][0].data).toEqual([
      {
        benchmarkID: '509a8ab1338d4b00117d3d4072be4a30',
        class: 'Tsp',
        instance: 'a_instance',
        version: 'v0.6.4-54-ge56964d-V100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: { input: 20736, logical: 20736, physical: 20736 },
          constraint_weight: 1,
          seed: null,
        },
        label: 'AAA CI benchmark v0.6.4',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 60218,
        'target_energy(25%)': 61530,
        'target_energy(50%)': 63189,
        'target_energy(75%)': 63917,
        'target_energy(max)': 65059,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 20637702.31703234,
        'TTS(10%)': 2861353.1161467857,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
      {
        benchmarkID: '509a8ab1338d4b00117d3d4072be4a30',
        class: 'Tsp',
        instance: 'a_instance',
        version: 'v0.6.4-54-ge56964d-V100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: {
            input: 20736,
            logical: 20736,
            physical: 20736,
          },
          constraint_weight: 1,
          seed: null,
        },
        label: '',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 60218,
        'target_energy(25%)': 61530,
        'target_energy(50%)': 63189,
        'target_energy(75%)': 63917,
        'target_energy(max)': 65059,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 20637702.31703234,
        'TTS(10%)': 2861353.1161467857,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
      {
        benchmarkID: '25e9776acc9ba73657ec2860b4f7cab5',
        class: 'Tsp',
        instance: 'b_instance',
        version: 'v0.6.4-54-ge56964d-V100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: {
            input: 18496,
            logical: 18496,
            physical: 18496,
          },
          constraint_weight: 1,
          seed: null,
        },
        label: 'AAA CI benchmark v0.6.4',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 98340,
        'target_energy(25%)': 99504,
        'target_energy(50%)': 100529,
        'target_energy(75%)': 101198,
        'target_energy(max)': 102254,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 3321928.0948873623,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
      {
        benchmarkID: '25e9776acc9ba73657ec2860b4f7cab5',
        class: 'Tsp',
        instance: 'b_instance',
        version: 'v0.6.4-54-ge56964d-V100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: {
            input: 18496,
            logical: 18496,
            physical: 18496,
          },
          constraint_weight: 1,
          seed: null,
        },
        label: '',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 98340,
        'target_energy(25%)': 99504,
        'target_energy(50%)': 100529,
        'target_energy(75%)': 101198,
        'target_energy(max)': 102254,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 3321928.0948873623,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
      {
        benchmarkID: '82ce97232e7e71920d217c4d95e6b3b0',
        class: 'Tsp',
        instance: 'r_instance',
        version: 'v0.6.4-54-ge56964d-A100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          constraint_weight: 1,
          seed: null,
        },
        label: 'AAA CI benchmark v0.6.4',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 59899,
        'target_energy(25%)': 60664,
        'target_energy(50%)': 61230,
        'target_energy(75%)': 62106,
        'target_energy(max)': 63297,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 3824978.578786397,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
      {
        benchmarkID: '82ce97232e7e71920d217c4d95e6b3b0',
        class: 'Tsp',
        instance: 'r_instance',
        version: 'v0.6.4-54-ge56964d-A100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          constraint_weight: 1,
          seed: null,
        },
        label: '',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 59899,
        'target_energy(25%)': 60664,
        'target_energy(50%)': 61230,
        'target_energy(75%)': 62106,
        'target_energy(max)': 63297,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 3824978.578786397,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
      {
        benchmarkID: 'a07b5eabeb5774419458c495b49d3a23',
        class: 'Tsp',
        instance: 'r_instance',
        version: 'v0.6.4-54-ge56964d-V100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          constraint_weight: 1,
          seed: null,
        },
        label: 'AAA CI benchmark v0.6.4',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 60150,
        'target_energy(25%)': 61299,
        'target_energy(50%)': 61521,
        'target_energy(75%)': 62584,
        'target_energy(max)': 64612,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 5767220.789231007,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
      {
        benchmarkID: 'a07b5eabeb5774419458c495b49d3a23',
        class: 'Tsp',
        instance: 'r_instance',
        version: 'v0.6.4-54-ge56964d-V100',
        clientParameters: { 'outputs.feasibilities': true },
        problemParameters: {
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          constraint_weight: 1,
          seed: null,
        },
        label: '',
        num_samples: 20,
        specified_time: 1000000,
        'target_energy(min)': 60150,
        'target_energy(25%)': 61299,
        'target_energy(50%)': 61521,
        'target_energy(75%)': 62584,
        'target_energy(max)': 64612,
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(5%)': 5767220.789231007,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(50%)': 1000000,
        reach_best_rate: 0,
        feasible_rate: 1,
      },
    ])

    expect(container).toMatchSnapshot()
  })

  it('rendered well without data', () => {
    mockResponse = { ...mockResponse, data: undefined }

    const history = createMemoryHistory({
      initialEntries: ['/clients/a_client'],
    })

    const { container } = render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/clients/:clientName" element={<ClientPage />} />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockClient.mock.calls.length).toBe(0)

    expect(container).toMatchSnapshot()
  })

  it('isLoading', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
      isLoading: true,
    }

    const history = createMemoryHistory({
      initialEntries: ['/clients/a_client'],
    })

    render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/clients/:clientName" element={<ClientPage />} />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockClient.mock.calls.length).toBe(0)
  })

  it('isFetching', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
      isFetching: true,
    }

    const history = createMemoryHistory({
      initialEntries: ['/clients/a_client'],
    })

    render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/clients/:clientName" element={<ClientPage />} />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockClient.mock.calls.length).toBe(0)
  })

  it('Redirect to upload page if no data', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({
      initialEntries: ['/clients/a_client'],
    })
    history.push = mockPush

    mockResponse = {
      ...mockResponse,
      data: undefined,
      isError: true,
      error: new AxiosError('Some network error'),
    }

    render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/clients/:clientName" element={<ClientPage />} />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')
    expect(mockClient.mock.calls.length).toBe(0)

    // redirect
    expect(mockPush.mock.calls[0][0].pathname).toBe('/upload')
  })
})
