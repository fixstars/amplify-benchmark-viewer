/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockClientListData.json'

import { ClientList } from '.'

export default {
  title: 'Templates/ClientList',
  component: ClientList,
} as ComponentMeta<typeof ClientList>

const Template: ComponentStory<typeof ClientList> = (args) => (
  <ClientList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: mockData,
}
