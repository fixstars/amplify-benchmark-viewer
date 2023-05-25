/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render, screen, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, Router } from 'react-router-dom'

import { LinkButton } from '.'

describe('<LinkButton />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BrowserRouter>
        <LinkButton label="a_client" link="/clients/a_client" />
      </BrowserRouter>,
    )

    const link = screen.getByText('a_client')
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
        <LinkButton label="a_client" link="/clients/a_client" />
      </Router>,
    )

    fireEvent.click(screen.getByText('a_client'))
    expect(mockPush.mock.calls[0][0].pathname).toBe('/clients/a_client')
  })

  describe('Change background color', () => {
    it('background color is light', async () => {
      render(
        <BrowserRouter>
          <LinkButton
            label="a_client"
            link="/clients/a_client"
            backgroundColor="#d0d0d0"
          />
        </BrowserRouter>,
      )

      const link = screen.getByText('a_client')
      expect(link).toHaveStyle(`
        background-color: #d0d0d0;
        color: #111;
      `)
    })

    it('background color is dark', async () => {
      render(
        <BrowserRouter>
          <LinkButton
            label="a_client"
            link="/clients/a_client"
            backgroundColor="#ec285d"
          />
        </BrowserRouter>,
      )

      const link = screen.getByText('a_client')
      expect(link).toHaveStyle(`
        background-color: #ec285d;
        color: #FFF;
      `)
    })
  })
})
