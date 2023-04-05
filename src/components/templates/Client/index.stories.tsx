/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockClientData.json'

import { Client } from '.'

const meta: Meta<typeof Client> = {
  title: 'Templates/Client',
  component: Client,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'a_client',
    labels: ['all', 'AAA CI benchmark v0.6.4'],
    data: mockData,
  },
}
