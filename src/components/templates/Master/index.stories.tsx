/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { Master } from '.'

const meta: Meta<typeof Master> = {
  title: 'Templates/Master',
  component: Master,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockData as ReadonlyArray<MasterData>,
  },
}
