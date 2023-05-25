/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Typography } from '@mui/material'

import { Link } from '../Link'

interface Props {
  readonly url: string
  readonly label: string
  readonly isActive?: boolean
}

export const NavLink = ({ url, label, isActive }: Props) => {
  return (
    <Link to={url}>
      <Typography
        color="inherit"
        sx={{
          backgroundColor: isActive === true ? '#fff' : 'inherit',
          color: isActive === true ? '#111' : '#fff',
          borderRadius: 1,
          py: 1,
          px: 2,
        }}
      >
        {label}
      </Typography>
    </Link>
  )
}
