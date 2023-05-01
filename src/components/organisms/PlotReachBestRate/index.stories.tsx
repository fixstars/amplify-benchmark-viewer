import type { ComponentStory, ComponentMeta } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotReachBestRate } from '.'

export default {
  title: 'Organisms/PlotReachBestRate',
  component: PlotReachBestRate,
} as ComponentMeta<typeof PlotReachBestRate>

const Template: ComponentStory<typeof PlotReachBestRate> = (args) => (
  <PlotReachBestRate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: mockData,
  instance: 'r_instance',
  useHistory: false,
  xtype: 'log',
  label: '',
}
