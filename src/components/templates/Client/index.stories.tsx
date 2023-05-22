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
