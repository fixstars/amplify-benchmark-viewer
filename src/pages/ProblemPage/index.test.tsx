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
        client: 'a_client',
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
        '0%': null,
        '1%': null,
        '5%': 3824978.578786397,
        '10%': 1000000,
        '20%': 1000000,
        '50%': 1000000,
      },
      {
        client: 'a_client',
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
        '0%': null,
        '1%': null,
        '5%': 3824978.578786397,
        '10%': 1000000,
        '20%': 1000000,
        '50%': 1000000,
      },
      {
        client: 'a_client',
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
        '0%': null,
        '1%': null,
        '5%': 5767220.789231007,
        '10%': 1000000,
        '20%': 1000000,
        '50%': 1000000,
      },
      {
        client: 'a_client',
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
        '0%': null,
        '1%': null,
        '5%': 5767220.789231007,
        '10%': 1000000,
        '20%': 1000000,
        '50%': 1000000,
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
