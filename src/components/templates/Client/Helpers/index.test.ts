import type { GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import mockData from 'utils/test/mocks/data/mockClientData.json'

import type { ClientData } from './index'
import { columns } from './index'

describe('Client template component helpers', () => {
  it('columns', () => {
    const cellParameter = {
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
    } as unknown as GridRenderCellParams<unknown, ClientData, unknown>

    {
      const column = columns[0]
      expect(column.field).toBe('class')
      expect(column.headerName).toBe('Class')
      expect(column.sortable).toBe(false)
    }

    {
      const column = columns[1]
      expect(column.field).toBe('instance')
      expect(column.headerName).toBe('Instance')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(140)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('LinkWithRef')
      expect(childComponent?.props).toEqual({
        to: '/classes/Tsp/instances/a_instance',
        children: 'a_instance',
      })
    }

    {
      const column = columns[2]
      expect(column.field).toBe('problemParameters')
      expect(column.headerName).toBe('Problem parameters')
      expect(column.sortable).toBe(false)
      expect(column.cellClassName).toBe('problemParameters')
      expect(column.minWidth).toBe(180)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent.length).toBe(1)
      expect(childComponent[0]?.type).toBe('div')
      expect(childComponent[0]?.key).toBe(
        'Tsp_a_instance_v0.6.4-54-ge56964d-V100_num_vars',
      )

      {
        expect(childComponent[0].props.children[0]?.type).toBe('div')
        expect(childComponent[0].props.children[0]?.props.children).toBe(
          'num_vars',
        )
      }
      {
        expect(childComponent[0].props.children[1][0]?.type).toBe('div')
        expect(childComponent[0].props.children[1][0]?.key).toBe(
          'num_vars_input',
        )
        expect(childComponent[0].props.children[1][0]?.props).toEqual({
          style: { paddingLeft: 10 },
          children: 'input: 15376',
        })
      }
      {
        expect(childComponent[0].props.children[1][1]?.type).toBe('div')
        expect(childComponent[0].props.children[1][1]?.key).toBe(
          'num_vars_logical',
        )
        expect(childComponent[0].props.children[1][1]?.props).toEqual({
          style: { paddingLeft: 10 },
          children: 'logical: 15376',
        })
      }
      {
        expect(childComponent[0].props.children[1][2]?.type).toBe('div')
        expect(childComponent[0].props.children[1][2]?.key).toBe(
          'num_vars_physical',
        )
        expect(childComponent[0].props.children[1][2]?.props).toEqual({
          style: { paddingLeft: 10 },
          children: 'physical: 15376',
        })
      }
    }

    {
      const column = columns[3]
      expect(column.field).toBe('version')
      expect(column.headerName).toBe('Version')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(220)
    }

    {
      const column = columns[4]
      expect(column.field).toBe('0%')
      expect(column.headerName).toBe('TTS(0%)')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(160)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent).toBe('-')
    }

    {
      const column = columns[5]
      expect(column.field).toBe('1%')
      expect(column.headerName).toBe('TTS(1%)')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(160)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent).toBe('-')
    }

    {
      const column = columns[6]
      expect(column.field).toBe('5%')
      expect(column.headerName).toBe('TTS(5%)')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(160)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent).toBe('5767220.789231007')
    }

    {
      const column = columns[7]
      expect(column.field).toBe('10%')
      expect(column.headerName).toBe('TTS(10%)')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(160)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent).toBe('1000000')
    }

    {
      const column = columns[8]
      expect(column.field).toBe('20%')
      expect(column.headerName).toBe('TTS(20%)')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(160)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent).toBe('1000000')
    }

    {
      const column = columns[9]
      expect(column.field).toBe('50%')
      expect(column.headerName).toBe('TTS(50%)')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(160)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent).toBe('1000000')
    }
  })
})
