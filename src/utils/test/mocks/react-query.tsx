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
