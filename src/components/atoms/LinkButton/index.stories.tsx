/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'

import { LinkButton } from '.'

const meta: Meta<typeof LinkButton> = {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'a_client',
    link: '/clients/a_client',
  },
}
