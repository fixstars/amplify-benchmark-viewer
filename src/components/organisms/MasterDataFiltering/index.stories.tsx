import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { MasterDataFiltering } from '.'
import mockData from './mockData/data.json'

export default {
  title: 'Organisms/MasterDataFiltering',
  component: MasterDataFiltering,
} as ComponentMeta<typeof MasterDataFiltering>

const Template: ComponentStory<typeof MasterDataFiltering> = (args) => (
  <div style={{ height: '100vh' }}>
    <MasterDataFiltering {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  label: 'Problem Class Filter',
  data: mockData,
  selectedData: [],
}

export const SelectedFiltering = Template.bind({})
SelectedFiltering.args = {
  label: 'Problem Class Filter',
  data: mockData,
  selectedData: ['Tsp', 'MaxCut'],
}
