import type { ComponentMeta, ComponentStory } from '@storybook/react'
import mockData from 'utils/test/mocks/data/mockReportData.json'

import { PlotTargetEnergy } from '.'

export default {
  title: 'Organisms/PlotTargetEnergy',
  component: PlotTargetEnergy,
} as ComponentMeta<typeof PlotTargetEnergy>

const Template: ComponentStory<typeof PlotTargetEnergy> = (args) => (
  <PlotTargetEnergy {...args} />
)

export const Default = Template.bind({})
Default.args = {
  data: mockData,
  instance: 'r_instance',
  useHistory: false,
  label: '',
}
