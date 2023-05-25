/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, act } from '@testing-library/react'
import { mockFormControl, mockSelect } from 'utils/test'

import { SelectBox } from '.'

describe('<SelectBox />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <SelectBox
        label="a_client"
        options={['box', 'max-min', '3q-1q', 'median']}
      />,
    )

    expect(mockFormControl.mock.calls.length).toBe(1)

    const formControl = mockFormControl.mock.calls[0][0]
    expect(formControl.sx).toEqual({
      flexDirection: 'row',
      alignItems: 'center',
    })
    expect(formControl.size).toBe('small')
    expect(formControl.children.length).toBe(2)

    const label = formControl.children[0]
    expect(label.type.name).toBe('Typography')
    expect(label.props.sx).toEqual({ fontSize: '1rem', marginRight: '8px' })
    expect(label.props.children[0]).toBe('a_client')
    expect(label.props.children[1]).toBe(':')

    const select = formControl.children[1]
    expect(select.type.name).toBe('Select')
    expect(select.props.sx).toEqual({ minWidth: 120 })
    expect(select.props.value).toBe('box')
    expect(select.props.onChange.name).toBe('onChange')
    expect(select.props.children.length).toBe(4)

    const option1 = select.props.children[0]
    expect(option1.type.render.name).toBe('MenuItem')
    expect(option1.props.children).toBe('box')

    const option2 = select.props.children[1]
    expect(option2.type.render.name).toBe('MenuItem')
    expect(option2.props.children).toBe('max-min')

    const option3 = select.props.children[2]
    expect(option3.type.render.name).toBe('MenuItem')
    expect(option3.props.children).toBe('3q-1q')

    const option4 = select.props.children[3]
    expect(option4.type.render.name).toBe('MenuItem')
    expect(option4.props.children).toBe('median')

    expect(container).toMatchSnapshot()
  })

  it('init value', async () => {
    render(
      <SelectBox
        label="a_client"
        initValue="max-min"
        options={['box', 'max-min', '3q-1q', 'median']}
      />,
    )

    expect(mockFormControl.mock.calls.length).toBe(1)

    const formControl = mockFormControl.mock.calls[0][0]
    const select = formControl.children[1]
    expect(select.type.name).toBe('Select')
    expect(select.props.value).toBe('max-min')
  })

  it('onChange', async () => {
    const handleChange = jest.fn()

    render(
      <SelectBox
        label="a_client"
        options={['box', 'max-min', '3q-1q', 'median']}
        onChange={handleChange}
      />,
    )

    expect(handleChange.mock.calls.length).toBe(0)
    act(() => {
      mockSelect.mock.calls[0][0].onChange({ target: { value: 'max-min' } })
    })
    expect(handleChange.mock.calls[0][0]).toBe('max-min')
  })
})
