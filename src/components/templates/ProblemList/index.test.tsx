/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockProblemListData.json'

import { ProblemList } from '.'
import { columns } from './helpers'

describe('<ProblemList />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <ProblemList data={mockData} />
      </BrowserRouter>,
    )

    const layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(2)

    const sectionTitleContainer = layout.children[0]
    expect(sectionTitleContainer.type.name).toBe('Box')
    const sectionTitle = sectionTitleContainer.props.children
    expect(sectionTitle.type.name).toBe('SectionTitle')
    expect(sectionTitle.props.title).toBe('Problem List')

    const contentsContainer = layout.children[1]
    expect(contentsContainer.type.name).toBe('Box')
    expect(contentsContainer.props.sx).toEqual({ display: 'flex', flex: 1 })
    const dataGrid = contentsContainer.props.children
    expect(dataGrid.type.name).toBe('DataGrid')
    expect(dataGrid.props.sx).toEqual({
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
      },
    })
    expect(dataGrid.props.rows).toEqual(mockData)
    expect(dataGrid.props.columns).toEqual(columns)
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
