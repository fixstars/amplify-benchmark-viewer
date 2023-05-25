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
import { mockLabelList, mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { LabelListPage } from '.'

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

describe('<LabelListPage />', () => {
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
          <LabelListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLabelList.mock.calls.length).toBe(1)
    expect(mockLabelList.mock.calls[0][0].data).toEqual([
      {
        label: '20220927_173640',
        problemInstances: { Tsp: ['h_instance', 'i_instance'] },
        clients: ['f_client'],
      },
      {
        label: 'AAA CI benchmark v0.6.4',
        problemInstances: { Tsp: ['r_instance', 'b_instance', 'a_instance'] },
        clients: ['a_client'],
      },
    ])

    expect(container).toMatchSnapshot()
  })

  it('rendered well without data', () => {
    mockResponse = { ...mockResponse, data: undefined }

    const { container } = render(
      <RecoilRoot>
        <BrowserRouter>
          <LabelListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockLabelList.mock.calls.length).toBe(0)

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
          <LabelListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockLabelList.mock.calls.length).toBe(0)
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
          <LabelListPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(2)
    const layout = mockLayout.mock.calls[1][0].children
    expect(layout.type.name).toBe('Loading')

    expect(mockLabelList.mock.calls.length).toBe(0)
  })

  it('Redirect to upload page if no data', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/labels'] })
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
          <LabelListPage />
        </Router>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls.length).toBe(1)
    const layout = mockLayout.mock.calls[0][0].children
    expect(layout.type.name).toBe('Loading')
    expect(mockLabelList.mock.calls.length).toBe(0)
    // redirect
    expect(mockPush.mock.calls[0][0].pathname).toBe('/upload')
  })
})
