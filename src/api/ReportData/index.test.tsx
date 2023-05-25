/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { renderHook, waitFor, act } from '@testing-library/react'
import type { ReportData } from '@types'
import axios from 'axios'
import type { AxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { useGetReportData } from './index'

const mockAxios = new MockAdapter(axios)

describe('[API] useGetReportData', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
        },
      },
      logger: {
        // eslint-disable-next-line no-console
        log: console.log,
        warn: console.warn,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: () => {},
      },
    })
  })

  it('success', async () => {
    mockAxios.onGet('data/data.json').reply(200, mockData)
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    let result:
      | {
          current: UseQueryResult<ReportData>
        }
      | undefined

    await act(async () => {
      result = renderHook(() => useGetReportData(), {
        wrapper,
      }).result
    })

    await waitFor(() => {
      expect(result?.current.isSuccess).toBe(true)
    })

    expect(result?.current.data).toEqual(mockData)
  })

  it('fail', async () => {
    mockAxios.onGet('data/data.json').reply(400)
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    let result:
      | {
          current: UseQueryResult<ReportData>
        }
      | undefined

    await act(async () => {
      result = renderHook(() => useGetReportData(), {
        wrapper,
      }).result
    })

    await waitFor(() => {
      expect(result?.current.isError).toBe(true)
    })

    expect((result?.current.error as AxiosError).response?.status).toBe(400)
  })
})
