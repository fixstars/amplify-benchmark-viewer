/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ComponentStory, ComponentMeta } from '@storybook/react'

import { SelectBox } from '.'

export default {
  title: 'Atoms/SelectBox',
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>

const Template: ComponentStory<typeof SelectBox> = (args) => (
  <SelectBox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: 'a_client',
  options: ['box', 'max-min', '3q-1q', 'median'],
}
