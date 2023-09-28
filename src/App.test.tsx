/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import type { ReportData } from '@types'
import type { AxiosError } from 'axios'
import { BrowserRouter } from 'react-router-dom'
import mockData from 'utils/test/mocks/data/mockReportData.json'
import { mockQueryClientProvider } from 'utils/test/mocks/react-query'
import { theme } from 'utils/theme'

import App from './App'

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

describe('<App />', () => {
  test('renders well with data', () => {
    mockResponse = {
      ...mockResponse,
      data: mockData,
    }

    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )

    const queryClient = mockQueryClientProvider.mock.calls[0][0]
    expect(queryClient.client.defaultOptions.queries.retry).toBe(false)

    const themeProvider = queryClient.children
    expect(themeProvider.type.name).toBe('ThemeProvider')
    expect(themeProvider.props.theme).toEqual(theme)

    const routes = themeProvider.props.children
    expect(routes.type.name).toBe('Routes')
    expect(routes.props.children.length).toBe(6)

    {
      const page = routes.props.children[0]
      expect(page.type.name).toBe('Route')
      expect(page.props.path).toBe('/')
      expect(page.props.element.type.name).toBe('ProblemListPage')
    }

    {
      const page = routes.props.children[1]
      expect(page.type.name).toBe('Route')
      expect(page.props.path).toBe('/clients')
      expect(page.props.element.type.name).toBe('ClientListPage')
    }

    {
      const page = routes.props.children[2]
      expect(page.type.name).toBe('Route')
      expect(page.props.path).toBe('/classes/:className/instances/:instance')
      expect(page.props.element.type.name).toBe('ProblemPage')
    }

    {
      const page = routes.props.children[3]
      expect(page.type.name).toBe('Route')
      expect(page.props.path).toBe('/clients/:clientName')
      expect(page.props.element.type.name).toBe('ClientPage')
    }

    {
      const page = routes.props.children[4]
      expect(page.type.name).toBe('Route')
      expect(page.props.path).toBe('/labels')
      expect(page.props.element.type.name).toBe('LabelListPage')
    }

    {
      const page = routes.props.children[5]
      expect(page.type.name).toBe('Route')
      expect(page.props.path).toBe('/upload')
      expect(page.props.element.type.name).toBe('UploadDataPage')
    }

    expect(container).toMatchSnapshot()
  })
})
