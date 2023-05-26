/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockLabelListData.json'

import { LabelList } from '.'

export default {
  title: 'Templates/LabelList',
  component: LabelList,
} as ComponentMeta<typeof LabelList>

const Template: ComponentStory<typeof LabelList> = (args) => (
  <LabelList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: mockData,
}
