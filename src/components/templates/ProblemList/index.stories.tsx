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
