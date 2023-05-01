import type { ComponentStory, ComponentMeta } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotTTS } from '.'

export default {
  title: 'Organisms/PlotTTS',
  component: PlotTTS,
} as ComponentMeta<typeof PlotTTS>

const Template: ComponentStory<typeof PlotTTS> = (args) => <PlotTTS {...args} />

export const Default = Template.bind({})
Default.args = {
  data: mockData,
  instance: 'r_instance',
  useHistory: false,
  xtype: 'log',
  ytype: 'log',
  label: '',
}
