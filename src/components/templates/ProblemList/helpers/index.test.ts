import type { GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import mockData from 'utils/test/mocks/data/mockProblemListData.json'

import type { ProblemClients } from './index'
import { columns } from './index'

describe('ProblemList template component helpers', () => {
  it('columns', () => {
    const column1 = columns[0]
    expect(column1.field).toBe('class')
    expect(column1.headerName).toBe('Class')
    expect(column1.sortable).toBe(false)

    const column2 = columns[1]
    expect(column2.field).toBe('instance')
    expect(column2.headerName).toBe('Instance')
    expect(column2.sortable).toBe(false)
    expect(column2.minWidth).toBe(180)
    expect(column2.renderCell?.name).toBe('renderCell')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const instanceLinkComponent = column2.renderCell!({
      row: mockData[0],
      api: undefined,
      id: '',
      field: '',
      rowNode: undefined,
      colDef: undefined,
      cellMode: 'view',
      hasFocus: false,
      tabIndex: 0,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getValue: function (_id: GridRowId, _field: string) {
        throw new Error('Function not implemented.')
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as unknown as GridRenderCellParams<unknown, ProblemClients, unknown>) as any
    expect(instanceLinkComponent?.type.render.name).toBe('LinkWithRef')
    expect(instanceLinkComponent?.props).toEqual({
      to: '/classes/TSP/instances/16x16_easy_233',
      children: '16x16_easy_233',
    })

    const column3 = columns[2]
    expect(column3.field).toBe('clients')
    expect(column3.headerName).toBe('Clients')
    expect(column3.sortable).toBe(false)
    expect(column3.renderCell?.name).toBe('renderCell')
  })
})
