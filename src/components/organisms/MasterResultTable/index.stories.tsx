/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Meta, StoryObj } from '@storybook/react'
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { MasterResultTable } from '.'

const TestComponent = (
  props: React.ComponentProps<typeof MasterResultTable>,
) => (
  <div style={{ height: '100vh' }}>
    <MasterResultTable {...props} />
  </div>
)

const meta: Meta<typeof MasterResultTable> = {
  title: 'Organisms/MasterResultTable',
  component: TestComponent,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockData as ReadonlyArray<MasterData>,
  },
}
