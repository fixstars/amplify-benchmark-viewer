import { render } from '@testing-library/react'
import type { ReportData } from '@types'
import { AxiosError } from 'axios'
import { createMemoryHistory } from 'history'
import { Route, Router, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { mockLayout, mockClient } from 'utils/test'
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
        class: 'Tsp',
        instance: 'a_instance',
        problemParameters: { 'outputs.feasibilities': true },
        version: 'v0.6.4-54-ge56964d-V100',
        '0%': null,
        '1%': null,
        '5%': 20637702.31703234,
        '10%': 2861353.1161467857,
        '20%': 1000000,
        '50%': 1000000,
      },
      {
        class: 'Tsp',
        instance: 'b_instance',
        problemParameters: { 'outputs.feasibilities': true },
        version: 'v0.6.4-54-ge56964d-V100',
        '0%': null,
        '1%': null,
        '5%': 3321928.0948873623,
        '10%': 1000000,
        '20%': 1000000,
        '50%': 1000000,
      },
      {
        class: 'Tsp',
        instance: 'r_instance',
        problemParameters: { 'outputs.feasibilities': true },
        version: 'v0.6.4-54-ge56964d-A100',
        '0%': null,
        '1%': null,
        '5%': 3824978.578786397,
        '10%': 1000000,
        '20%': 1000000,
        '50%': 1000000,
      },
      {
        class: 'Tsp',
        instance: 'r_instance',
        problemParameters: { 'outputs.feasibilities': true },
        version: 'v0.6.4-54-ge56964d-V100',
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
