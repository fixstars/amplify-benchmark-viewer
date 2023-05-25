/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, fireEvent, screen } from '@testing-library/react'
import { mockDataGrid } from 'utils/test'

import { FilteringTable } from '.'
import mockData from './mockData/data.json'

describe('<FilteringTable />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <FilteringTable
        title="Problem Class"
        data={mockData}
        selectedData={[]}
      />,
    )

    const dataGrid = mockDataGrid.mock.calls[0][0]
    expect(dataGrid.sx).toEqual({
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
        cursor: 'pointer',
        outline: 'none !important',
      },
      '&.MuiDataGrid-root .MuiDataGrid-cellContent': {
        cursor: 'pointer',
      },
    })
    expect(dataGrid.rows).toEqual([
      { name: 'Cvrp' },
      { name: 'MaxCut' },
      { name: 'Qap' },
      { name: 'Sudoku' },
      { name: 'Tsp' },
    ])
    expect(dataGrid.columns).toEqual([
      {
        field: 'name',
        headerName: 'Problem Class',
        flex: 1,
        sortable: false,
      },
    ])
    expect(dataGrid.initialState).toEqual({
      pagination: {
        pageSize: mockData.length,
      },
    })
    expect(dataGrid.getRowHeight.name).toBe('getRowHeight')
    expect(dataGrid.getRowId.name).toBe('getRowId')
    expect(dataGrid.hideFooter).toBe(true)
    expect(dataGrid.disableColumnMenu).toBe(true)
    expect(dataGrid.checkboxSelection).toBe(true)
    expect(dataGrid.onSelectionModelChange.name).toBe('onSelectionModelChange')

    expect(container).toMatchSnapshot()
  })

  it('onSelected', async () => {
    const handleSelect = jest.fn()

    render(
      <FilteringTable
        title="Problem Class"
        data={mockData}
        selectedData={[]}
        onSelected={handleSelect}
      />,
    )

    expect(handleSelect.mock.calls.length).toBe(0)

    fireEvent.click(screen.getByText('Cvrp'))
    expect(handleSelect.mock.calls.length).toBe(1)
    expect(handleSelect.mock.calls[0][0]).toEqual(['Cvrp'])
  })

  it('selected data', async () => {
    render(
      <FilteringTable
        title="Problem Class"
        data={mockData}
        selectedData={['Cvrp', 'MaxCut']}
      />,
    )

    const dataGrid = mockDataGrid.mock.calls[0][0]
    expect(dataGrid.selectionModel).toEqual(['Cvrp', 'MaxCut'])
  })
})
