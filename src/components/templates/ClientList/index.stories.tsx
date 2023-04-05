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
