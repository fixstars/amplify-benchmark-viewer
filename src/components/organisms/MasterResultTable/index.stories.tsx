import type { ComponentStory, ComponentMeta } from '@storybook/react'
import type { MasterData } from '@types'
import mockData from 'utils/test/mocks/data/mockMasterData.json'

import { MasterResultTable } from '.'

export default {
  title: 'Organisms/MasterResultTable',
  component: MasterResultTable,
} as ComponentMeta<typeof MasterResultTable>

const Template: ComponentStory<typeof MasterResultTable> = (args) => (
  <div style={{ height: '100vh' }}>
    <MasterResultTable {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  data: mockData as ReadonlyArray<MasterData>,
}
