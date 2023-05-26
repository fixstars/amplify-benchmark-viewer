/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { MasterResultTable } from '.'

export default {
  title: 'Organisms/MasterResultTable',
  component: MasterResultTable,
} as ComponentMeta<typeof MasterResultTable>

const Template: ComponentStory<typeof MasterResultTable> = (args) => (
  <div style={{ height: '100vh' }}>
    <MasterResultTable {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  data: mockData as ReadonlyArray<MasterData>,
}
