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
