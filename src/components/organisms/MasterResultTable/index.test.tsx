import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import type { MasterData } from '@types'
import { mockDataGrid, mockTooltip } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { MasterResultTable } from '.'

describe('<MasterResultTable />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <MasterResultTable data={mockData as ReadonlyArray<MasterData>} />,
    )

    const dataGrid = mockDataGrid.mock.calls[0][0]
    expect(dataGrid.sx).toEqual({
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
        outline: 'none !important',
      },
    })

    expect(dataGrid.rows).toEqual([
      {
        id: '0-hhhhhhhhhhhhhhhhhhhhhhhhhh',
        num_feasibles: 20,
        mean: 100455.8,
        std: 1194.797476782704,
        min: 98340,
        '25%': 99680.25,
        '50%': 100536,
        '75%': 101316,
        max: 102254,
        num_samples: 20,
        num_reach_best: 0,
        setting_time: 1000000,
      },
      {
        id: '0-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        num_feasibles: 20,
        mean: 61958.5,
        std: 1127.9892916624976,
        min: 60150,
        '25%': 61323.75,
        '50%': 61608,
        '75%': 62679.25,
        max: 64612,
        num_samples: 20,
        num_reach_best: 0,
        setting_time: 1000000,
      },
      {
        id: '0-eeeeeeeeeeeeeeeeeeeeeeeeee',
        num_feasibles: 20,
        mean: 100455.8,
        std: 1194.797476782704,
        min: 98340,
        '25%': 99680.25,
        '50%': 100536,
        '75%': 101316,
        max: 102254,
        num_samples: 20,
        num_reach_best: 0,
        setting_time: 1000000,
      },
    ])

    expect(dataGrid.columnVisibilityModel).toEqual({
      problem_class: true,
      problem_instance: true,
    })
    expect(dataGrid.columns.length).toBe(13)

    const column1 = dataGrid.columns[0]
    expect(column1.field).toBe('problem_class')
    expect(column1.headerName).toBe('Problem class')
    expect(column1.sortable).toBe(false)
    expect(column1.minWidth).toBe(120)
    expect(column1.renderCell.name).toBe('renderCell')

    const column2 = dataGrid.columns[1]
    expect(column2.field).toBe('problem_instance')
    expect(column2.headerName).toBe('Problem instance')
    expect(column2.sortable).toBe(false)
    expect(column2.minWidth).toBe(140)
    expect(column2.renderCell.name).toBe('renderCell')

    const column3 = dataGrid.columns[2]
    expect(column3.field).toBe('client_name')
    expect(column3.headerName).toBe('Client name')
    expect(column3.sortable).toBe(false)
    expect(column3.minWidth).toBe(120)
    expect(column3.renderCell.name).toBe('renderCell')

    const column4 = dataGrid.columns[3]
    expect(column4.field).toBe('client_version')
    expect(column4.headerName).toBe('Client version')
    expect(column4.sortable).toBe(false)
    expect(column4.minWidth).toBe(200)
    expect(column4.renderCell.name).toBe('renderCell')

    const column5 = dataGrid.columns[4]
    expect(column5.field).toBe('setting_time')
    expect(column5.headerName).toBe('Setting time')
    expect(column5.sortable).toBe(false)
    expect(column5.minWidth).toBe(120)
    expect(column5.renderCell.name).toBe('renderCell')

    const column6 = dataGrid.columns[5]
    expect(column6.field).toBe('num_samples')
    expect(column6.headerName).toBe('Num samples')
    expect(column6.sortable).toBe(false)
    expect(column6.minWidth).toBe(120)
    expect(column6.renderCell.name).toBe('renderCell')

    const column7 = dataGrid.columns[6]
    expect(column7.field).toBe('num_feasibles')
    expect(column7.headerName).toBe('Num feasibles')
    expect(column7.sortable).toBe(false)
    expect(column7.minWidth).toBe(120)
    expect(column7.renderCell.name).toBe('renderCell')

    const column8 = dataGrid.columns[7]
    expect(column8.field).toBe('num_reach_best')
    expect(column8.headerName).toBe('Num reach best')
    expect(column8.sortable).toBe(false)
    expect(column8.minWidth).toBe(140)
    expect(column8.renderCell.name).toBe('renderCell')

    const column9 = dataGrid.columns[8]
    expect(column9.field).toBe('min')
    expect(column9.headerName).toBe('Min')
    expect(column9.sortable).toBe(false)
    expect(column9.minWidth).toBe(120)
    expect(column9.renderCell.name).toBe('renderCell')

    const column10 = dataGrid.columns[9]
    expect(column10.field).toBe('25%')
    expect(column10.headerName).toBe('25%')
    expect(column10.sortable).toBe(false)
    expect(column10.minWidth).toBe(120)
    expect(column10.renderCell.name).toBe('renderCell')

    const column11 = dataGrid.columns[10]
    expect(column11.field).toBe('50%')
    expect(column11.headerName).toBe('50%')
    expect(column11.sortable).toBe(false)
    expect(column11.minWidth).toBe(120)
    expect(column11.renderCell.name).toBe('renderCell')

    const column12 = dataGrid.columns[11]
    expect(column12.field).toBe('75%')
    expect(column12.headerName).toBe('75%')
    expect(column12.sortable).toBe(false)
    expect(column12.minWidth).toBe(120)
    expect(column12.renderCell.name).toBe('renderCell')

    const column13 = dataGrid.columns[12]
    expect(column13.field).toBe('max')
    expect(column13.headerName).toBe('Max')
    expect(column13.sortable).toBe(false)
    expect(column13.minWidth).toBe(120)
    expect(column13.renderCell.name).toBe('renderCell')

    expect(dataGrid.initialState).toEqual({ pagination: { pageSize: 3 } })
    expect(dataGrid.getRowId.name).toBe('getRowId')
    expect(dataGrid.hideFooter).toBe(true)
    expect(dataGrid.disableColumnMenu).toBe(true)
    expect(dataGrid.experimentalFeatures).toEqual({ columnGrouping: true })
    expect(dataGrid.columnGroupingModel).toEqual([
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

    expect(container).toMatchSnapshot()
  })

  it('Show parameters tooltip well', async () => {
    render(<MasterResultTable data={mockData as ReadonlyArray<MasterData>} />)

    mockTooltip.mockClear()
    fireEvent.mouseEnter(screen.getByText('AClient'))

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip')
      expect(tooltip).toBeVisible()

      const tooltipContents = tooltip.textContent
      expect(tooltipContents?.includes('Client parameters')).toBe(true)
      expect(tooltipContents?.includes('- outputs.feasibilities: true')).toBe(
        true,
      )
      expect(tooltipContents?.includes('Problem parameters')).toBe(true)
      expect(tooltipContents?.includes('- constraint_weight: 1')).toBe(true)
      expect(tooltipContents?.includes('- seed: null')).toBe(true)
    })
  })

  it('Hide problem columns', async () => {
    render(
      <MasterResultTable
        hideProblem
        data={mockData as ReadonlyArray<MasterData>}
      />,
    )

    const dataGrid = mockDataGrid.mock.calls[0][0]
    expect(dataGrid.columnVisibilityModel).toEqual({
      problem_class: false,
      problem_instance: false,
    })
  })
})
