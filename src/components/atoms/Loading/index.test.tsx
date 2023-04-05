/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { render } from '@testing-library/react'
import { mockBox } from 'utils/test'

import { Loading } from '.'

describe('<Loading />', () => {
  it('Rendered well', async () => {
    const { container } = render(<Loading />)

    const box = mockBox.mock.calls[0][0]
    expect(box.sx).toEqual({
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    })
    expect(box.children.type.render.name).toBe('CircularProgress')

    expect(container).toMatchSnapshot()
  })
})
