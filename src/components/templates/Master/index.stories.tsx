/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { Master } from '.'

export default {
  title: 'Templates/Master',
  component: Master,
} as ComponentMeta<typeof Master>

const Template: ComponentStory<typeof Master> = (args) => <Master {...args} />

export const Default = Template.bind({})
Default.args = {
  data: mockData as ReadonlyArray<MasterData>,
}
