const mockMaster = jest.fn()
const mockProblemList = jest.fn()
const mockProblem = jest.fn()
const mockClient = jest.fn()
const mockClientList = jest.fn()
const mockLabelList = jest.fn()

jest.mock('components/templates', () => {
  const {
    Master: MasterComponent,
    ProblemList: ProblemListComponent,
    Problem: ProblemComponent,
    Client: ClientComponent,
    ClientList: ClientListComponent,
    LabelList: LabelListComponent,
    ...rest
  } = jest.requireActual('components/templates')

  const Master = (props: typeof MasterComponent) => {
    mockMaster(props)
    return <MasterComponent {...props} />
  }

  const ProblemList = (props: typeof ProblemListComponent) => {
    mockProblemList(props)
    return <ProblemListComponent {...props} />
  }

  const Problem = (props: typeof ProblemComponent) => {
    mockProblem(props)
    return <ProblemComponent {...props} />
  }

  const Client = (props: typeof ClientComponent) => {
    mockClient(props)
    return <ClientComponent {...props} />
  }

  const ClientList = (props: typeof ClientListComponent) => {
    mockClientList(props)
    return <ClientListComponent {...props} />
  }

  const LabelList = (props: typeof LabelListComponent) => {
    mockLabelList(props)
    return <LabelListComponent {...props} />
  }

  return {
    Master,
    ProblemList,
    Problem,
    Client,
    ClientList,
    LabelList,
    ...rest,
  }
})

export {
  mockMaster,
  mockProblemList,
  mockProblem,
  mockClient,
  mockClientList,
  mockLabelList,
}
