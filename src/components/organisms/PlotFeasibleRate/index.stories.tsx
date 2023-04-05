import type { ComponentStory, ComponentMeta } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotFeasibleRate } from '.'

export default {
  title: 'Organisms/PlotFeasibleRate',
  component: PlotFeasibleRate,
} as ComponentMeta<typeof PlotFeasibleRate>

const Template: ComponentStory<typeof PlotFeasibleRate> = (args) => (
  <PlotFeasibleRate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: mockData,
  instance: 'pr124',
  useHistory: false,
  xtype: 'log',
  label: '',
}
