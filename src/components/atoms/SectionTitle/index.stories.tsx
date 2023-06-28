/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { IconButton } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'

import { SectionTitle } from '.'

const meta: Meta<typeof SectionTitle> = {
  title: 'Atoms/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Data Filtering',
  },
}

export const RightComponent: Story = {
  args: {
    title: 'Data Filtering',
    rightComponent: (
      <IconButton>
        <FilterAltIcon />
      </IconButton>
    ),
  },
}
