/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'

import { Layout } from '.'

const meta: Meta<typeof Layout> = {
  title: 'Organisms/Layout',
  component: Layout,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <div>Organisms layout component</div>,
  },
}
