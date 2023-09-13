/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { JsonFileUploader } from '.'

const mockLoading = jest.fn()
jest.mock('../Loading', () => {
  const { Loading: LoadingComponent, ...rest } =
    jest.requireActual('../Loading')

  const Loading = (props: typeof LoadingComponent) => {
    mockLoading(props)
    return <LoadingComponent {...props} />
  }

  return {
    Loading,
    ...rest,
  }
})

describe('<JsonFileUploader />', () => {
  it('Rendered well', async () => {
    const { container } = render(<JsonFileUploader />)

    expect(
      screen.queryByText('Drag and drop the JSON file here or click'),
    ).toBeInTheDocument()
    expect(screen.queryByTestId('upload-icon')).toBeInTheDocument()

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    expect(mockLoading.mock.calls.length).toBe(0)

    expect(container).toMatchSnapshot()
  })

  it('Drop JSON file', async () => {
    const mockOnLoad = jest.fn()

    render(<JsonFileUploader onLoad={mockOnLoad} />)

    fireEvent.drop(
      screen.getByText('Drag and drop the JSON file here or click'),
      {
        dataTransfer: {
          files: [
            new File([JSON.stringify(mockData)], 'stats.json', {
              type: 'application/json',
            }),
          ],
        },
      },
    )

    expect(
      screen.queryByText('Drag and drop the JSON file here or click'),
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('upload-icon')).not.toBeInTheDocument()

    expect(screen.queryByText('Loading...')).toBeInTheDocument()
    expect(mockLoading.mock.calls.length).toBe(1)

    await waitFor(() => expect(mockOnLoad.mock.calls[0][0]).toEqual(mockData))
  })
})
