import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'
import { mockAppBar } from 'utils/test'

import { Header } from '.'

describe('<Header />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    )

    const appBar = mockAppBar.mock.calls[0][0]
    expect(appBar.position).toBe('fixed')
    expect(appBar.elevation).toBe(0)

    const toolbar = appBar.children
    expect(toolbar.type.name).toBe('Toolbar')
    expect(toolbar.props.sx).toEqual({ flexWrap: 'wrap' })

    const headerContents = toolbar.props.children
    expect(headerContents.length).toBe(2)

    const appTitleLinkContainer = headerContents[0]
    expect(appTitleLinkContainer.type.render.displayName).toBe('Styled(div)')
    const appTitleLink = appTitleLinkContainer.props.children
    expect(appTitleLink.type.render.displayName).toBe('Styled(Link)')
    expect(appTitleLink.props.to).toBe('.')

    const appTitle = appTitleLink.props.children
    expect(appTitle.type.name).toBe('Typography')
    expect(appTitle.props.variant).toBe('h6')
    expect(appTitle.props.color).toBe('inherit')
    expect(appTitle.props.noWrap).toBe(true)
    expect(appTitle.props.sx).toEqual({ color: '#fff' })
    expect(appTitle.props.children).toBe('Annealing Benchmark')

    const navLinks = headerContents[1]
    expect(navLinks.type.render.displayName).toBe('Styled(nav)')
    const links = navLinks.props.children
    expect(links.length).toBe(3)

    {
      const link = links[0]
      expect(link.type.name).toBe('NavLink')
      expect(link.props).toEqual({
        url: '/',
        label: 'Problems',
        isActive: true,
      })
    }

    {
      const link = links[1]
      expect(link.type.name).toBe('NavLink')
      expect(link.props).toEqual({
        url: '/clients',
        label: 'Clients',
        isActive: false,
      })
    }

    {
      const link = links[2]
      expect(link.type.name).toBe('NavLink')
      expect(link.props).toEqual({
        url: '/labels',
        label: 'Label',
        isActive: false,
      })
    }

    expect(container).toMatchSnapshot()
  })

  it('Go to the root page when the app title is clicked', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/pages/1'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
    )

    fireEvent.click(screen.getByText('Annealing Benchmark'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/')
  })

  it('Go to the specific page when nav menu is clicked', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>,
    )

    jest.clearAllMocks()

    fireEvent.click(screen.getByText('Clients'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/clients')

    jest.clearAllMocks()

    fireEvent.click(screen.getByText('Label'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/labels')
  })
})
