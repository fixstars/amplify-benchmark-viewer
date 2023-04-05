/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'

import { NavLink } from '.'

const meta: Meta<typeof NavLink> = {
  title: 'Atoms/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'Header background color',
      values: [{ name: 'Header background color', value: '#111' }],
    },
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    url: '/',
    label: 'Home',
  },
}
