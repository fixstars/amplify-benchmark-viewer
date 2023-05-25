/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const mockQueryClientProvider = jest.fn()

jest.mock('@tanstack/react-query', () => {
  const { QueryClientProvider: QueryClientProviderComponent, ...rest } =
    jest.requireActual('@tanstack/react-query')

  const QueryClientProvider = (props: typeof QueryClientProviderComponent) => {
    mockQueryClientProvider(props)
    return <QueryClientProviderComponent {...props} />
  }

  return {
    QueryClientProvider,
    ...rest,
  }
})

export { mockQueryClientProvider }
