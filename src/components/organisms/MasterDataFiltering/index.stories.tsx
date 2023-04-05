/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'

import { MasterDataFiltering } from '.'
import mockData from './mockData/data.json'

const TestComponent = (
  props: React.ComponentProps<typeof MasterDataFiltering>,
) => (
  <div style={{ height: '100vh' }}>
    <MasterDataFiltering {...props} />
  </div>
)

const meta: Meta<typeof MasterDataFiltering> = {
  title: 'Organisms/MasterDataFiltering',
  component: TestComponent,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Problem Class Filter',
    data: mockData,
    selectedData: [],
  },
}

export const SelectedFiltering: Story = {
  args: {
    label: 'Problem Class Filter',
    data: mockData,
    selectedData: ['Tsp', 'MaxCut'],
  },
}
