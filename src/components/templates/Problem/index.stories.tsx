import type { ComponentMeta, ComponentStory } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockProblemData.json'
import mockReportData from 'utils/test/mocks/data/mockReportData.json'

import { Problem } from '.'

export default {
  title: 'Templates/Problem',
  component: Problem,
} as ComponentMeta<typeof Problem>

const Template: ComponentStory<typeof Problem> = (args) => <Problem {...args} />

export const Default = Template.bind({})
Default.args = {
  className: 'Tsp',
  instance: 'pr124',
  labels: ['all', 'AAA CI benchmark v0.6.4'],
  data: mockData,
  reportData: mockReportData,
}
