import { act } from 'react-dom/test-utils'

import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockFab, mockLayout } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockProblemData.json'
import mockReportData from 'utils/test/mocks/data/mockReportData.json'

import { Problem } from '.'

describe('<Problem />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <Problem
          className="Tsp"
          instance="r_instance"
          labels={['all', 'AAA CI benchmark v0.6.4']}
          data={mockData}
          reportData={mockReportData}
        />
      </BrowserRouter>,
    )

    const layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(5)

    {
      const childComponent = layout.children[0]
      expect(childComponent.type.name).toBe('Box')
      const sectionTitle = childComponent.props.children
      expect(sectionTitle.type.name).toBe('SectionTitle')
      expect(sectionTitle.props.title).toBe('Tsp/r_instance')
    }

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

    {
      const childComponent = layout.children[2]
      expect(childComponent.type.name).toBe('Box')
      expect(childComponent.props.sx).toEqual({
        borderBottom: 1,
        borderColor: 'divider',
        marginBottom: '8px',
      })
      const tabs = childComponent.props.children
      expect(tabs.props.variant).toBe('scrollable')
      expect(tabs.props.scrollButtons).toBe('auto')
      expect(tabs.props.value).toBe('Target energy')
      expect(tabs.props.onChange.name).toBe('onChange')

      {
        const tab = tabs.props.children[0]
        expect(tab.key).toBe('Target energy')
        expect(tab.type.render.name).toBe('Tab')
        expect(tab.props).toEqual({
          label: 'Target energy',
          value: 'Target energy',
        })
      }

      {
        const tab = tabs.props.children[1]
        expect(tab.key).toBe('TTS')
        expect(tab.type.render.name).toBe('Tab')
        expect(tab.props).toEqual({
          label: 'TTS',
          value: 'TTS',
        })
      }

      {
        const tab = tabs.props.children[2]
        expect(tab.key).toBe('Feasible rate')
        expect(tab.type.render.name).toBe('Tab')
        expect(tab.props).toEqual({
          label: 'Feasible rate',
          value: 'Feasible rate',
        })
      }

      {
        const tab = tabs.props.children[3]
        expect(tab.key).toBe('Reach best rate')
        expect(tab.type.render.name).toBe('Tab')
        expect(tab.props).toEqual({
          label: 'Reach best rate',
          value: 'Reach best rate',
        })
      }
    }

    {
      const childComponent = layout.children[3]
      expect(childComponent.type.name).toBe('Box')
      expect(childComponent.props.sx).toEqual({ flex: 1, display: 'initial' })
      const chartContainer = childComponent.props.children
      expect(chartContainer.length).toBe(5)
      expect(chartContainer[0]).toBe(false)
      expect(chartContainer[1].type.name).toBe('PlotTargetEnergy')
      expect(chartContainer[1].props.data).toEqual(mockReportData)
      expect(chartContainer[1].props.instance).toBe('r_instance')
      expect(chartContainer[1].props.useHistory).toBe(true)
      expect(chartContainer[1].props.label).toBe('')
      expect(chartContainer[2]).toBe(false)
      expect(chartContainer[3]).toBe(false)

      const fab = chartContainer[4]
      expect(fab.type.name).toBe('Fab')
      expect(fab.props.color).toBe('primary')
      expect(fab.props.variant).toBe('extended')
      expect(fab.props.size).toBe('large')
      expect(fab.props.sx).toEqual({
        position: 'absolute',
        bottom: '20px',
        right: '20px',
      })
      expect(fab.props.onClick.name).toBe('onClick')
      expect(fab.props.children).toBe('Data')
    }

    {
      const childComponent = layout.children[4]
      expect(childComponent.type.name).toBe('Box')
      expect(childComponent.props.sx).toEqual({ display: 'none', flex: 1 })
      expect(childComponent.props.children.length).toBe(2)

      const dataGrid = childComponent.props.children[0]
      expect(dataGrid.type.name).toBe('DataGrid')
      expect(dataGrid.props.sx).toEqual({
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none !important',
        },
        '&.MuiDataGrid-root .MuiDataGrid-cell.parameters': {
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '5px 0 5px 0',
        },
      })
      expect(dataGrid.props.rows).toEqual([
        {
          benchmark_id: 'ccccccccccccc',
          'TTS(0%)': null,
          'TTS(1%)': null,
          'TTS(10%)': 1000000,
          'TTS(20%)': 1000000,
          'TTS(5%)': 5767220.789231007,
          'TTS(50%)': 1000000,
          client: 'a_client',
          clientParameters: {
            num_gpus: 4,
            'outputs.feasibilities': true,
          },
          feasible_rate: 1,
          label: '',
          num_samples: 100,
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          reach_best_rate: 0,
          specified_time: 100,
          'target_energy(25%)': 200,
          'target_energy(50%)': 300,
          'target_energy(75%)': 400,
          'target_energy(max)': 500,
          'target_energy(min)': 100,
          version: 'v0.7.0-V100',
        },
      ])

      {
        const column = dataGrid.props.columns[0]
        expect(column.field).toBe('client')
        expect(column.headerName).toBe('Client')
        expect(column.sortable).toBe(false)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[1]
        expect(column.field).toBe('version')
        expect(column.headerName).toBe('Version')
        expect(column.sortable).toBe(false)
      }

      {
        const column = dataGrid.props.columns[2]
        expect(column.field).toBe('label')
        expect(column.headerName).toBe('Label')
        expect(column.sortable).toBe(false)
      }
      {
        const column = dataGrid.props.columns[3]
        expect(column.field).toBe('specified_time')
        expect(column.headerName).toBe('SpecifiedTime')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[4]
        expect(column.field).toBe('num_samples')
        expect(column.headerName).toBe('NumSamples')
        expect(column.sortable).toBe(false)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[5]
        expect(column.field).toBe('feasible_rate')
        expect(column.headerName).toBe('FeasibleRate')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[6]
        expect(column.field).toBe('reach_best_rate')
        expect(column.headerName).toBe('ReachBestRate')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[7]
        expect(column.field).toBe('target_energy(min)')
        expect(column.headerName).toBe('TargetEnergy(min)')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[8]
        expect(column.field).toBe('target_energy(25%)')
        expect(column.headerName).toBe('TargetEnergy(25%)')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[9]
        expect(column.field).toBe('target_energy(50%)')
        expect(column.headerName).toBe('TargetEnergy(50%)')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[10]
        expect(column.field).toBe('target_energy(75%)')
        expect(column.headerName).toBe('TargetEnergy(75%)')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[11]
        expect(column.field).toBe('target_energy(max)')
        expect(column.headerName).toBe('TargetEnergy(max)')
        expect(column.sortable).toBe(true)
        expect(column.minWidth).toBe(220)
      }
      {
        const column = dataGrid.props.columns[12]
        expect(column.field).toBe('TTS(0%)')
        expect(column.headerName).toBe('TTS(0%)')
        expect(column.sortable).toBe(true)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[13]
        expect(column.field).toBe('TTS(1%)')
        expect(column.headerName).toBe('TTS(1%)')
        expect(column.sortable).toBe(true)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[14]
        expect(column.field).toBe('TTS(5%)')
        expect(column.headerName).toBe('TTS(5%)')
        expect(column.sortable).toBe(true)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[15]
        expect(column.field).toBe('TTS(10%)')
        expect(column.headerName).toBe('TTS(10%)')
        expect(column.sortable).toBe(true)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[16]
        expect(column.field).toBe('TTS(20%)')
        expect(column.headerName).toBe('TTS(20%)')
        expect(column.sortable).toBe(true)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[17]
        expect(column.field).toBe('TTS(50%)')
        expect(column.headerName).toBe('TTS(50%)')
        expect(column.sortable).toBe(true)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }
      expect(dataGrid.props.hideFooter).toBe(true)
      expect(dataGrid.props.getRowId.name).toBe('getRowId')
      expect(dataGrid.props.disableColumnMenu).toBe(true)
      expect(dataGrid.props.initialState).toEqual({
        pagination: {
          pageSize: 3,
        },
      })
      expect(dataGrid.props.getRowHeight.name).toBe('getRowHeight')

      const fab = childComponent.props.children[1]
      expect(fab.type.name).toBe('Fab')
      expect(fab.props.color).toBe('primary')
      expect(fab.props.variant).toBe('extended')
      expect(fab.props.size).toBe('large')
      expect(fab.props.sx).toEqual({
        position: 'absolute',
        bottom: '20px',
        right: '20px',
      })
      expect(fab.props.onClick.name).toBe('onClick')
      expect(fab.props.children).toBe('Chart')
    }

    expect(container).toMatchSnapshot()
  })

  it('Change label', async () => {
    render(
      <BrowserRouter>
        <Problem
          className="Tsp"
          instance="r_instance"
          labels={['all', 'AAA CI benchmark v0.6.4']}
          data={mockData}
          reportData={mockReportData}
        />
      </BrowserRouter>,
    )

    let layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(5)

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

    {
      const childComponent = layout.children[3]
      const chart = childComponent.props.children
      expect(chart[1].type.name).toBe('PlotTargetEnergy')
      expect(chart[1].props.label).toBe('')
    }

    {
      const childComponent = layout.children[4]
      const dataGrid = childComponent.props.children[0]
      expect(dataGrid.props.rows).toEqual([
        {
          benchmark_id: 'ccccccccccccc',
          'TTS(0%)': null,
          'TTS(1%)': null,
          'TTS(10%)': 1000000,
          'TTS(20%)': 1000000,
          'TTS(5%)': 5767220.789231007,
          'TTS(50%)': 1000000,
          client: 'a_client',
          clientParameters: {
            num_gpus: 4,
            'outputs.feasibilities': true,
          },
          feasible_rate: 1,
          label: '',
          num_samples: 100,
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          reach_best_rate: 0,
          specified_time: 100,
          'target_energy(25%)': 200,
          'target_energy(50%)': 300,
          'target_energy(75%)': 400,
          'target_energy(max)': 500,
          'target_energy(min)': 100,
          version: 'v0.7.0-V100',
        },
      ])
    }

    // Change Label data
    mockLayout.mockClear()
    act(() => {
      layout.children[1].props.children.props.onChange(
        'AAA CI benchmark v0.6.4',
      )
    })

    layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(5)

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

    {
      const childComponent = layout.children[3]
      const chart = childComponent.props.children
      expect(chart[1].type.name).toBe('PlotTargetEnergy')
      expect(chart[1].props.label).toBe('AAA CI benchmark v0.6.4')
    }

    {
      const childComponent = layout.children[4]
      const dataGrid = childComponent.props.children[0]
      expect(dataGrid.props.rows).toEqual([
        {
          benchmark_id: 'aaaaaaaaaaa',
          'TTS(0%)': null,
          'TTS(1%)': null,
          'TTS(10%)': 1000000,
          'TTS(20%)': 1000000,
          'TTS(5%)': 5767220.789231007,
          'TTS(50%)': 1000000,
          client: 'a_client',
          clientParameters: {
            'outputs.feasibilities': true,
          },
          feasible_rate: 1,
          label: 'AAA CI benchmark v0.6.4',
          num_samples: 100,
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          reach_best_rate: 0,
          specified_time: 100,
          'target_energy(25%)': 200,
          'target_energy(50%)': 300,
          'target_energy(75%)': 400,
          'target_energy(max)': 500,
          'target_energy(min)': 100,
          version: 'v0.6.4-54-ge56964d-V100',
        },
      ])
    }
  })

  it('Change chart when tab is changed', async () => {
    render(
      <BrowserRouter>
        <Problem
          className="Tsp"
          instance="r_instance"
          labels={['all', 'AAA CI benchmark v0.6.4']}
          data={mockData}
          reportData={mockReportData}
        />
      </BrowserRouter>,
    )

    let layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(5)

    {
      const childComponent = layout.children[2]
      const tabs = childComponent.props.children
      expect(tabs.props.value).toBe('Target energy')
    }

    {
      const childComponent = layout.children[3]
      const chartContainer = childComponent.props.children
      expect(chartContainer.length).toBe(5)
      expect(chartContainer[0]).toBe(false)
      expect(chartContainer[1].type.name).toBe('PlotTargetEnergy')
      expect(chartContainer[1].props.data).toEqual(mockReportData)
      expect(chartContainer[1].props.instance).toBe('r_instance')
      expect(chartContainer[1].props.useHistory).toBe(true)
      expect(chartContainer[1].props.label).toBe('')
      expect(chartContainer[2]).toBe(false)
      expect(chartContainer[3]).toBe(false)

      const fab = chartContainer[4]
      expect(fab.type.name).toBe('Fab')
    }

    // Change tab
    mockLayout.mockClear()
    act(() => {
      layout.children[2].props.children.props.onChange('', 'Feasible rate')
    })

    layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(5)

    {
      const childComponent = layout.children[2]
      const tabs = childComponent.props.children
      expect(tabs.props.value).toBe('Feasible rate')
    }

    {
      const childComponent = layout.children[3]
      const chartContainer = childComponent.props.children
      expect(chartContainer.length).toBe(5)
      expect(chartContainer[0]).toBe(false)
      expect(chartContainer[1]).toBe(false)
      expect(chartContainer[2].type.name).toBe('PlotFeasibleRate')
      expect(chartContainer[2].props.data).toEqual(mockReportData)
      expect(chartContainer[2].props.instance).toBe('r_instance')
      expect(chartContainer[2].props.useHistory).toBe(true)
      expect(chartContainer[2].props.xtype).toBe('log')
      expect(chartContainer[2].props.label).toBe('')
      expect(chartContainer[3]).toBe(false)

      const fab = chartContainer[4]
      expect(fab.type.name).toBe('Fab')
    }
  })

  it('SHow and hide data table', async () => {
    render(
      <BrowserRouter>
        <Problem
          className="Tsp"
          instance="r_instance"
          labels={['all', 'AAA CI benchmark v0.6.4']}
          data={mockData}
          reportData={mockReportData}
        />
      </BrowserRouter>,
    )

    let layout = mockLayout.mock.calls[0][0]
    {
      const chart = layout.children[3]
      expect(chart.props.sx).toEqual({ flex: 1, display: 'initial' })
      const dataTable = layout.children[4]
      expect(dataTable.props.sx).toEqual({ flex: 1, display: 'none' })
    }

    // click Fab button
    mockLayout.mockClear()
    expect(mockFab.mock.calls.length).toBe(2)
    expect(mockFab.mock.calls[0][0].children).toBe('Data')
    act(() => mockFab.mock.calls[0][0].onClick())

    layout = mockLayout.mock.calls[0][0]
    {
      const chart = layout.children[3]
      expect(chart.props.sx).toEqual({ flex: 1, display: 'none' })
      const dataTable = layout.children[4]
      expect(dataTable.props.sx).toEqual({ flex: 1, display: 'initial' })
    }

    // click Fab button
    mockLayout.mockClear()
    expect(mockFab.mock.calls.length).toBe(4)
    expect(mockFab.mock.calls[3][0].children).toBe('Chart')
    act(() => mockFab.mock.calls[3][0].onClick())

    layout = mockLayout.mock.calls[0][0]
    {
      const chart = layout.children[3]
      expect(chart.props.sx).toEqual({ flex: 1, display: 'initial' })
      const dataTable = layout.children[4]
      expect(dataTable.props.sx).toEqual({ flex: 1, display: 'none' })
    }
  })
})
