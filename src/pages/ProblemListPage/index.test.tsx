import { render } from '@testing-library/react'
import type { ReportData } from '@types'
import { AxiosError } from 'axios'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { mockLayout, mockProblemList } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { ProblemListPage } from '.'

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

describe('<ProblemListPage />', () => {
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

    const { container } = render(
      <RecoilRoot>
        <BrowserRouter>
          <ProblemListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockProblemList.mock.calls.length).toBe(1)
    expect(mockProblemList.mock.calls[0][0].data).toEqual([
      { class: 'Tsp', instance: 'burma14', clients: ['GurobiClient'] },
      { class: 'Tsp', instance: 'pr124', clients: ['FixstarsClient'] },
      { class: 'Tsp', instance: 'pr136', clients: ['FixstarsClient'] },
      { class: 'Tsp', instance: 'pr144', clients: ['FixstarsClient'] },
      { class: 'Tsp', instance: 'ulysses16', clients: ['GurobiClient'] },
    ])

    expect(container).toMatchSnapshot()
  })

  it('rendered well without data', () => {
    mockResponse = { ...mockResponse, data: undefined }

    const { container } = render(
      <RecoilRoot>
        <BrowserRouter>
          <ProblemListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockProblemList.mock.calls.length).toBe(0)

    expect(container).toMatchSnapshot()
  })

  it('isLoading', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
      isLoading: true,
    }

    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProblemListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockProblemList.mock.calls.length).toBe(0)
  })

  it('isFetching', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
      isFetching: true,
    }

    render(
      <RecoilRoot>
        <BrowserRouter>
          <ProblemListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockProblemList.mock.calls.length).toBe(0)
  })

  it('Redirect to upload page if no data', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/classes'] })
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
          <ProblemListPage />
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')
    expect(mockProblemList.mock.calls.length).toBe(0)

    // redirect
    expect(mockPush.mock.calls[0][0].pathname).toBe('/upload')
  })
})
