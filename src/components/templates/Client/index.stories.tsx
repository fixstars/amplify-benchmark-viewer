import type { ComponentStory, ComponentMeta } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockClientData.json'

import { Client } from '.'

export default {
  title: 'Templates/Client',
  component: Client,
} as ComponentMeta<typeof Client>

const Template: ComponentStory<typeof Client> = (args) => <Client {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Fixstars',
  data: mockData,
}
