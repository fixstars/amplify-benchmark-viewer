/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockClientListData.json'

import { ClientList } from '.'
import { columns } from './Helpers'

describe('<ClientList />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <ClientList data={mockData} />
      </BrowserRouter>,
    )

    const layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(2)

    const sectionTitleContainer = layout.children[0]
    expect(sectionTitleContainer.type.name).toBe('Box')
    const sectionTitle = sectionTitleContainer.props.children
    expect(sectionTitle.type.name).toBe('SectionTitle')
    expect(sectionTitle.props.title).toBe('Client List')

    const contentsContainer = layout.children[1]
    expect(contentsContainer.type.name).toBe('Box')
    expect(contentsContainer.props.sx).toEqual({ display: 'flex', flex: 1 })
    const dataGrid = contentsContainer.props.children
    expect(dataGrid.type.name).toBe('DataGrid')
    expect(dataGrid.props.sx).toEqual({
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
      },
      '&.MuiDataGrid-root .MuiDataGrid-cell.instance': {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: '5px 0 5px 0',
      },
    })
    expect(dataGrid.props.rows).toEqual(mockData)
    {
      // updateColumnWidth
      // The width of client column and version column will be fit to the longest client name and version name.
      const newColumns = JSON.parse(JSON.stringify(columns))
      newColumns[0].minWidth = 64
      newColumns[0].renderCell = columns[0].renderCell
      newColumns[1].minWidth = 184
      newColumns[2].renderCell = columns[2].renderCell
      expect(dataGrid.props.columns).toEqual(newColumns)
    }
    expect(dataGrid.props.getRowId.name).toBe('getRowId')
    expect(dataGrid.props.pagination).toBe(true)
    expect(dataGrid.props.disableColumnMenu).toBe(true)
    expect(dataGrid.props.initialState).toEqual({
      pagination: {
        paginationModel: {
          pageSize: 100,
        },
      },
    })

    expect(container).toMatchSnapshot()
  })
})
