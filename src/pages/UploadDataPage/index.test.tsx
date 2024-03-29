/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { act, render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import type { MutableSnapshot } from 'recoil'
import { RecoilRoot } from 'recoil'
import { reportDataState } from 'stores'
import { mockJsonFileUploader, mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { UploadDataPage } from '.'

describe('<UploadDataPage />', () => {
  it('rendered well', () => {
    const { container } = render(
      <RecoilRoot
        initializeState={({ set }: MutableSnapshot) => {
          set(reportDataState, null)
        }}
      >
        <BrowserRouter>
          <UploadDataPage />
        </BrowserRouter>
      </RecoilRoot>,
    )

    expect(mockLayout.mock.calls[0][0].showMenu).toBe(false)
    expect(mockJsonFileUploader.mock.calls.length).toBe(1)

    expect(container).toMatchSnapshot()
  })

  it('JSON data is loaded and redirect', () => {
    const history = createMemoryHistory({ initialEntries: ['/', '/upload'] })

    render(
      <RecoilRoot
        initializeState={({ set }: MutableSnapshot) => {
          set(reportDataState, null)
        }}
      >
        <Router location={history.location} navigator={history}>
          <UploadDataPage />
        </Router>
      </RecoilRoot>,
    )

    expect(mockJsonFileUploader.mock.calls.length).toBe(1)
    expect(history.location.pathname).toBe('/upload')
    act(() => {
      mockJsonFileUploader.mock.calls[0][0].onLoad(mockData)
    })
    expect(history.location.pathname).toBe('/')
  })
})
