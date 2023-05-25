/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
  instance: 'r_instance',
  useHistory: false,
  xtype: 'log',
  label: '',
}
