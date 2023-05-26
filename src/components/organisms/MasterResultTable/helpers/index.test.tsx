/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { columnGroups, columns } from './index'

describe('MasterResultTable organism component helpers', () => {
  it('columns', () => {
    const column1 = columns[0]
    expect(column1.field).toBe('problem_class')
    expect(column1.headerName).toBe('Problem class')
    expect(column1.sortable).toBe(false)
    expect(column1.minWidth).toBe(120)
    expect(column1.renderCell?.name).toBe('renderCell')

    const column2 = columns[1]
    expect(column2.field).toBe('problem_instance')
    expect(column2.headerName).toBe('Problem instance')
    expect(column2.sortable).toBe(false)
    expect(column2.minWidth).toBe(140)
    expect(column2.renderCell?.name).toBe('renderCell')

    const column3 = columns[2]
    expect(column3.field).toBe('client_name')
    expect(column3.headerName).toBe('Client name')
    expect(column3.sortable).toBe(false)
    expect(column3.minWidth).toBe(120)
    expect(column3.renderCell?.name).toBe('renderCell')

    const column4 = columns[3]
    expect(column4.field).toBe('client_version')
    expect(column4.headerName).toBe('Client version')
    expect(column4.sortable).toBe(false)
    expect(column4.minWidth).toBe(200)
    expect(column4.renderCell?.name).toBe('renderCell')

    const column5 = columns[4]
    expect(column5.field).toBe('setting_time')
    expect(column5.headerName).toBe('Setting time')
    expect(column5.sortable).toBe(false)
    expect(column5.minWidth).toBe(120)
    expect(column5.renderCell?.name).toBe('renderCell')

    const column6 = columns[5]
    expect(column6.field).toBe('num_samples')
    expect(column6.headerName).toBe('Num samples')
    expect(column6.sortable).toBe(false)
    expect(column6.minWidth).toBe(120)
    expect(column6.renderCell?.name).toBe('renderCell')

    const column7 = columns[6]
    expect(column7.field).toBe('num_feasibles')
    expect(column7.headerName).toBe('Num feasibles')
    expect(column7.sortable).toBe(false)
    expect(column7.minWidth).toBe(120)
    expect(column7.renderCell?.name).toBe('renderCell')

    const column8 = columns[7]
    expect(column8.field).toBe('num_reach_best')
    expect(column8.headerName).toBe('Num reach best')
    expect(column8.sortable).toBe(false)
    expect(column8.minWidth).toBe(140)
    expect(column8.renderCell?.name).toBe('renderCell')

    const column9 = columns[8]
    expect(column9.field).toBe('min')
    expect(column9.headerName).toBe('Min')
    expect(column9.sortable).toBe(false)
    expect(column9.minWidth).toBe(120)
    expect(column9.renderCell?.name).toBe('renderCell')

    const column10 = columns[9]
    expect(column10.field).toBe('25%')
    expect(column10.headerName).toBe('25%')
    expect(column10.sortable).toBe(false)
    expect(column10.minWidth).toBe(120)
    expect(column10.renderCell?.name).toBe('renderCell')

    const column11 = columns[10]
    expect(column11.field).toBe('50%')
    expect(column11.headerName).toBe('50%')
    expect(column11.sortable).toBe(false)
    expect(column11.minWidth).toBe(120)
    expect(column11.renderCell?.name).toBe('renderCell')

    const column12 = columns[11]
    expect(column12.field).toBe('75%')
    expect(column12.headerName).toBe('75%')
    expect(column12.sortable).toBe(false)
    expect(column12.minWidth).toBe(120)
    expect(column12.renderCell?.name).toBe('renderCell')

    const column13 = columns[12]
    expect(column13.field).toBe('max')
    expect(column13.headerName).toBe('Max')
    expect(column13.sortable).toBe(false)
    expect(column13.minWidth).toBe(120)
    expect(column13.renderCell?.name).toBe('renderCell')
  })

  it('columnGroups', () => {
    expect(columnGroups).toEqual([
      {
        groupId: 'Basic information',
        children: [
          { field: 'problem_class' },
          { field: 'problem_instance' },
          { field: 'client_name' },
          { field: 'client_version' },
          { field: 'setting_time' },
          { field: 'num_samples' },
          { field: 'num_feasibles' },
          { field: 'num_reach_best' },
        ],
      },
      {
        groupId: 'Target energy',
        children: [
          { field: 'min' },
          { field: '25%' },
          { field: '50%' },
          { field: '75%' },
          { field: 'max' },
        ],
      },
    ])
  })
})
