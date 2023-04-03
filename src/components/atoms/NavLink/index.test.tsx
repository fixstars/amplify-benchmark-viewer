import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'

import { NavLink } from '.'

const mockLink = jest.fn()

jest.mock('../Link', () => {
  const { Link: LinkComponent, ...rest } = jest.requireActual('../Link')

  const Link = (props: typeof LinkComponent) => {
    mockLink(props)
    return <LinkComponent {...props} />
  }

  return {
    Link,
    ...rest,
  }
})

describe('<NavLink />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <NavLink url="/" label="Home" />
      </BrowserRouter>,
    )

    const link = mockLink.mock.calls[0][0]
    expect(link.to).toBe('/')
    const label = link.children
    expect(label.type.render.name).toBe('Typography')
    expect(label.props.color).toBe('inherit')
    expect(label.props.sx).toEqual({
      backgroundColor: 'inherit',
      color: '#fff',
      borderRadius: 1,
      py: 1,
      px: 2,
    })

    expect(container).toMatchSnapshot()
  })

  it('isActive', async () => {
    render(
      <BrowserRouter>
        <NavLink url="/" label="Home" isActive />
      </BrowserRouter>,
    )

    const link = mockLink.mock.calls[0][0]
    const label = link.children
    expect(label.props.sx).toEqual({
      backgroundColor: '#fff',
      color: '#111',
      borderRadius: 1,
      py: 1,
      px: 2,
    })
  })

  it('Go to URL', async () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/test'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <NavLink url="/" label="Home" isActive />
      </Router>,
    )

    expect(mockPush).not.toBeCalled()
    fireEvent.click(screen.getByText('Home'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/')
  })
})
