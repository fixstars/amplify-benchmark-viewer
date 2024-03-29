/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockBox } from 'utils/test'

const mockHeader = jest.fn()

jest.mock('components/organisms/Header', () => {
  const { Header: HeaderComponent, ...rest } = jest.requireActual(
    'components/organisms/Header',
  )

  const Header = (props: typeof HeaderComponent) => {
    mockHeader(props)
    return <HeaderComponent {...props} />
  }

  return {
    Header,
    ...rest,
  }
})

import { Layout } from '.'

describe('<Layout />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <Layout>
          <div>Organisms layout component test</div>
        </Layout>
      </BrowserRouter>,
    )

    expect(mockBox.mock.calls.length).toBe(2)

    const page = mockBox.mock.calls[0][0]
    expect(page.children.length).toBe(2)

    expect(mockHeader.mock.calls[0][0].showMenu).toBe(true)
    const header = page.children[0]
    expect(header.type.name).toBe('Header')

    const contents = page.children[1]
    expect(contents.type.render.displayName).toBe('Styled(Box)')
    expect(contents.props.children.length).toBe(2)

    const toolbar = contents.props.children[0]
    expect(toolbar.type.name).toBe('Toolbar')

    const component = contents.props.children[1]
    expect(component.props.children).toBe('Organisms layout component test')

    expect(container).toMatchSnapshot()
  })

  it('Hide menus', async () => {
    render(
      <BrowserRouter>
        <Layout showMenu={false}>
          <div>Organisms layout component test</div>
        </Layout>
      </BrowserRouter>,
    )

    expect(mockHeader.mock.calls[0][0].showMenu).toBe(false)
  })
})
