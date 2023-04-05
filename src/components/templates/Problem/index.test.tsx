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
          instance="pr124"
          labels={['all', 'Optigan CI benchmark v0.6.4']}
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
      expect(sectionTitle.props.title).toBe('Tsp/pr124')
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
        'Optigan CI benchmark v0.6.4',
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
      expect(tabs.props.value).toBe('TTS')
      expect(tabs.props.onChange.name).toBe('onChange')

      {
        const tab = tabs.props.children[0]
        expect(tab.key).toBe('TTS')
        expect(tab.type.render.name).toBe('Tab')
        expect(tab.props).toEqual({ label: 'TTS', value: 'TTS' })
      }

      {
        const tab = tabs.props.children[1]
        expect(tab.key).toBe('Target energy')
        expect(tab.type.render.name).toBe('Tab')
        expect(tab.props).toEqual({
          label: 'Target energy',
          value: 'Target energy',
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
      expect(chartContainer[0].type.name).toBe('PlotTTS')
      expect(chartContainer[0].props.data).toEqual(mockReportData)
      expect(chartContainer[0].props.instance).toBe('pr124')
      expect(chartContainer[0].props.useHistory).toBe(true)
      expect(chartContainer[0].props.xtype).toBe('log')
      expect(chartContainer[0].props.ytype).toBe('log')
      expect(chartContainer[0].props.label).toBe('')
      expect(chartContainer[1]).toBe(false)
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
          client: 'FixstarsClient',
          version: 'v0.6.4-54-ge56964d-V100',
          clientParameters: { 'outputs.feasibilities': true },
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          label: 'Optigan CI benchmark v0.6.4',
          '0%': null,
          '1%': null,
          '5%': 5767220.789231007,
          '10%': 1000000,
          '20%': 1000000,
          '50%': 1000000,
        },
        {
          client: 'FixstarsClient',
          version: 'v0.6.4-54-ge56964d-A100',
          clientParameters: { 'outputs.feasibilities': true },
          problemParameters: {
            num_vars: {
              input: 2601,
              logical: 2601,
              physical: 2601,
            },
            constraint_weight: 1,
            seed: null,
          },
          label: '20220927_173640',
          '0%': null,
          '1%': null,
          '5%': null,
          '10%': null,
          '20%': null,
          '50%': null,
        },
        {
          client: 'FixstarsClient',
          version: 'v0.7.0-V100',
          clientParameters: { 'outputs.feasibilities': true, num_gpus: 4 },
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          label: 'Optigan CI benchmark v0.6.4',
          '0%': null,
          '1%': null,
          '5%': 5380407.729629215,
          '10%': 932929.0357109132,
          '20%': 932929.0357109132,
          '50%': 932929.0357109132,
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
        expect(column.field).toBe('0%')
        expect(column.headerName).toBe('TTS(0%)')
        expect(column.sortable).toBe(false)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[4]
        expect(column.field).toBe('1%')
        expect(column.headerName).toBe('TTS(1%)')
        expect(column.sortable).toBe(false)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[5]
        expect(column.field).toBe('5%')
        expect(column.headerName).toBe('TTS(5%)')
        expect(column.sortable).toBe(false)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[6]
        expect(column.field).toBe('10%')
        expect(column.headerName).toBe('TTS(10%)')
        expect(column.sortable).toBe(false)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[7]
        expect(column.field).toBe('20%')
        expect(column.headerName).toBe('TTS(20%)')
        expect(column.sortable).toBe(false)
        expect(column.flex).toBe(1)
        expect(column.minWidth).toBe(140)
        expect(column.renderCell.name).toBe('renderCell')
      }

      {
        const column = dataGrid.props.columns[8]
        expect(column.field).toBe('50%')
        expect(column.headerName).toBe('TTS(50%)')
        expect(column.sortable).toBe(false)
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
          instance="pr124"
          labels={['all', 'Optigan CI benchmark v0.6.4']}
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
        'Optigan CI benchmark v0.6.4',
      ])
      expect(selectBox.props.onChange.name).toBe('onChange')
    }

    {
      const childComponent = layout.children[3]
      const chart = childComponent.props.children
      expect(chart[0].type.name).toBe('PlotTTS')
      expect(chart[0].props.label).toBe('')
    }

    {
      const childComponent = layout.children[4]
      const dataGrid = childComponent.props.children[0]
      expect(dataGrid.props.rows).toEqual([
        {
          client: 'FixstarsClient',
          version: 'v0.6.4-54-ge56964d-V100',
          clientParameters: { 'outputs.feasibilities': true },
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          label: 'Optigan CI benchmark v0.6.4',
          '0%': null,
          '1%': null,
          '5%': 5767220.789231007,
          '10%': 1000000,
          '20%': 1000000,
          '50%': 1000000,
        },
        {
          client: 'FixstarsClient',
          version: 'v0.6.4-54-ge56964d-A100',
          clientParameters: { 'outputs.feasibilities': true },
          problemParameters: {
            num_vars: {
              input: 2601,
              logical: 2601,
              physical: 2601,
            },
            constraint_weight: 1,
            seed: null,
          },
          label: '20220927_173640',
          '0%': null,
          '1%': null,
          '5%': null,
          '10%': null,
          '20%': null,
          '50%': null,
        },
        {
          client: 'FixstarsClient',
          version: 'v0.7.0-V100',
          clientParameters: { 'outputs.feasibilities': true, num_gpus: 4 },
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          label: 'Optigan CI benchmark v0.6.4',
          '0%': null,
          '1%': null,
          '5%': 5380407.729629215,
          '10%': 932929.0357109132,
          '20%': 932929.0357109132,
          '50%': 932929.0357109132,
        },
      ])
    }

    // Change Label data
    mockLayout.mockClear()
    act(() => {
      layout.children[1].props.children.props.onChange(
        'Optigan CI benchmark v0.6.4',
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
        'Optigan CI benchmark v0.6.4',
      ])
      expect(selectBox.props.onChange.name).toBe('onChange')
    }

    {
      const childComponent = layout.children[3]
      const chart = childComponent.props.children
      expect(chart[0].type.name).toBe('PlotTTS')
      expect(chart[0].props.label).toBe('Optigan CI benchmark v0.6.4')
    }

    {
      const childComponent = layout.children[4]
      const dataGrid = childComponent.props.children[0]
      expect(dataGrid.props.rows).toEqual([
        {
          client: 'FixstarsClient',
          version: 'v0.6.4-54-ge56964d-V100',
          clientParameters: { 'outputs.feasibilities': true },
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          label: 'Optigan CI benchmark v0.6.4',
          '0%': null,
          '1%': null,
          '5%': 5767220.789231007,
          '10%': 1000000,
          '20%': 1000000,
          '50%': 1000000,
        },
        {
          client: 'FixstarsClient',
          version: 'v0.7.0-V100',
          clientParameters: { 'outputs.feasibilities': true, num_gpus: 4 },
          problemParameters: {
            num_vars: {
              input: 15376,
              logical: 15376,
              physical: 15376,
            },
          },
          label: 'Optigan CI benchmark v0.6.4',
          '0%': null,
          '1%': null,
          '5%': 5380407.729629215,
          '10%': 932929.0357109132,
          '20%': 932929.0357109132,
          '50%': 932929.0357109132,
        },
      ])
    }
  })

  it('Change chart when tab is changed', async () => {
    render(
      <BrowserRouter>
        <Problem
          className="Tsp"
          instance="pr124"
          labels={['all', 'Optigan CI benchmark v0.6.4']}
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
      expect(tabs.props.value).toBe('TTS')
    }

    {
      const childComponent = layout.children[3]
      const chartContainer = childComponent.props.children
      expect(chartContainer.length).toBe(5)
      expect(chartContainer[0].type.name).toBe('PlotTTS')
      expect(chartContainer[0].props.data).toEqual(mockReportData)
      expect(chartContainer[0].props.instance).toBe('pr124')
      expect(chartContainer[0].props.useHistory).toBe(true)
      expect(chartContainer[0].props.xtype).toBe('log')
      expect(chartContainer[0].props.ytype).toBe('log')
      expect(chartContainer[0].props.label).toBe('')
      expect(chartContainer[1]).toBe(false)
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
      expect(chartContainer[2].props.instance).toBe('pr124')
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
          instance="pr124"
          labels={['all', 'Optigan CI benchmark v0.6.4']}
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
