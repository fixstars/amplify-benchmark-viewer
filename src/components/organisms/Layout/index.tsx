/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Box, styled, Toolbar } from '@mui/material'
import { Header } from 'components/organisms/Header'

const Page = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Contents = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px;
`

interface Props {
  readonly children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
  return (
    <Page>
      <Header />
      <Contents>
        <Toolbar />
        {children}
      </Contents>
    </Page>
  )
}
