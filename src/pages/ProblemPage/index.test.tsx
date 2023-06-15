/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import type { ReportData } from '@types'
import { AxiosError } from 'axios'
import { createMemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { mockLayout, mockProblem } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { ProblemPage } from '.'

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

describe('<ProblemPage />', () => {
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
      initialEntries: ['/classes/Tsp/instances/r_instance'],
    })

    const { container } = render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/classes/:className/instances/:instance"
              element={<ProblemPage />}
            />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockProblem.mock.calls.length).toBe(1)
    expect(mockProblem.mock.calls[0][0].data).toEqual([
      {
        benchmark_id: '82ce97232e7e71920d217c4d95e6b3b0',
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(5%)': 3824978.578786397,
        'TTS(50%)': 1000000,
        client: 'a_client',
        clientParameters: {
          'outputs.feasibilities': true,
        },
        clientSettings: {},
        feasible_rate: 1,
        label: '',
        num_samples: 20,
        problemParameters: {
          constraint_weight: 1,
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          seed: null,
        },
        reach_best_rate: 0,
        specified_time: 1000000,
        'target_energy(min)': 59899,
        'target_energy(25%)': 60664,
        'target_energy(50%)': 61230,
        'target_energy(75%)': 62106,
        'target_energy(max)': 63297,
        version: 'v0.6.4-54-ge56964d-A100',
      },
      {
        benchmark_id: '82ce97232e7e71920d217c4d95e6b3b0',
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(5%)': 3824978.578786397,
        'TTS(50%)': 1000000,
        client: 'a_client',
        clientParameters: {
          'outputs.feasibilities': true,
        },
        clientSettings: {},
        feasible_rate: 1,
        label: 'AAA CI benchmark v0.6.4',
        num_samples: 20,
        problemParameters: {
          constraint_weight: 1,
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          seed: null,
        },
        reach_best_rate: 0,
        specified_time: 1000000,
        'target_energy(25%)': 60664,
        'target_energy(50%)': 61230,
        'target_energy(75%)': 62106,
        'target_energy(max)': 63297,
        'target_energy(min)': 59899,
        version: 'v0.6.4-54-ge56964d-A100',
      },
      {
        benchmark_id: 'a07b5eabeb5774419458c495b49d3a23',
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(5%)': 5767220.789231007,
        'TTS(50%)': 1000000,
        client: 'a_client',
        clientParameters: {
          num_gpus: 2,
          'outputs.feasibilities': true,
        },
        clientSettings: { setting_a: 10, setting_b: 10 },
        feasible_rate: 1,
        label: '',
        num_samples: 20,
        problemParameters: {
          constraint_weight: 1,
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          seed: null,
        },
        reach_best_rate: 0,
        specified_time: 1000000,
        'target_energy(25%)': 61299,
        'target_energy(50%)': 61521,
        'target_energy(75%)': 62584,
        'target_energy(max)': 64612,
        'target_energy(min)': 60150,
        version: 'v0.6.4-54-ge56964d-V100',
      },
      {
        benchmark_id: 'a07b5eabeb5774419458c495b49d3a23',
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(5%)': 5767220.789231007,
        'TTS(50%)': 1000000,
        client: 'a_client',
        clientParameters: {
          num_gpus: 2,
          'outputs.feasibilities': true,
        },
        clientSettings: { setting_a: 10, setting_b: 10 },
        feasible_rate: 1,
        label: 'AAA CI benchmark v0.6.4',
        num_samples: 20,
        problemParameters: {
          constraint_weight: 1,
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          seed: null,
        },
        reach_best_rate: 0,
        specified_time: 1000000,
        'target_energy(25%)': 61299,
        'target_energy(50%)': 61521,
        'target_energy(75%)': 62584,
        'target_energy(max)': 64612,
        'target_energy(min)': 60150,
        version: 'v0.6.4-54-ge56964d-V100',
      },
      {
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(5%)': 5767220.789231007,
        'TTS(50%)': 1000000,
        benchmark_id: 'a07b5eabeb5774419458c495b49d3a21',
        client: 'f_client',
        clientParameters: {
          seed: -1,
        },
        clientSettings: { setting_obj: { obj_key1: 10 } },
        feasible_rate: 1,
        label: '',
        num_samples: 20,
        problemParameters: {
          constraint_weight: 2,
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          seed: null,
        },
        reach_best_rate: 0,
        specified_time: 1000000,
        'target_energy(25%)': 61299,
        'target_energy(50%)': 61521,
        'target_energy(75%)': 62584,
        'target_energy(max)': 64612,
        'target_energy(min)': 60150,
        version: '9.5.0',
      },
      {
        'TTS(0%)': null,
        'TTS(1%)': null,
        'TTS(10%)': 1000000,
        'TTS(20%)': 1000000,
        'TTS(5%)': 5767220.789231007,
        'TTS(50%)': 1000000,
        benchmark_id: 'a07b5eabeb5774419458c495b49d3a21',
        client: 'f_client',
        clientParameters: {
          seed: -1,
        },
        clientSettings: { setting_obj: { obj_key1: 10 } },
        feasible_rate: 1,
        label: 'AAA CI benchmark v0.6.4',
        num_samples: 20,
        problemParameters: {
          constraint_weight: 2,
          num_vars: {
            input: 15376,
            logical: 15376,
            physical: 15376,
          },
          seed: null,
        },
        reach_best_rate: 0,
        specified_time: 1000000,
        'target_energy(25%)': 61299,
        'target_energy(50%)': 61521,
        'target_energy(75%)': 62584,
        'target_energy(max)': 64612,
        'target_energy(min)': 60150,
        version: '9.5.0',
      },
    ])

    expect(container).toMatchSnapshot()
  })

  it('rendered well without data', () => {
    mockResponse = { ...mockResponse, data: undefined }

    const history = createMemoryHistory({
      initialEntries: ['/classes/Tsp/instances/r_instance'],
    })

    const { container } = render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/classes/:className/instances/:instance"
              element={<ProblemPage />}
            />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockProblem.mock.calls.length).toBe(0)

    expect(container).toMatchSnapshot()
  })

  it('isLoading', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
      isLoading: true,
    }

    const history = createMemoryHistory({
      initialEntries: ['/classes/Tsp/instances/r_instance'],
    })

    render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/classes/:className/instances/:instance"
              element={<ProblemPage />}
            />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockProblem.mock.calls.length).toBe(0)
  })

  it('isFetching', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
      isFetching: true,
    }

    const history = createMemoryHistory({
      initialEntries: ['/classes/Tsp/instances/r_instance'],
    })

    render(
      <RecoilRoot>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route
              path="/classes/:className/instances/:instance"
              element={<ProblemPage />}
            />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockProblem.mock.calls.length).toBe(0)
  })

  it('Redirect to upload page if no data', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({
      initialEntries: ['/classes/Tsp/instances/r_instance'],
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
            <Route
              path="/classes/:className/instances/:instance"
              element={<ProblemPage />}
            />
          </Routes>
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    // redirect
    expect(mockPush.mock.calls[0][0].pathname).toBe('/upload')
  })
})
