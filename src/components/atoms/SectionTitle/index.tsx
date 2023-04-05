/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ReactElement } from 'react'

import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'

const Title = styled(Typography)`
  padding: 0 8px 4px;
  font-weight: bold;
`

interface Props {
  readonly title: string
  readonly rightComponent?: ReactElement
}

export const SectionTitle = ({ title, rightComponent }: Props) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        borderBottom: '1px solid #bdbdbd',
        margin: '16px 0 16px 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Title variant="h2">{title}</Title>
      {rightComponent}
    </Grid>
  )
}
