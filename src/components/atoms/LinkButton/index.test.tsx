import { render, screen, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'

import { LinkButton } from '.'

describe('<LinkButton />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton label="Fixstars" link="/clients/fixstars" />
      </BrowserRouter>,
    )

    const link = screen.getByText('Fixstars')
    expect(link).toHaveStyle(`
      padding: 4px 8px;
      font-size: 0.8rem;
      font-weight: bold;
      border-radius: 4px;
      background-color: #FF66FF;
      color: #111;
    `)

    expect(container).toMatchSnapshot()
  })

  it('Go to the LinkButton URL when the LinkButton is clicked', () => {
    const mockPush = jest.fn()
    const history = createMemoryHistory({ initialEntries: ['/'] })
    history.push = mockPush

    render(
      <Router location={history.location} navigator={history}>
        <LinkButton label="Fixstars" link="/clients/fixstars" />
      </Router>,
    )

    fireEvent.click(screen.getByText('Fixstars'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/clients/fixstars')
  })

  describe('Change background color', () => {
    it('background color is light', async () => {
      render(
        <BrowserRouter>
          <LinkButton
            label="Fixstars"
            link="/clients/fixstars"
            backgroundColor="#d0d0d0"
          />
        </BrowserRouter>,
      )

      const link = screen.getByText('Fixstars')
      expect(link).toHaveStyle(`
        background-color: #d0d0d0;
        color: #111;
      `)
    })

    it('background color is dark', async () => {
      render(
        <BrowserRouter>
          <LinkButton
            label="Fixstars"
            link="/clients/fixstars"
            backgroundColor="#ec285d"
          />
        </BrowserRouter>,
      )

      const link = screen.getByText('Fixstars')
      expect(link).toHaveStyle(`
        background-color: #ec285d;
        color: #FFF;
      `)
    })
  })
})
