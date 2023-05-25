/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockProblemListData.json'

import { ProblemList } from '.'

export default {
  title: 'Templates/ProblemList',
  component: ProblemList,
} as ComponentMeta<typeof ProblemList>

const Template: ComponentStory<typeof ProblemList> = (args) => (
  <ProblemList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: mockData,
}
