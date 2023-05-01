import { fireEvent, render, screen, act } from '@testing-library/react'
import type { MasterData } from '@types'
import { BrowserRouter } from 'react-router-dom'
import { mockLayout, mockMasterDataFiltering } from 'utils/test'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { Master } from '.'

describe('<Master />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <Master data={mockData as ReadonlyArray<MasterData>} />
      </BrowserRouter>,
    )

    const layout = mockLayout.mock.calls[0][0]
    expect(layout.children.length).toBe(4)

    {
      const box = layout.children[0]
      expect(box.type.name).toBe('Box')

      const sectionTitle = box.props.children
      expect(sectionTitle.type.name).toBe('SectionTitle')
      expect(sectionTitle.props.title).toBe('Database')

      const rightComponent = sectionTitle.props.rightComponent
      expect(rightComponent.type.render.name).toBe('IconButton')
      expect(rightComponent.props.onClick.name).toBe('onClick')
    }

    {
      const component = layout.children[1]
      expect(component).toBe(false)
    }

    {
      const box = layout.children[2]
      expect(box.type.name).toBe('Box')
      expect(box.props.sx).toEqual({
        borderBottom: 1,
        borderColor: 'divider',
        marginBottom: '8px',
      })

      const tabsContainer = box.props.children
      expect(tabsContainer.type.name).toBe('Tabs')
      expect(tabsContainer.props.variant).toBe('scrollable')
      expect(tabsContainer.props.scrollButtons).toBe('auto')
      expect(tabsContainer.props.value).toBe('b_instance')
      expect(tabsContainer.props.onChange.name).toBe('onChange')

      const tabs = tabsContainer.props.children
      expect(tabs[0].type.render.name).toBe('Tab')
      expect(tabs[0].key).toBe('b_instance')
      expect(tabs[0].props).toEqual({
        label: 'b_instance',
        value: 'b_instance',
      })
      expect(tabs[1].type.render.name).toBe('Tab')
      expect(tabs[1].key).toBe('r_instance')
      expect(tabs[1].props).toEqual({
        label: 'r_instance',
        value: 'r_instance',
      })
    }

    {
      const box = layout.children[3]
      expect(box.type.name).toBe('Box')
      expect(box.props.sx).toEqual({ display: 'flex', flex: 1 })
      expect(box.props.children.length).toBe(3)

      const chartContainer = box.props.children[0]
      expect(chartContainer.type.render.displayName).toBe('Styled(Box)')
      expect(chartContainer.props.sx).toEqual({ display: 'initial' })

      const chart = chartContainer.props.children
      expect(chart.type.name).toBe('MasterResultChart')
      expect(chart.props.problemInstance).toBe('b_instance')
      expect(chart.props.data).toEqual([
        {
          group_id: 'eeeeeeeeeeeeeeeeeeeeeeeeee',
          problem_id: 'ffffffffffffffffffffffffffff',
          client_id: 'gggggggggggggggggggggggggggggggg',
          problem_class: 'Tsp',
          problem_instance: 'b_instance',
          problem_best_known: 96772,
          problem_parameters: { constraint_weight: 1, seed: null },
          problem_num_vars: { input: 18496, logical: 18496, physical: 18496 },
          client_name: 'a_client',
          client_version: 'v1.0.0',
          client_parameters: { 'outputs.feasibilities': true },
          amplify_version: '0.8.1+1662782383',
          setting_times: [1000000],
          results: mockData[0].results,
          plot_data: mockData[0].plot_data,
        },
        {
          group_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          problem_id: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          client_id: 'ccccccccccccccccccccccccccccccccccc',
          problem_class: 'Tsp',
          problem_instance: 'r_instance',
          problem_best_known: 59030,
          problem_parameters: { constraint_weight: 1, seed: null },
          problem_num_vars: { input: 15376, logical: 15376, physical: 15376 },
          client_name: 'a_client',
          client_version: 'v1.0.1',
          client_parameters: { 'outputs.feasibilities': true },
          amplify_version: '0.8.1+1662782383',
          setting_times: [1000000],
          results: mockData[1].results,
          plot_data: mockData[1].plot_data,
        },
        {
          group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
          problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
          client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
          problem_class: 'abc',
          problem_instance: 'b_instance',
          problem_best_known: 96772,
          problem_parameters: { constraint_weight: 1, seed: null },
          problem_num_vars: { input: 18496, logical: 18496, physical: 18496 },
          client_name: 'AClient',
          client_version: 'v1.0.0',
          client_parameters: { 'outputs.feasibilities': true },
          amplify_version: '0.8.1+1662782383',
          setting_times: [1000000],
          results: mockData[2].results,
          plot_data: mockData[2].plot_data,
        },
      ])
      expect(chart.props.clientChartType).toEqual({
        a_client: 'box',
        AClient: 'box',
      })

      const tableContainer = box.props.children[1]
      expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
      expect(tableContainer.props.sx).toEqual({ display: 'none' })
      const masterResultTable = tableContainer.props.children
      expect(masterResultTable.type.name).toBe('MasterResultTable')
      expect(masterResultTable.props.data).toEqual([
        {
          group_id: 'eeeeeeeeeeeeeeeeeeeeeeeeee',
          problem_id: 'ffffffffffffffffffffffffffff',
          client_id: 'gggggggggggggggggggggggggggggggg',
          problem_class: 'Tsp',
          problem_instance: 'b_instance',
          problem_best_known: 96772,
          problem_parameters: { constraint_weight: 1, seed: null },
          problem_num_vars: { input: 18496, logical: 18496, physical: 18496 },
          client_name: 'a_client',
          client_version: 'v1.0.0',
          client_parameters: { 'outputs.feasibilities': true },
          amplify_version: '0.8.1+1662782383',
          setting_times: [1000000],
          results: mockData[0].results,
          plot_data: mockData[0].plot_data,
        },
        {
          group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
          problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
          client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
          problem_class: 'abc',
          problem_instance: 'b_instance',
          problem_best_known: 96772,
          problem_parameters: { constraint_weight: 1, seed: null },
          problem_num_vars: { input: 18496, logical: 18496, physical: 18496 },
          client_name: 'AClient',
          client_version: 'v1.0.0',
          client_parameters: { 'outputs.feasibilities': true },
          amplify_version: '0.8.1+1662782383',
          setting_times: [1000000],
          results: mockData[2].results,
          plot_data: mockData[2].plot_data,
        },
      ])

      const toggleButton = box.props.children[2]
      expect(toggleButton.type.name).toBe('Fab')
      expect(toggleButton.props.color).toBe('primary')
      expect(toggleButton.props.variant).toBe('extended')
      expect(toggleButton.props.size).toBe('large')
      expect(toggleButton.props.sx).toEqual({
        position: 'absolute',
        bottom: '20px',
        right: '20px',
      })
      expect(toggleButton.props.onClick.name).toBe('onClick')
      expect(toggleButton.props.children).toBe('Data')
    }

    expect(container).toMatchSnapshot()
  })

  it('Show data table', async () => {
    render(
      <BrowserRouter>
        <Master data={mockData as ReadonlyArray<MasterData>} />
      </BrowserRouter>,
    )

    {
      const layout = mockLayout.mock.calls[0][0]
      expect(layout.children.length).toBe(4)

      const box = layout.children[3]
      expect(box.props.children.length).toBe(3)

      const chartContainer = box.props.children[0]
      expect(chartContainer.type.render.displayName).toBe('Styled(Box)')
      expect(chartContainer.props.sx).toEqual({ display: 'initial' })

      const tableContainer = box.props.children[1]
      expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
      expect(tableContainer.props.sx).toEqual({ display: 'none' })

      const toggleButton = box.props.children[2]
      expect(toggleButton.type.name).toBe('Fab')
      expect(toggleButton.props.children).toBe('Data')

      // Click toggle button
      mockLayout.mockClear()
      act(() => toggleButton.props.onClick())
    }

    {
      const layout = mockLayout.mock.calls[0][0]
      expect(layout.children.length).toBe(4)

      const box = layout.children[3]
      expect(box.props.children.length).toBe(3)

      const chartContainer = box.props.children[0]
      expect(chartContainer.type.render.displayName).toBe('Styled(Box)')
      expect(chartContainer.props.sx).toEqual({ display: 'none' })

      const tableContainer = box.props.children[1]
      expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
      expect(tableContainer.props.sx).toEqual({ display: 'initial' })

      const toggleButton = box.props.children[2]
      expect(toggleButton.type.name).toBe('Fab')
      expect(toggleButton.props.children).toBe('Chart')

      mockLayout.mockClear()
      act(() => toggleButton.props.onClick())
    }

    {
      const layout = mockLayout.mock.calls[0][0]
      expect(layout.children.length).toBe(4)

      const box = layout.children[3]
      expect(box.props.children.length).toBe(3)

      const chartContainer = box.props.children[0]
      expect(chartContainer.type.render.displayName).toBe('Styled(Box)')
      expect(chartContainer.props.sx).toEqual({ display: 'initial' })

      const tableContainer = box.props.children[1]
      expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
      expect(tableContainer.props.sx).toEqual({ display: 'none' })

      const toggleButton = box.props.children[2]
      expect(toggleButton.type.name).toBe('Fab')
      expect(toggleButton.props.children).toBe('Data')
    }
  })

  describe('Show filtering', () => {
    it('filtering is shown well', async () => {
      jest.useFakeTimers()

      render(
        <BrowserRouter>
          <Master data={mockData as ReadonlyArray<MasterData>} />
        </BrowserRouter>,
      )

      let layout = mockLayout.mock.calls[0][0]
      expect(layout.children.length).toBe(4)

      const box = layout.children[0]
      const sectionTitle = box.props.children
      expect(sectionTitle.type.name).toBe('SectionTitle')
      const rightComponent = sectionTitle.props.rightComponent
      expect(rightComponent.type.render.name).toBe('IconButton')
      expect(rightComponent.props.onClick.name).toBe('onClick')

      {
        const component = layout.children[1]
        expect(component).toBe(false)
      }

      // click filtering icon
      mockLayout.mockClear()
      act(() => {
        rightComponent.props.onClick()
        jest.runAllTimers()
      })

      layout = mockLayout.mock.calls[0][0]
      {
        const component = layout.children[1]
        expect(component.type.name).toBe('Box')
        expect(component.props.sx).toEqual({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        })
        expect(component.props.children.length).toBe(2)

        const background = component.props.children[0]
        expect(background.type.name).toBe('Box')
        expect(background.props.sx).toEqual({
          position: 'absolute',
          width: '100%',
          height: '100%',
        })
        expect(background.props.onClick.name).toBe('onClick')

        const collapse = component.props.children[1]
        expect(collapse.type.render.name).toBe('Collapse')
        expect(collapse.props.in).toBe(true)
        expect(collapse.props.timeout).toBe('auto')
        expect(collapse.props.sx).toEqual({
          position: 'absolute',
          zIndex: 1,
          backgroundColor: '#FFF',
          width: 'calc(100% - 32px)',
          minWidth: '1280px',
          margin: '0 8px 0 8px',
          padding: '8px',
          borderRadius: '4px',
          top: '125px',
          boxShadow: 2,
        })
        expect(collapse.props.children.length).toBe(4)

        const graphOptionTitle = collapse.props.children[0]
        expect(graphOptionTitle.type.name).toBe('Typography')
        expect(graphOptionTitle.props.sx).toEqual({ fontWeight: 'bold' })
        expect(graphOptionTitle.props.children).toBe('Graph options')

        const graphOptions = collapse.props.children[1]
        expect(graphOptions.type.name).toBe('Box')
        expect(graphOptions.props.sx).toEqual({
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '8px',
          marginLeft: '8px',
        })

        const options = graphOptions.props.children
        expect(options.length).toBe(2)

        {
          const option = options[0]
          expect(option.type.name).toBe('Box')
          expect(option.key).toBe('a_client')
          expect(option.props.sx).toEqual({ marginRight: '16px' })

          const select = option.props.children
          expect(select.type.name).toBe('SelectBox')
          expect(select.props.label).toBe('a_client')
          expect(select.props.options).toEqual([
            'box',
            'max-min',
            '3q-1q',
            'median',
          ])
          expect(select.props.onChange.name).toBe('onChange')
        }

        {
          const option = options[1]
          expect(option.type.name).toBe('Box')
          expect(option.key).toBe('AClient')
          expect(option.props.sx).toEqual({ marginRight: '16px' })

          const select = option.props.children
          expect(select.type.name).toBe('SelectBox')
          expect(select.props.label).toBe('AClient')
          expect(select.props.options).toEqual(['box'])
          expect(select.props.onChange.name).toBe('onChange')
        }

        const filteringOptionTitle = collapse.props.children[2]
        expect(filteringOptionTitle.type.name).toBe('Typography')
        expect(filteringOptionTitle.props.sx).toEqual({ fontWeight: 'bold' })
        expect(filteringOptionTitle.props.children).toBe('Filtering option')

        const filteringOptions = collapse.props.children[3]
        expect(filteringOptions.props.sx).toEqual({
          marginBottom: '8px',
          marginLeft: '8px',
        })
        expect(filteringOptions.props.children.length).toBe(3)
      }

      // click background of filtering
      mockLayout.mockClear()
      const background = layout.children[1].props.children[0]
      act(() => {
        background.props.onClick()
        jest.runAllTimers()
      })

      layout = mockLayout.mock.calls[0][0]
      {
        const component = layout.children[1]
        expect(component).toBe(false)
      }
    })
  })

  describe('Plot All', () => {
    it('Change problem instance by clicking tab', async () => {
      jest.useFakeTimers()

      render(
        <BrowserRouter>
          <Master data={mockData as ReadonlyArray<MasterData>} />
        </BrowserRouter>,
      )

      // click tab
      mockLayout.mockClear()
      fireEvent.click(screen.getByText('r_instance'))

      const layout = mockLayout.mock.calls[0][0]

      {
        const component = layout.children[1]
        expect(component).toBe(false)
      }

      {
        const box = layout.children[2]
        const tabsContainer = box.props.children
        expect(tabsContainer.props.value).toBe('r_instance')
      }

      {
        const box = layout.children[3]
        const chartContainer = box.props.children[0]
        const chart = chartContainer.props.children
        expect(chart.type.name).toBe('MasterResultChart')
        expect(chart.props.problemInstance).toBe('r_instance')
        expect(chart.props.data).toEqual([
          {
            group_id: 'eeeeeeeeeeeeeeeeeeeeeeeeee',
            problem_id: 'ffffffffffffffffffffffffffff',
            client_id: 'gggggggggggggggggggggggggggggggg',
            problem_class: 'Tsp',
            problem_instance: 'b_instance',
            problem_best_known: 96772,
            problem_parameters: { constraint_weight: 1, seed: null },
            problem_num_vars: { input: 18496, logical: 18496, physical: 18496 },
            client_name: 'a_client',
            client_version: 'v1.0.0',
            client_parameters: { 'outputs.feasibilities': true },
            amplify_version: '0.8.1+1662782383',
            setting_times: [1000000],
            results: mockData[0].results,
            plot_data: mockData[0].plot_data,
          },
          {
            group_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            problem_id: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            client_id: 'ccccccccccccccccccccccccccccccccccc',
            problem_class: 'Tsp',
            problem_instance: 'r_instance',
            problem_best_known: 59030,
            problem_parameters: { constraint_weight: 1, seed: null },
            problem_num_vars: { input: 15376, logical: 15376, physical: 15376 },
            client_name: 'a_client',
            client_version: 'v1.0.1',
            client_parameters: { 'outputs.feasibilities': true },
            amplify_version: '0.8.1+1662782383',
            setting_times: [1000000],
            results: mockData[1].results,
            plot_data: mockData[1].plot_data,
          },
          {
            group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
            problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
            client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
            problem_class: 'abc',
            problem_instance: 'b_instance',
            problem_best_known: 96772,
            problem_parameters: { constraint_weight: 1, seed: null },
            problem_num_vars: { input: 18496, logical: 18496, physical: 18496 },
            client_name: 'AClient',
            client_version: 'v1.0.0',
            client_parameters: { 'outputs.feasibilities': true },
            amplify_version: '0.8.1+1662782383',
            setting_times: [1000000],
            results: mockData[2].results,
            plot_data: mockData[2].plot_data,
          },
        ])
        expect(chart.props.clientChartType).toEqual({
          a_client: 'box',
          AClient: 'box',
        })

        const tableContainer = box.props.children[1]
        expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
        const masterResultTable = tableContainer.props.children
        expect(masterResultTable.type.name).toBe('MasterResultTable')
        expect(masterResultTable.props.data).toEqual([
          {
            group_id: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            problem_id: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            client_id: 'ccccccccccccccccccccccccccccccccccc',
            problem_class: 'Tsp',
            problem_instance: 'r_instance',
            problem_best_known: 59030,
            problem_parameters: { constraint_weight: 1, seed: null },
            problem_num_vars: { input: 15376, logical: 15376, physical: 15376 },
            client_name: 'a_client',
            client_version: 'v1.0.1',
            client_parameters: { 'outputs.feasibilities': true },
            amplify_version: '0.8.1+1662782383',
            setting_times: [1000000],
            results: mockData[1].results,
            plot_data: mockData[1].plot_data,
          },
        ])
      }
    })

    it('Change chart type', async () => {
      jest.useFakeTimers()

      render(
        <BrowserRouter>
          <Master data={mockData as ReadonlyArray<MasterData>} />
        </BrowserRouter>,
      )

      let layout = mockLayout.mock.calls[0][0]

      let box = layout.children[0]
      const sectionTitle = box.props.children
      expect(sectionTitle.type.name).toBe('SectionTitle')
      const rightComponent = sectionTitle.props.rightComponent
      expect(rightComponent.type.render.name).toBe('IconButton')
      expect(rightComponent.props.onClick.name).toBe('onClick')

      {
        const component = layout.children[1]
        expect(component).toBe(false)
      }

      // click filtering icon
      mockLayout.mockClear()
      act(() => {
        rightComponent.props.onClick()
        jest.runAllTimers()
      })

      layout = mockLayout.mock.calls[0][0]
      {
        const component = layout.children[1]
        const collapse = component.props.children[1]
        expect(collapse.props.in).toBe(true)

        const graphOptions = collapse.props.children[1]
        const options = graphOptions.props.children
        {
          const option = options[0]
          const select = option.props.children
          mockLayout.mockClear()
          act(() => select.props.onChange('max-min'))
        }
      }

      // click background of filtering
      mockLayout.mockClear()
      const background = layout.children[1].props.children[0]
      act(() => {
        background.props.onClick()
        jest.runAllTimers()
      })

      layout = mockLayout.mock.calls[0][0]

      {
        const component = layout.children[1]
        expect(component).toBe(false)
      }

      {
        box = layout.children[2]
        expect(box.type.name).toBe('Box')
        expect(box.props.sx).toEqual({
          borderBottom: 1,
          borderColor: 'divider',
          marginBottom: '8px',
        })

        const tabsContainer = box.props.children
        expect(tabsContainer.type.name).toBe('Tabs')
        expect(tabsContainer.props.value).toBe('b_instance')
      }

      {
        box = layout.children[3]
        expect(box.props.children.length).toBe(3)

        const chartContainer = box.props.children[0]
        const chart = chartContainer.props.children
        expect(chart.type.name).toBe('MasterResultChart')
        expect(chart.props.problemInstance).toBe('b_instance')
        expect(chart.props.clientChartType).toEqual({
          a_client: 'max-min',
          AClient: 'box',
        })
      }
    })

    describe('filtering', () => {
      it('change filtering with result table', async () => {
        jest.useFakeTimers()

        render(
          <BrowserRouter>
            <Master data={mockData as ReadonlyArray<MasterData>} />
          </BrowserRouter>,
        )

        let layout = mockLayout.mock.calls[0][0]

        {
          const box = layout.children[3]
          const tableContainer = box.props.children[1]
          expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
          const masterResultTable = tableContainer.props.children
          expect(masterResultTable.type.name).toBe('MasterResultTable')
          expect(masterResultTable.props.data).toEqual([
            {
              group_id: 'eeeeeeeeeeeeeeeeeeeeeeeeee',
              problem_id: 'ffffffffffffffffffffffffffff',
              client_id: 'gggggggggggggggggggggggggggggggg',
              problem_class: 'Tsp',
              problem_instance: 'b_instance',
              problem_best_known: 96772,
              problem_parameters: { constraint_weight: 1, seed: null },
              problem_num_vars: {
                input: 18496,
                logical: 18496,
                physical: 18496,
              },
              client_name: 'a_client',
              client_version: 'v1.0.0',
              client_parameters: { 'outputs.feasibilities': true },
              amplify_version: '0.8.1+1662782383',
              setting_times: [1000000],
              results: mockData[0].results,
              plot_data: mockData[0].plot_data,
            },
            {
              group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
              problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
              client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
              problem_class: 'abc',
              problem_instance: 'b_instance',
              problem_best_known: 96772,
              problem_parameters: { constraint_weight: 1, seed: null },
              problem_num_vars: {
                input: 18496,
                logical: 18496,
                physical: 18496,
              },
              client_name: 'AClient',
              client_version: 'v1.0.0',
              client_parameters: { 'outputs.feasibilities': true },
              amplify_version: '0.8.1+1662782383',
              setting_times: [1000000],
              results: mockData[2].results,
              plot_data: mockData[2].plot_data,
            },
          ])
        }

        {
          const box = layout.children[0]
          const sectionTitle = box.props.children
          const rightComponent = sectionTitle.props.rightComponent

          // click filtering icon
          mockLayout.mockClear()
          mockMasterDataFiltering.mockClear()
          act(() => {
            rightComponent.props.onClick()
            jest.runAllTimers()
          })

          mockLayout.mockClear()
          act(() =>
            mockMasterDataFiltering.mock.calls[0][0].onSelected(['abc']),
          )

          layout = mockLayout.mock.calls[0][0]
          // click background of filtering
          mockLayout.mockClear()
          const background = layout.children[1].props.children[0]
          act(() => {
            background.props.onClick()
            jest.runAllTimers()
          })
        }

        layout = mockLayout.mock.calls[0][0]

        {
          const box = layout.children[3]
          const tableContainer = box.props.children[1]
          expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
          const masterResultTable = tableContainer.props.children
          expect(masterResultTable.type.name).toBe('MasterResultTable')
          expect(masterResultTable.props.data).toEqual([
            {
              group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
              problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
              client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
              problem_class: 'abc',
              problem_instance: 'b_instance',
              problem_best_known: 96772,
              problem_parameters: { constraint_weight: 1, seed: null },
              problem_num_vars: {
                input: 18496,
                logical: 18496,
                physical: 18496,
              },
              client_name: 'AClient',
              client_version: 'v1.0.0',
              client_parameters: { 'outputs.feasibilities': true },
              amplify_version: '0.8.1+1662782383',
              setting_times: [1000000],
              results: mockData[2].results,
              plot_data: mockData[2].plot_data,
            },
          ])
        }
      })

      it('change filtering with result chart', async () => {
        jest.useFakeTimers()

        render(
          <BrowserRouter>
            <Master data={mockData as ReadonlyArray<MasterData>} />
          </BrowserRouter>,
        )

        let layout = mockLayout.mock.calls[0][0]

        {
          const box = layout.children[3]
          const tableContainer = box.props.children[1]
          expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
          const masterResultTable = tableContainer.props.children
          expect(masterResultTable.type.name).toBe('MasterResultTable')
          expect(masterResultTable.props.data).toEqual([
            {
              group_id: 'eeeeeeeeeeeeeeeeeeeeeeeeee',
              problem_id: 'ffffffffffffffffffffffffffff',
              client_id: 'gggggggggggggggggggggggggggggggg',
              problem_class: 'Tsp',
              problem_instance: 'b_instance',
              problem_best_known: 96772,
              problem_parameters: { constraint_weight: 1, seed: null },
              problem_num_vars: {
                input: 18496,
                logical: 18496,
                physical: 18496,
              },
              client_name: 'a_client',
              client_version: 'v1.0.0',
              client_parameters: { 'outputs.feasibilities': true },
              amplify_version: '0.8.1+1662782383',
              setting_times: [1000000],
              results: mockData[0].results,
              plot_data: mockData[0].plot_data,
            },
            {
              group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
              problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
              client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
              problem_class: 'abc',
              problem_instance: 'b_instance',
              problem_best_known: 96772,
              problem_parameters: { constraint_weight: 1, seed: null },
              problem_num_vars: {
                input: 18496,
                logical: 18496,
                physical: 18496,
              },
              client_name: 'AClient',
              client_version: 'v1.0.0',
              client_parameters: { 'outputs.feasibilities': true },
              amplify_version: '0.8.1+1662782383',
              setting_times: [1000000],
              results: mockData[2].results,
              plot_data: mockData[2].plot_data,
            },
          ])
        }

        {
          const box = layout.children[0]
          const sectionTitle = box.props.children
          const rightComponent = sectionTitle.props.rightComponent

          // click filtering icon
          mockLayout.mockClear()
          mockMasterDataFiltering.mockClear()
          act(() => {
            rightComponent.props.onClick()
            jest.runAllTimers()
          })

          mockLayout.mockClear()
          act(() =>
            mockMasterDataFiltering.mock.calls[0][0].onSelected(['abc']),
          )

          layout = mockLayout.mock.calls[0][0]
          // click background of filtering
          mockLayout.mockClear()
          const background = layout.children[1].props.children[0]
          act(() => {
            background.props.onClick()
            jest.runAllTimers()
          })
        }

        layout = mockLayout.mock.calls[0][0]

        {
          const box = layout.children[3]
          const chartContainer = box.props.children[0]
          const chart = chartContainer.props.children
          expect(chart.type.name).toBe('MasterResultChart')
          expect(chart.props.problemInstance).toBe('b_instance')
          expect(chart.props.data).toEqual([
            {
              group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
              problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
              client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
              problem_class: 'abc',
              problem_instance: 'b_instance',
              problem_best_known: 96772,
              problem_parameters: { constraint_weight: 1, seed: null },
              problem_num_vars: {
                input: 18496,
                logical: 18496,
                physical: 18496,
              },
              client_name: 'AClient',
              client_version: 'v1.0.0',
              client_parameters: { 'outputs.feasibilities': true },
              amplify_version: '0.8.1+1662782383',
              setting_times: [1000000],
              results: mockData[2].results,
              plot_data: mockData[2].plot_data,
            },
          ])
        }

        {
          const box = layout.children[3]
          const tableContainer = box.props.children[1]
          expect(tableContainer.type.render.displayName).toBe('Styled(Box)')
          const masterResultTable = tableContainer.props.children
          expect(masterResultTable.type.name).toBe('MasterResultTable')
          expect(masterResultTable.props.data).toEqual([
            {
              group_id: 'hhhhhhhhhhhhhhhhhhhhhhhhhh',
              problem_id: 'iiiiiiiiiiiiiiiiiiiiiiiiii',
              client_id: 'jjjjjjjjjjjjjjjjjjjjjjjjjj',
              problem_class: 'abc',
              problem_instance: 'b_instance',
              problem_best_known: 96772,
              problem_parameters: { constraint_weight: 1, seed: null },
              problem_num_vars: {
                input: 18496,
                logical: 18496,
                physical: 18496,
              },
              client_name: 'AClient',
              client_version: 'v1.0.0',
              client_parameters: { 'outputs.feasibilities': true },
              amplify_version: '0.8.1+1662782383',
              setting_times: [1000000],
              results: mockData[2].results,
              plot_data: mockData[2].plot_data,
            },
          ])
        }
      })
    })
  })
})
