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
import { BrowserRouter, Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { mockClientList, mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { ClientListPage } from '.'

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

describe('<ClientListPage />', () => {
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
          <ClientListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockClientList.mock.calls.length).toBe(1)
    expect(mockClientList.mock.calls[0][0].data).toEqual([
      {
        client: 'a_client',
        version: 'v0.6.4-54-ge56964d-A100',
        problemInstances: { Tsp: ['r_instance'] },
      },
      {
        client: 'a_client',
        version: 'v0.6.4-54-ge56964d-V100',
        problemInstances: { Tsp: ['a_instance', 'b_instance', 'r_instance'] },
      },
      {
        client: 'f_client',
        version: '9.5.0',
        problemInstances: { Tsp: ['h_instance', 'i_instance'] },
      },
    ])

    expect(container).toMatchSnapshot()
  })

  it('rendered well without data', () => {
    mockResponse = { ...mockResponse, data: undefined }

    const { container } = render(
      <RecoilRoot>
        <BrowserRouter>
          <ClientListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockClientList.mock.calls.length).toBe(0)

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
          <ClientListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockClientList.mock.calls.length).toBe(0)
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
          <ClientListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockClientList.mock.calls.length).toBe(0)
  })

  it('Redirect to upload page if no data', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/clients'] })
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
          <ClientListPage />
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')
    expect(mockClientList.mock.calls.length).toBe(0)

    // redirect
    expect(mockPush.mock.calls[0][0].pathname).toBe('/upload')
  })
})
