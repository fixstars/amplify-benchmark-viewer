/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockClientData.json'

import { Client } from '.'
import { columns } from './Helpers'

describe('<Client />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <Client
          title="a_client"
          labels={['all', 'AAA CI benchmark v0.6.4']}
          data={mockData}
        />
      </BrowserRouter>,
    )

    const layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(3)

    const sectionTitleContainer = layout.children[0]
    expect(sectionTitleContainer.type.name).toBe('Box')
    const sectionTitle = sectionTitleContainer.props.children
    expect(sectionTitle.type.name).toBe('SectionTitle')
    expect(sectionTitle.props.title).toBe('a_client')
    {
      const childComponent = layout.children[1]
      expect(childComponent.type.name).toBe('Box')
      expect(childComponent.props.sx).toEqual({ marginBottom: '16px' })
      const selectBox = childComponent.props.children
      expect(selectBox.type.name).toBe('SelectBox')
      expect(selectBox.props.label).toBe('Label')
      expect(selectBox.props.options).toEqual([
        'all',
        'AAA CI benchmark v0.6.4',
      ])
      expect(selectBox.props.onChange.name).toBe('onChange')
    }
    const contentsContainer = layout.children[2]
    expect(contentsContainer.type.name).toBe('Box')
    expect(contentsContainer.props.sx).toEqual({ display: 'flex', flex: 1 })
    const dataGrid = contentsContainer.props.children
    expect(dataGrid.type.name).toBe('DataGrid')
    expect(dataGrid.props.sx).toEqual({
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
      },
      '&.MuiDataGrid-root .MuiDataGrid-cell.problemParameters': {
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: '5px 0 5px 0',
      },
    })
    const filteredData = Object.values(mockData).filter(
      (value) => value.label === '',
    )
    expect(dataGrid.props.rows).toEqual(filteredData)
    expect(dataGrid.props.columns).toEqual(columns)
    expect(dataGrid.props.getRowId.name).toBe('getRowId')
    expect(dataGrid.props.hideFooter).toBe(true)
    expect(dataGrid.props.disableColumnMenu).toBe(true)

    expect(container).toMatchSnapshot()
  })
})
