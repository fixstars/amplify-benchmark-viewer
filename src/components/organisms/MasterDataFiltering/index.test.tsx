/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, fireEvent, screen, act } from '@testing-library/react'
import { mockBox } from 'utils/test'

import { MasterDataFiltering } from '.'
import mockData from './mockData/data.json'

const mockFilteringTable = jest.fn()

jest.mock('../FilteringTable', () => {
  const { FilteringTable: FilteringTableComponent, ...rest } =
    jest.requireActual('../FilteringTable')

  const FilteringTable = (props: typeof FilteringTableComponent) => {
    mockFilteringTable(props)
    return <FilteringTableComponent {...props} />
  }

  return {
    FilteringTable,
    ...rest,
  }
})

describe('<MasterDataFiltering />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <MasterDataFiltering
        label="Problem Class Filtering"
        data={mockData}
        selectedData={[]}
        onSelected={jest.fn}
      />,
    )

    let box = mockBox.mock.calls[0][0]
    expect(box.sx).toEqual({ marginBottom: '4px' })

    box = box.children
    expect(box.type.name).toBe('Box')
    expect(box.props.sx).toEqual({ display: 'flex', alignItems: 'flex-start' })

    const contents = box.props.children
    expect(contents.length).toBe(2)

    box = contents[0]
    expect(box.type.name).toBe('Box')
    expect(box.props.sx).toEqual({
      display: 'flex',
      alignItems: 'center',
      minWidth: '140px',
    })
    expect(box.props.children.length).toBe(3)

    {
      const label = box.props.children[0]
      expect(label.type.name).toBe('Typography')
      expect(label.props.children).toBe('Problem Class Filtering')
    }

    {
      const addIcon = box.props.children[1]
      expect(addIcon.type.render.name).toBe('IconButton')
      expect(addIcon.props.size).toBe('small')
      expect(addIcon.props.onClick.name).toBe('onClick')
    }

    {
      const menu = box.props.children[2]
      expect(menu.type.render.name).toBe('Menu')
      expect(menu.props.anchorEl).toBe(null)
      expect(menu.props.open).toBe(false)
      expect(menu.props.onClose.name).toBe('onClose')
      expect(menu.props.sx).toEqual({
        'li:hover': {
          backgroundColor: '#FFF',
        },
      })

      const filteringContainer = menu.props.children
      expect(filteringContainer.type.name).toBe('Box')
      expect(filteringContainer.props.sx).toEqual({
        width: '500px',
        height: '400px',
        padding: '4px 8px',
      })

      const filter = filteringContainer.props.children
      expect(filter.type.name).toBe('FilteringTable')
      expect(filter.props.title).toBe('Problem Class Filtering')
      expect(filter.props.selectedData).toEqual([])
      expect(filter.props.data).toEqual(mockData)
    }

    box = contents[1]
    expect(box.type.name).toBe('Box')

    const chips = box.props.children
    expect(chips.length).toBe(0)

    expect(container).toMatchSnapshot()
  })

  it('Rendered well with selected data', async () => {
    const { container } = render(
      <MasterDataFiltering
        label="Problem Class Filtering"
        data={mockData}
        selectedData={['Tsp', 'Sudoku']}
        onSelected={jest.fn}
      />,
    )

    let box = mockBox.mock.calls[0][0]
    box = box.children

    const contents = box.props.children
    box = contents[0]

    {
      const menu = box.props.children[2]
      const filteringContainer = menu.props.children
      const filter = filteringContainer.props.children
      expect(filter.props.selectedData).toEqual(['Tsp', 'Sudoku'])
    }

    box = contents[1]
    expect(box.type.name).toBe('Box')

    const chips = box.props.children
    expect(chips.length).toBe(2)

    {
      const chip = chips[0]
      expect(chip.key).toBe('master_data_filtering_chip_Tsp')
      expect(chip.type.render.name).toBe('Chip')
      expect(chip.props.label).toBe('Tsp')
      expect(chip.props.variant).toBe('outlined')
      expect(chip.props.size).toBe('small')
      expect(chip.props.sx).toEqual({ marginRight: '8px', marginBottom: '4px' })
      expect(chip.props.color).toBe('primary')
      expect(chip.props.onDelete.name).toBe('onDelete')
    }
    {
      const chip = chips[1]
      expect(chip.key).toBe('master_data_filtering_chip_Sudoku')
      expect(chip.type.render.name).toBe('Chip')
      expect(chip.props.label).toBe('Sudoku')
      expect(chip.props.variant).toBe('outlined')
      expect(chip.props.size).toBe('small')
      expect(chip.props.sx).toEqual({ marginRight: '8px', marginBottom: '4px' })
      expect(chip.props.color).toBe('primary')
      expect(chip.props.onDelete.name).toBe('onDelete')
    }

    expect(container).toMatchSnapshot()
  })

  it('Show filtering table', async () => {
    render(
      <MasterDataFiltering
        label="Problem Class Filtering"
        data={mockData}
        selectedData={[]}
        onSelected={jest.fn}
      />,
    )

    let box = mockBox.mock.calls[0][0]
    box = box.children

    let contents = box.props.children
    box = contents[0]

    {
      const addIcon = box.props.children[1]
      expect(addIcon.type.render.name).toBe('IconButton')
      expect(addIcon.props.size).toBe('small')
      expect(addIcon.props.onClick.name).toBe('onClick')

      const menu = box.props.children[2]
      expect(menu.props.anchorEl).toBe(null)
      expect(menu.props.open).toBe(false)

      // click add icon
      mockBox.mockClear()
      fireEvent.click(screen.getByTestId('AddCircleIcon'))
    }

    box = mockBox.mock.calls[0][0]
    box = box.children

    contents = box.props.children
    box = contents[0]

    {
      const menu = box.props.children[2]
      expect(menu.props.anchorEl.type).toBe('button')
      expect(menu.props.open).toBe(true)
    }
  })

  describe('onSelected', () => {
    it('add selected items via filtering table', async () => {
      const onMockSelected = jest.fn()
      render(
        <MasterDataFiltering
          label="Problem Class Filtering"
          data={mockData}
          selectedData={[]}
          onSelected={onMockSelected}
        />,
      )

      mockBox.mockClear()
      fireEvent.click(screen.getByTestId('AddCircleIcon'))

      expect(onMockSelected.mock.calls.length).toBe(0)

      act(() => {
        mockFilteringTable.mock.calls[0][0].onSelected(['Tsp', 'Sudoku'])
      })

      expect(onMockSelected.mock.calls[0][0]).toEqual(['Tsp', 'Sudoku'])
    })

    it('delete selected item via chips', async () => {
      const onMockSelected = jest.fn()

      render(
        <MasterDataFiltering
          label="Problem Class Filtering"
          data={mockData}
          selectedData={['Tsp', 'Sudoku']}
          onSelected={onMockSelected}
        />,
      )

      let box = mockBox.mock.calls[0][0]
      box = box.children

      const contents = box.props.children
      box = contents[0]

      {
        const menu = box.props.children[2]
        const filteringContainer = menu.props.children
        const filter = filteringContainer.props.children
        expect(filter.props.selectedData).toEqual(['Tsp', 'Sudoku'])
      }

      box = contents[1]
      expect(box.type.name).toBe('Box')

      const chips = box.props.children
      expect(chips.length).toBe(2)

      {
        const chip = chips[1]
        expect(chip.props.label).toBe('Sudoku')
        expect(chip.props.onDelete.name).toBe('onDelete')

        expect(onMockSelected.mock.calls.length).toBe(0)
        act(() => chip.props.onDelete())
      }

      expect(onMockSelected.mock.calls[0][0]).toEqual(['Tsp'])
    })
  })
})
