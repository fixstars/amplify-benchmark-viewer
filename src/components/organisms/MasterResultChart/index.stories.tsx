/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { MasterResultChart } from '.'

const meta: Meta<typeof MasterResultChart> = {
  title: 'Organisms/MasterResultChart',
  component: MasterResultChart,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    problemInstance: 'b_instance',
    data: mockData as ReadonlyArray<MasterData>,
    clientChartType: {
      a_client: 'max-min',
      AClient: 'box',
    },
  },
}
