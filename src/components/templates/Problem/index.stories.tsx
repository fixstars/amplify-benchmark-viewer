/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockProblemData.json'
import mockReportData from 'utils/test/mocks/data/mockReportData.json'

import { Problem } from '.'

const meta: Meta<typeof Problem> = {
  title: 'Templates/Problem',
  component: Problem,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'Tsp',
    instance: 'r_instance',
    labels: ['all', 'AAA CI benchmark v0.6.4'],
    data: mockData,
    reportData: mockReportData,
  },
}
