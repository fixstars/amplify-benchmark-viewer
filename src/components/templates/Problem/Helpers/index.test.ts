import type { GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import mockData from 'utils/test/mocks/data/mockProblemData.json'

import type { ProblemData } from './index'
import { columns } from './index'

describe('Problem template component helpers', () => {
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
    } as unknown as GridRenderCellParams<unknown, ProblemData, unknown>

    {
      const column = columns[0]
      expect(column.field).toBe('client')
      expect(column.headerName).toBe('Client')
      expect(column.sortable).toBe(false)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('Tooltip')
      expect(childComponent?.props.title.props.children.length).toBe(7)
      const tooltipContents = childComponent?.props.title.props.children
      expect(tooltipContents[0].type).toBe('span')
      expect(tooltipContents[0].props.children).toBe('Client parameters')
      expect(tooltipContents[1].type).toBe('br')
      expect(tooltipContents[2].length).toBe(1)
      expect(tooltipContents[2][0].type).toBe('div')
      expect(tooltipContents[2][0].key).toBe(
        'FixstarsClient_v0.6.4-54-ge56964d-V100_outputs.feasibilities_true',
      )
      expect(tooltipContents[2][0].props.children).toEqual([
        '- ',
        'outputs.feasibilities',
        ': ',
        'true',
      ])
      expect(tooltipContents[3].type).toBe('br')
      expect(tooltipContents[4].type).toBe('span')
      expect(tooltipContents[4].props.children).toBe('Problem parameters')
      expect(tooltipContents[5].type).toBe('br')
      expect(tooltipContents[6].length).toBe(1)
      expect(tooltipContents[6][0].type).toBe('div')
      expect(tooltipContents[6][0].key).toBe(
        'FixstarsClient_v0.6.4-54-ge56964d-V100_num_vars',
      )
      expect(tooltipContents[6][0].props.children.length).toBe(2)
      expect(tooltipContents[6][0].props.children[0].type).toBe('div')
      expect(tooltipContents[6][0].props.children[0].props.children).toEqual([
        '- ',
        'num_vars',
      ])
      expect(tooltipContents[6][0].props.children[1].length).toBe(3)
      expect(tooltipContents[6][0].props.children[1][0].type).toBe('div')
      expect(tooltipContents[6][0].props.children[1][0].key).toBe(
        'num_vars_input',
      )
      expect(tooltipContents[6][0].props.children[1][0].props.style).toEqual({
        paddingLeft: 10,
      })
      expect(tooltipContents[6][0].props.children[1][0].props.children).toEqual(
        ['- ', 'input: 15376'],
      )
      expect(tooltipContents[6][0].props.children[1][1].type).toBe('div')
      expect(tooltipContents[6][0].props.children[1][1].key).toBe(
        'num_vars_logical',
      )
      expect(tooltipContents[6][0].props.children[1][1].props.style).toEqual({
        paddingLeft: 10,
      })
      expect(tooltipContents[6][0].props.children[1][1].props.children).toEqual(
        ['- ', 'logical: 15376'],
      )
      expect(tooltipContents[6][0].props.children[1][2].type).toBe('div')
      expect(tooltipContents[6][0].props.children[1][2].key).toBe(
        'num_vars_physical',
      )
      expect(tooltipContents[6][0].props.children[1][2].props.style).toEqual({
        paddingLeft: 10,
      })
      expect(tooltipContents[6][0].props.children[1][2].props.children).toEqual(
        ['- ', 'physical: 15376'],
      )

      const labelComponent = childComponent?.props.children.props.children
      expect(labelComponent.type.render.name).toBe('LinkWithRef')
      expect(labelComponent.props).toEqual({
        to: '/clients/FixstarsClient',
        children: 'FixstarsClient',
      })
    }

    {
      const column = columns[1]
      expect(column.field).toBe('version')
      expect(column.headerName).toBe('Version')
      expect(column.sortable).toBe(false)
    }

    {
      const column = columns[2]
      expect(column.field).toBe('label')
      expect(column.headerName).toBe('Label')
      expect(column.sortable).toBe(false)
    }

    {
      const column = columns[3]
      expect(column.field).toBe('0%')
      expect(column.headerName).toBe('TTS(0%)')
      expect(column.sortable).toBe(false)
      expect(column.flex).toBe(1)
      expect(column.minWidth).toBe(140)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('Tooltip')
      expect(childComponent?.props.title.props.children.length).toBe(7)
      expect(childComponent?.props.children.type).toBe('span')
      expect(childComponent?.props.children.props.children).toBe('-')
    }

    {
      const column = columns[4]
      expect(column.field).toBe('1%')
      expect(column.headerName).toBe('TTS(1%)')
      expect(column.sortable).toBe(false)
      expect(column.flex).toBe(1)
      expect(column.minWidth).toBe(140)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('Tooltip')
      expect(childComponent?.props.title.props.children.length).toBe(7)
      expect(childComponent?.props.children.type).toBe('span')
      expect(childComponent?.props.children.props.children).toBe('-')
    }

    {
      const column = columns[5]
      expect(column.field).toBe('5%')
      expect(column.headerName).toBe('TTS(5%)')
      expect(column.sortable).toBe(false)
      expect(column.flex).toBe(1)
      expect(column.minWidth).toBe(140)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('Tooltip')
      expect(childComponent?.props.title.props.children.length).toBe(7)
      expect(childComponent?.props.children.type).toBe('span')
      expect(childComponent?.props.children.props.children).toBe(
        '5767220.789231007',
      )
    }

    {
      const column = columns[6]
      expect(column.field).toBe('10%')
      expect(column.headerName).toBe('TTS(10%)')
      expect(column.sortable).toBe(false)
      expect(column.flex).toBe(1)
      expect(column.minWidth).toBe(140)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('Tooltip')
      expect(childComponent?.props.title.props.children.length).toBe(7)
      expect(childComponent?.props.children.type).toBe('span')
      expect(childComponent?.props.children.props.children).toBe('1000000')
    }

    {
      const column = columns[7]
      expect(column.field).toBe('20%')
      expect(column.headerName).toBe('TTS(20%)')
      expect(column.sortable).toBe(false)
      expect(column.flex).toBe(1)
      expect(column.minWidth).toBe(140)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('Tooltip')
      expect(childComponent?.props.title.props.children.length).toBe(7)
      expect(childComponent?.props.children.type).toBe('span')
      expect(childComponent?.props.children.props.children).toBe('1000000')
    }

    {
      const column = columns[8]
      expect(column.field).toBe('50%')
      expect(column.headerName).toBe('TTS(50%)')
      expect(column.sortable).toBe(false)
      expect(column.flex).toBe(1)
      expect(column.minWidth).toBe(140)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
      const childComponent = column.renderCell!(cellParameter) as any
      expect(childComponent?.type.render.name).toBe('Tooltip')
      expect(childComponent?.props.title.props.children.length).toBe(7)
      expect(childComponent?.props.children.type).toBe('span')
      expect(childComponent?.props.children.props.children).toBe('1000000')
    }
  })
})
