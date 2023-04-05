/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotReachBestRate } from '.'

const meta: Meta<typeof PlotReachBestRate> = {
  title: 'Organisms/PlotReachBestRate',
  component: PlotReachBestRate,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockData,
    instance: 'r_instance',
    useHistory: false,
    xtype: 'log',
    label: '',
  },
}
