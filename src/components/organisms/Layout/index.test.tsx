/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockBox } from 'utils/test'

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
})
