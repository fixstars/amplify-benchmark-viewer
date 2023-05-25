/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const mockPageContainer = jest.fn()
const mockLoading = jest.fn()
const mockNavLink = jest.fn()
const mockJsonFileUploader = jest.fn()

jest.mock('components/atoms', () => {
  const {
    Loading: LoadingComponent,
    PageContainer: PageContainerComponent,
    NavLink: NavLinkComponent,
    JsonFileUploader: JsonFileUploaderComponent,
    ...rest
  } = jest.requireActual('components/atoms')

  const PageContainer = (props: typeof PageContainerComponent) => {
    mockPageContainer(props)
    return <PageContainerComponent {...props} />
  }

  const Loading = (props: typeof LoadingComponent) => {
    mockLoading(props)
    return <LoadingComponent {...props} />
  }

  const NavLink = (props: typeof NavLinkComponent) => {
    mockNavLink(props)
    return <NavLinkComponent {...props} />
  }

  const JsonFileUploader = (props: typeof JsonFileUploaderComponent) => {
    mockJsonFileUploader(props)
    return <JsonFileUploaderComponent {...props} />
  }

  return {
    PageContainer,
    Loading,
    NavLink,
    JsonFileUploader,
    ...rest,
  }
})

export { mockPageContainer, mockLoading, mockNavLink, mockJsonFileUploader }
