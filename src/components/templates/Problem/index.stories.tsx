/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
  instance: 'r_instance',
  labels: ['all', 'AAA CI benchmark v0.6.4'],
  data: mockData,
  reportData: mockReportData,
}
