import type { ComponentStory, ComponentMeta } from '@storybook/react'
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { MasterResultChart } from '.'

export default {
  title: 'Organisms/MasterResultChart',
  component: MasterResultChart,
} as ComponentMeta<typeof MasterResultChart>

const Template: ComponentStory<typeof MasterResultChart> = (args) => (
  <MasterResultChart {...args} />
)

export const Default = Template.bind({})
Default.args = {
  problemInstance: 'pr136',
  data: mockData as ReadonlyArray<MasterData>,
  clientChartType: {
    FixstarsClient: 'max-min',
    AClient: 'box',
  },
}
