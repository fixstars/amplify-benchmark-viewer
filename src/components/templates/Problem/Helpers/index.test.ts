/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
        'a_client_v0.6.4-54-ge56964d-V100_outputs.feasibilities_true',
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
        'a_client_v0.6.4-54-ge56964d-V100_num_vars',
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
        to: '/clients/a_client',
        children: 'a_client',
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
      expect(column.field).toBe('specified_time')
      expect(column.headerName).toBe('SpecifiedTime')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[4]
      expect(column.field).toBe('num_samples')
      expect(column.headerName).toBe('NumSamples')
      expect(column.sortable).toBe(false)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[5]
      expect(column.field).toBe('feasible_rate')
      expect(column.headerName).toBe('FeasibleRate')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[6]
      expect(column.field).toBe('reach_best_rate')
      expect(column.headerName).toBe('ReachBestRate')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[7]
      expect(column.field).toBe('target_energy(min)')
      expect(column.headerName).toBe('TargetEnergy(min)')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[8]
      expect(column.field).toBe('target_energy(25%)')
      expect(column.headerName).toBe('TargetEnergy(25%)')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[9]
      expect(column.field).toBe('target_energy(50%)')
      expect(column.headerName).toBe('TargetEnergy(50%)')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[10]
      expect(column.field).toBe('target_energy(75%)')
      expect(column.headerName).toBe('TargetEnergy(75%)')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[11]
      expect(column.field).toBe('target_energy(max)')
      expect(column.headerName).toBe('TargetEnergy(max)')
      expect(column.sortable).toBe(true)
      expect(column.minWidth).toBe(220)
    }
    {
      const column = columns[12]
      expect(column.field).toBe('TTS(0%)')
      expect(column.headerName).toBe('TTS(0%)')
      expect(column.sortable).toBe(true)
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
      const column = columns[13]
      expect(column.field).toBe('TTS(1%)')
      expect(column.headerName).toBe('TTS(1%)')
      expect(column.sortable).toBe(true)
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
      const column = columns[14]
      expect(column.field).toBe('TTS(5%)')
      expect(column.headerName).toBe('TTS(5%)')
      expect(column.sortable).toBe(true)
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
      const column = columns[15]
      expect(column.field).toBe('TTS(10%)')
      expect(column.headerName).toBe('TTS(10%)')
      expect(column.sortable).toBe(true)
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
      const column = columns[16]
      expect(column.field).toBe('TTS(20%)')
      expect(column.headerName).toBe('TTS(20%)')
      expect(column.sortable).toBe(true)
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
      const column = columns[17]
      expect(column.field).toBe('TTS(50%)')
      expect(column.headerName).toBe('TTS(50%)')
      expect(column.sortable).toBe(true)
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
