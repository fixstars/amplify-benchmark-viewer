/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockClientListData.json'

import { ClientList } from '.'

const meta: Meta<typeof ClientList> = {
  title: 'Templates/ClientList',
  component: ClientList,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockData,
  },
}
