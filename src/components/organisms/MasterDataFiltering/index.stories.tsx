/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { MasterDataFiltering } from '.'
import mockData from './mockData/data.json'

export default {
  title: 'Organisms/MasterDataFiltering',
  component: MasterDataFiltering,
} as ComponentMeta<typeof MasterDataFiltering>

const Template: ComponentStory<typeof MasterDataFiltering> = (args) => (
  <div style={{ height: '100vh' }}>
    <MasterDataFiltering {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Problem Class Filter',
  data: mockData,
  selectedData: [],
}

export const SelectedFiltering = Template.bind({})
SelectedFiltering.args = {
  label: 'Problem Class Filter',
  data: mockData,
  selectedData: ['Tsp', 'MaxCut'],
}
