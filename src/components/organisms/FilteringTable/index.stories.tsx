/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'

import { FilteringTable } from '.'
import mockData from './mockData/data.json'

const TestComponent = (props: React.ComponentProps<typeof FilteringTable>) => (
  <div style={{ height: '100vh' }}>
    <FilteringTable {...props} />
  </div>
)

const meta: Meta<typeof FilteringTable> = {
  title: 'Organisms/FilteringTable',
  component: TestComponent,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Problem Class',
    data: mockData,
  },
}
