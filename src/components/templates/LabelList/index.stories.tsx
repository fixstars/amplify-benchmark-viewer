import type { ComponentStory, ComponentMeta } from '@storybook/react'
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
