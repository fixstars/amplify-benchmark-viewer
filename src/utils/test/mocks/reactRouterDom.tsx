/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const mockLink = jest.fn()

jest.mock('react-router-dom', () => {
  const { Link: RouterLink, ...rest } = jest.requireActual('react-router-dom')

  const Link = (props: typeof RouterLink) => {
    mockLink(props)
    return <RouterLink {...props} />
  }

  return { Link, ...rest }
})

export { mockLink }
