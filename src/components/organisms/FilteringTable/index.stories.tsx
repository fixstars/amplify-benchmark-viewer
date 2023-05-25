/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { FilteringTable } from '.'
import mockData from './mockData/data.json'

export default {
  title: 'Organisms/FilteringTable',
  component: FilteringTable,
} as ComponentMeta<typeof FilteringTable>

const Template: ComponentStory<typeof FilteringTable> = (args) => (
  <div style={{ height: '100vh' }}>
    <FilteringTable {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Problem Class',
  data: mockData,
}
