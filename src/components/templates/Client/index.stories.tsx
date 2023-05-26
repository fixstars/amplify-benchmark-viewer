/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockClientData.json'

import { Client } from '.'

export default {
  title: 'Templates/Client',
  component: Client,
} as ComponentMeta<typeof Client>

const Template: ComponentStory<typeof Client> = (args) => <Client {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'a_client',
  labels: ['all', 'AAA CI benchmark v0.6.4'],
  data: mockData,
}
